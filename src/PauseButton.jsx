import React from "react";
import './TetrisGame.css';
import playButtonImage from './image/play.png'
import pauseButtonImage from './image/pause.png'

export default function PauseButton(props){
    return(
        <div>
            {props.pause === true?
            <img src={playButtonImage} className="play-button" onClick={props.pauseGame}/>:
            <img src={pauseButtonImage} className="play-button" onClick={props.pauseGame}/>}
        </div>
    )
}