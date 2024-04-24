import React from "react";

export default function PaintOpponentBoard(props){
    let allBrick = [];
    for(let i=0;i<props.board.length;i++)
    {
        if(props.board[i] === 0)
        {
            allBrick.push(<div key={"opponent" + i} className="brick"></div>)
        }
        else if(props.board[i] === 1)
        {
            allBrick.push(<div key={"opponent" + i} className="I-brick"></div>)
        }
        else if(props.board[i] === 2)
        {
            allBrick.push(<div key={"opponent" + i} className="O-brick"></div>)
        }
        else if(props.board[i] === 3)
        {
            allBrick.push(<div key={"opponent" + i} className="J-brick"></div>)
        }
        else if(props.board[i] === 4)
        {
            allBrick.push(<div key={"opponent" + i} className="L-brick"></div>)
        }
        else if(props.board[i] === 5)
        {
            allBrick.push(<div key={"opponent" + i} className="S-brick"></div>)
        }
        else if(props.board[i] === 6)
        {
            allBrick.push(<div key={"opponent" + i} className="Z-brick"></div>)
        }
        else if(props.board[i] === 7)
        {
            allBrick.push(<div key={"opponent" + i} className="T-brick"></div>)
        }
    }

    return (<div className="game-board">
        {allBrick}
    </div>)
}