import React from "react";
import './CantFindRoom.css';

export default function CantFindRoom(props){
  return (
    <div className="cant-find-Panel">
        <div>Room not found!</div>
            <button className="back-button" onClick = {props.back}>back</button>   
    </div>
  )
}