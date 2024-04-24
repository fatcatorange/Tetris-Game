import React from "react";
import './MultiPlayerGameOverPanel.css';

export default function MultiPlayerGameOverPanel(props){
  let text;
  if(props.score > props.opponentScore)
  { 
    text = "you win!"
  }
  else if(props.score === props.opponentScore)
  {
    text = "draw"
  }
  else
  {
    text = "you lose!"
  }
  return (
    <div className="multiplayer-game-over-panel">
            <div>{text}</div>
            <div className="button-container">
                <button className="rematch-button" onClick = {props.rematch}>rematch</button>
                <button className="rematch-button" onClick = {props.quit}>quit</button>
            </div>
            
        </div>
  )
}