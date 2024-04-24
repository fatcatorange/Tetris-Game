import React from "react";
import './TetrisGame.css'

export default function PaintNextBrick(props){

    let board = []
    for(let i=0;i<6;i++)
    {
        let rowBoard = []
        for(let j=0;j<5;j++)
        {
            rowBoard.push(<div key = {"next" +i + "," + j}className="brick"></div>)
        }
        board.push(rowBoard)
    }

    let brickType = props.nextBrickType

    if(brickType === 0)
    {
        board[1][2] = (<div key = {"next1"}className="I-brick"></div>)
        board[2][2] = (<div key = {"next2"} className="I-brick"></div>)
        board[3][2] = (<div key = {"next3"} className="I-brick"></div>)
        board[4][2] = (<div key = {"next4"} className="I-brick"></div>)
    }
    else if(brickType === 1)
    {
        board[2][2] = (<div key = {"next1"} className="O-brick"></div>)
        board[3][2] = (<div key = {"next2"} className="O-brick"></div>)
        board[3][3] = (<div key = {"next3"} className="O-brick"></div>)
        board[2][3] = (<div key = {"next4"} className="O-brick"></div>)
    }
    else if(brickType === 2)
    {
        board[1][2] = (<div key = {"next1"} className="J-brick"></div>)
        board[2][2] = (<div key = {"next2"} className="J-brick"></div>)
        board[3][2] = (<div key = {"next3"} className="J-brick"></div>)
        board[3][1] = (<div key = {"next4"} className="J-brick"></div>)
    }
    else if(brickType === 3)
    {
        board[1][2] = (<div key = {"next1"} className="L-brick"></div>)
        board[2][2] = (<div key = {"next2"} className="L-brick"></div>)
        board[3][2] = (<div key = {"next3"} className="L-brick"></div>)
        board[3][3] = (<div key = {"next4"} className="L-brick"></div>)
    }
    else if(brickType === 4)
    {
        board[2][3] = (<div key = {"next1"} className="S-brick"></div>)
        board[2][2] = (<div key = {"next2"} className="S-brick"></div>)
        board[3][2] = (<div key = {"next3"} className="S-brick"></div>)
        board[3][1] = (<div key = {"next4"} className="S-brick"></div>)
    }
    else if(brickType === 5)
    {
        board[2][1] = (<div key = {"next1"} className="Z-brick"></div>)
        board[2][2] = (<div key = {"next2"} className="Z-brick"></div>)
        board[3][2] = (<div key = {"next3"} className="Z-brick"></div>)
        board[3][3] = (<div key = {"next4"} className="Z-brick"></div>)
    }
    else
    {
        board[2][2] = (<div key = {"next1"} className="T-brick"></div>)
        board[3][1] = (<div key = {"next2"} className="T-brick"></div>)
        board[3][2] = (<div key = {"next3"} className="T-brick"></div>)
        board[3][3] = (<div key = {"next4"} className="T-brick"></div>)
    }


    return (
        <div className="nextBrickDisplay">
            {board}
        </div>
    )
}