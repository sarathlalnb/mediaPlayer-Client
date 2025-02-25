import React from "react";
import { Link } from "react-router-dom";
import musicImg from "../assets/images/33a46f727dbe790d436616a1f56fce9c.gif";
import Card from "react-bootstrap/Card";
import music1 from "../assets/images/music1img.png";
import music2 from "../assets/images/music2img.jpg";
import music3 from "../assets/images/music3img.webp";

const Content = () => {
  return (
    <div className="container ">
      {/* Starting part */}
      <div className="row align-items-center">
        <div className="col-5">
          <h3>
            {" "}
            Welcome To <span className="text-warning">Media Player</span>
          </h3>
          <p style={{textAlign:"justify"}}>
            Media Player App will allow user to add or remove their uploaded
            videos from youTube and also allow them to arrange it in different
            categories by drag and drop. User can also have the provision to
            manage their watch history as well. What are you waiting for, let
            starts exploring our site!!!
          </p>
          <Link to={"/home"} className="btn btn-info">
            Get Started
          </Link>
        </div>
        <div className="col-1"></div>
        <div className="col-6">
          <img src={musicImg} alt="" />
        </div>
      </div>
      {/* Features Part */}
      <div className="mt-5">
        <h3 className="text-center mb-5">Features</h3>
        <div className="row">
          <div className="col-4">
            {" "}
            <Card style={{ width: "18rem", height: "28rem" }}>
              <Card.Img variant="top" src={music1} />
              <Card.Body>
                <Card.Title>Managing Videos</Card.Title>
                <Card.Text>
                  Users can upload, view and remove the videos.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-4">
            {" "}
            <Card style={{ width: "18rem", height: "28rem" }}>
              <Card.Img variant="top" src={music2} />
              <Card.Body>
                <Card.Title>Categorise Videos</Card.Title>
                <Card.Text>Categorise Videos</Card.Text>
              </Card.Body>
            </Card>
          </div>{" "}
          <div className="col-4">
            {" "}
            <Card style={{ width: "18rem", height: "28rem" }}>
              <Card.Img variant="top" src={music3} />
              <Card.Body>
                <Card.Title>Managing History</Card.Title>
                <Card.Text>
                  Users can manage the watch history of all videos.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      {/* last part */}
      <div className="row border rounded mt-5 p-5 align-items-center">
        <div className="col-5">
          <h3 className="text-warning">Simple, Fast and Powerful</h3>
          <p style={{textAlign:"justify"}}>
            {" "}
            <span className="fs-5 fw-bolder">Play Everything:</span> Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quas, animi
            perspiciatis! Deleniti maxime
          </p>
          <p style={{textAlign:"justify"}}>
            {" "}
            <span className="fs-5 fw-bolder">Play Everything:</span> Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quas, animi
            perspiciatis! Deleniti maxime
          </p>
          <p style={{textAlign:"justify"}}>
            {" "}
            <span className="fs-5 fw-bolder">Play Everything:</span> Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quas, animi
            perspiciatis! Deleniti maxime
          </p>
        </div>
        <div className="col-1"></div>
        <div className="col-6">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Po3jStA673E?si=-EJyvO2dnwouFOD-"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Content;
