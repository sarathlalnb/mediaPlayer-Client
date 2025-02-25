import React, { useState } from "react";
import Add from "../reusableComponents/Add";
import { Link } from "react-router-dom";
import AllVideos from "../reusableComponents/AllVideos";
import AllCategories from "../reusableComponents/AllCategories";

const Home = () => {

  const [videoResponse,setVideoResponse] = useState("")
  const [videoDeletedResponse,setvideoDeletedResponse] = useState("")
  const [categoryVideoDeletedResponse,setcategoryVideoDeletedResponse] = useState("")

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between py-5">
        <div>
          <Add setVideoResp = {setVideoResponse}/>
        </div>
        <div>
          <Link to={'/history'}>Watch History</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <AllVideos videResp={videoResponse}  videoDeletedResponse={videoDeletedResponse} setcategoryVideoDeletedResponse={setcategoryVideoDeletedResponse}/>
        </div>
        <div className="col-6">
          <AllCategories setvideoDeletedResponse={setvideoDeletedResponse} categoryVideoDeletedResponse={categoryVideoDeletedResponse}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
