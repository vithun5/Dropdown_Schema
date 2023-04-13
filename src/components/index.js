import React from "react";
import { useState } from "react";
import Popup from "./PopUp/Popup";
import "../App.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
const SaveSegment = () => {
  const [popUp, setPopUp] = useState(false);

  return (
    <div className="app-wrapper">
      <div className="navbar-div">
        <MdKeyboardArrowLeft className="arrow" />
        <h3>View Audience</h3>
      </div>
      <div className="button-div">
        <button onClick={() => setPopUp(true)}>Save Segment</button>
      </div>

      {popUp && (
        <div>
          <div id="background-fade"></div>
          <div className="popUp-wrapper">
            <Popup popUp={setPopUp} />
          </div>
        </div>
      )}
    </div>
  );
};
export default SaveSegment;
