import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { uploadVideo } from "../services/allAPI";

const Add = ({setVideoResp}) => {

  const [video, setVideo] = useState({
    caption: "",
    image: "",
    videoURL: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(false);

  const seperateYoutubeURL = (value) => {
    console.log(typeof value);

    if (value.includes(".be/")) {
      const videoID = value.split(".be/")[1];
      setVideo({ ...video, videoURL: videoID });
      console.log(videoID);
      setError(false);
    } else {
      setError(true);
      console.error("Invalid Youtube Link");
    }
  };

  const handleSave = async () => {
    if (video.caption && video.image && video.videoURL) {
      try {
        let response = await uploadVideo(video);
        setVideoResp(response)
        if (response.status >= 200 && response.status <= 300) {
          alert("Successfully Added your video");
          setShow(false);
          setVideo({
            caption: "",
            image: "",
            videoURL: "",
          });
        } else {
          alert("Error Occurred Please Contact ADMIN");
        }
      } catch {
        alert("An error occurred ");
      }
    } else {
      alert("please fill the form..");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center gap-5">
        <h4>Upload New Video</h4>
        <button
          onClick={handleShow}
          className="btn btn-warning rounded-circle  fw-bolder fs-5 "
        >
          +
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border border-dark p-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Video Caption"
              className="mb-3"
            >
              <Form.Control
                onChange={(e) => {
                  setVideo({ ...video, caption: e.target.value });
                }}
                type="text"
                placeholder="Video"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Video Image URL"
              className="mb-3"
            >
              <Form.Control
                onChange={(e) => setVideo({ ...video, image: e.target.value })}
                type="text"
                placeholder="Video Image URL"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Video Youtube Link"
              className="mb-3"
            >
              <Form.Control
                onChange={(e) => seperateYoutubeURL(e.target.value)}
                type="text"
                placeholder="Video Youtube Link"
              />
            </FloatingLabel>
            {error ? (
              <div>
                <p className="text-danger">
                  Invalid Youtube URL please try again....
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Add;
