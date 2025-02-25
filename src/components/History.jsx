import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  deleteHistory from "../services/AllAPI";
import getAllHistory from "../services/allAPI"

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      let apiresponse = await getAllHistory();
      setHistoryData(apiresponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteClick = async(id)=>{
    try {
      await deleteHistory(id)
      getHistory()
    } catch (error) {
      console.error(error);    
    }
  }

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className="container d-flex justify-content-between">
        <h3>Watch History</h3>
        <Link to={"/home"}>Back to Home</Link>
      </div>
      <table className="container my-5 table">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Caption</th>
            <th>Link</th>
            <th>Time Stamp</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {historyData.length > 0
            ? historyData.map((value, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.caption}</td>
                  <td>
                    <Link
                      to={`https://www.youtube.com/watch?v=${value.videoURL}`}
                      target="_blank"
                    >
                      https://www.youtube.com/watch?v=${value.videoURL}
                    </Link>
                  </td>
                  <td>{value.formatedDate}</td>
                  <td>
                    <button onClick={()=>onDeleteClick(value.id)} className="btn">
                      <i className="fa-solid fa-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              ))
            : <div className="mt-3 p-3 border border-5 border-danger text-center"> No History Found</div>}
        </tbody>
      </table>
    </div>
  );
};

export default History;
