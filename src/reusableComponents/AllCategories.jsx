import React, { useState, useEffect } from "react";
import { Card, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {
  createCategory,
  deleteCategory,
  getCategoryAPI,
  getSingleVideo,
  updateCategory,
  deleteVideo,
} from "../services/AllAPI";

const AllCategories = ({ setvideoDeletedResponse,categoryVideoDeletedResponse }) => {
  const [show, setShow] = useState(false);

  const [showVideo, setShowVideo] = useState(false);

  const [categoryName, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [Vdata, setVData] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleClose = () => setShow(false);

  const handleCloseVideo = () => setShowVideo(false);


  const handleShow = () => setShow(true);

  const createNewCategory = async () => {
    if (categoryName) {
      try {
        const category = { categoryName, allVideos: [] };
        await createCategory(category);
        setShow(false);
        setCategory("");
        getCategory();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please Fill The Form");
    }
  };

  useEffect(() => {
    getCategory();
  }, [categoryVideoDeletedResponse]);

  const getCategory = async () => {
    try {
      let apiResponse = await getCategoryAPI();
      setData(apiResponse.data);
      console.log(apiResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteClick = async (id) => {
    try {
      await deleteCategory(id);
      getCategory();
    } catch (error) {
      console.error(error);
    }
  };

  const dragOverContent = (e) => {
    e.preventDefault();
  };

  const droped = async (e, catData) => {
    let vId = e.dataTransfer.getData("videoDetails");

    try {
      let response = await getSingleVideo(vId);

      if (response.status >= 200 && response.status <= 300) {
        catData.allVideos.push(response.data);
        await updateCategory(catData.id, catData);
        let responce = await deleteVideo(vId);
        setvideoDeletedResponse(responce);
      }
    } catch (error) {
      console.error(error);
    }
    // console.log(response.data);
  };

  const handleShowVideo = (video) => {
    setSelectedVideo(video);
    setShowVideo(true);
  };

  const handleCategoryDrag = (e,categoryId,videoObj)=>{
    console.log(`started dragging ${videoObj.id} in ${categoryId}`);

    let dataToTransfer = {
      videoObj,categoryId
    }

    e.dataTransfer.setData("fromCategoryVideo",JSON.stringify(dataToTransfer))

  }

  return (
    <>
      <div className="d-flex align-items-center gap-5">
        <h4>All Categories</h4>
        <button
          onClick={handleShow}
          className="btn btn-warning rounded-circle  fw-bolder fs-5 "
        >
          +
        </button>
      </div>

      {data.length > 0 ? (
        data.map((val, index) => (
          <div
            onDragOver={(e) => dragOverContent(e)}
            onDrop={(e) => droped(e, val)}
            key={index}
            style={{ minHeight: "200px" }}
            className="container-fluid border border-2 rounded mt-3"
          >
            <div className="d-flex justify-content-between">
              <h4>{val.categoryName}</h4>
              <button onClick={() => onDeleteClick(val.id)} className="btn">
                {" "}
                <i className="fa-solid fa-trash text-danger"></i>
              </button>
            </div>

            <div className="row">
              {val.allVideos.map((a, index) => (
                <div draggable={true} onDragStart={(e)=>handleCategoryDrag(e,val.id,a)} key={index} className="col-6">
                  <Card
                    // draggable={true}
                    // onDragStart={(e) => onVideoDrag(e, a.id)}
                    key={index}
                    style={{ width: "260px" }}
                    className="mb-2"
                  >
                    <Card.Img
                      variant="top"
                      src={a.image}
                      style={{ height: "200px", width: "100%" }}
                      onClick={() => handleShowVideo(a)}
                    />
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <Card.Title onClick={() => handleShowVideo(a)}>
                          {a.caption}
                        </Card.Title>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-danger">No Category Found</h1>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <FloatingLabel
              controlId="floatingInput"
              label="Category Name"
              className="mb-3"
            >
              <Form.Control
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Category Name"
              />
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createNewCategory}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>


      {selectedVideo && (
        <Modal show={showVideo} onHide={handleCloseVideo} size="lg" centered>
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

export default AllCategories;
