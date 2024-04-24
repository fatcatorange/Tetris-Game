import React from "react";
import './MultiPlayerGameOverPanel.css';

export default function BackToHome(props){

  return (
    <div className="multiplayer-game-over-panel">
        <div>Opponent does not want to play with you anymore.</div>
            <button className="rematch-button" onClick = {props.quit}>back</button>   
    </div>
  )
}