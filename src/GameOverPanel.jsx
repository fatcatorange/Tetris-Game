import React from "react";
import './GameOverPanel.css';
import './TetrisGame.css'

export default function GameOverPanel(props){


    return (
        <div className="game-over-panel">
            <div className="reset-button">Game Over</div>
            <div className="button-panel">
                <button className="rematch-button" onClick = {props.resetGame}>play again</button>
                <button className="rematch-button" onClick = {props.backToHomePage}>quit</button>
            </div>
            
        </div>
    )
}