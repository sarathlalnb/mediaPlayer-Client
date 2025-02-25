import React, { useEffect } from "react";

import Card from "react-bootstrap/Card";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { addHistory, deleteVideo, getAllVideo,uploadVideo,getSingleCategory,updateCategory } from "../services/AllAPI";

const AllVideos = ({ videResp, videoDeletedResponse,setcategoryVideoDeletedResponse }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = async (video) => {
    const { caption, videoURL } = video;

    let date = new Date();
    let formatedDate = date.toLocaleString("en-IN", { timeZoneName: "short" });

    const payload = { caption, videoURL, formatedDate };
    try {
      await addHistory(payload);
    } catch (error) {
      console.log(error);
    }

    setSelectedVideo(video);
    setShow(true);
  };

  const getVideo = async () => {
    try {
      const responce = await getAllVideo();
      setData(responce.data);
    } catch (error) {
      alert("Error");
    }
  };
  console.log(data);

  useEffect(() => {
    getVideo();
  }, [videResp, videoDeletedResponse]);

  const onDeleteClick = async (id) => {
    try {
      await deleteVideo(id);
      getVideo();
    } catch (error) {
      alert(error);
    }
  };

  const onVideoDrag = (e, id) => {
    e.dataTransfer.setData("videoDetails", id);
  };

  const onDragOverDiv = (e) => {
    e.preventDefault();
  };

  const onVideoDrop = async(e) => {
    let { categoryId, videoObj } = JSON.parse(
      e.dataTransfer.getData("fromCategoryVideo")
    );
    console.log(categoryId, videoObj);
    //upload video to videos api
    await uploadVideo(videoObj)
    getVideo()

    // get category details 
   let apiResponse = await getSingleCategory(categoryId)
   console.log(apiResponse.data," category details");
   let currentAllvideos = apiResponse.data.allVideos
   let sortedVideos = currentAllvideos.filter(item=>item.id!=videoObj.id)

   const payload = {
    id : categoryId,
    categoryName : apiResponse.data.categoryName,
    allVideos : sortedVideos
   }
   let deleteResponse = await updateCategory(categoryId,payload)
   setcategoryVideoDeletedResponse(deleteResponse)
  };

  return (
    <>
      {" "}
      <div onDragOver={(e) => onDragOverDiv(e)} onDrop={(e) => onVideoDrop(e)}>
        <h1>All videos</h1>
        <div className="d-flex flex-wrap gap-5">
          {data.map((a, index) => (
            <Card
              draggable={true}
              onDragStart={(e) => onVideoDrag(e, a.id)}
              key={index}
              style={{ width: "260px" }}
              className="mb-2"
            >
              <Card.Img
                variant="top"
                src={a.image}
                style={{ height: "200px", width: "100%" }}
                onClick={() => handleShow(a)}
              />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title onClick={() => handleShow(a)}>
                    {a.caption}
                  </Card.Title>
                  <button
                    onClick={() => onDeleteClick(a.id)}
                    className="btn btn-light"
                  >
                    <i className="fa-solid fa-trash text-danger"></i>
                  </button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      {selectedVideo && (
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedVideo.caption}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${selectedVideo.videoURL}&autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default AllVideos;
