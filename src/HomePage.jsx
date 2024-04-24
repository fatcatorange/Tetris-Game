import React from "react";
import './HomePage.css'
import TetrisLogo from "./image/tetris-logo.png"

export default function HomePage(props){
    return(
        <div>
            <div className="tetris-title">
                <div></div>
                <img src={TetrisLogo} className="tetris-logo" />
                <div></div>
            </div>

            <div className="select-mode-background">
                <div></div>
                <div className="select-mode-panel">
                    <button className = "mode-button" onClick = {props.startSinglePlayerMode}>
                        single player
                    </button>
                    <button className="mode-button" onClick ={props.startMatching}>
                        multiplayer
                    </button>
                    <button className="mode-button" onClick ={props.playWithFriend}>
                        play with friend
                    </button>
                </div>
                <div></div>
            </div>
            
        </div>
    )
}