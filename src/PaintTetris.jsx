import React from "react";
import './TetrisGame.css'

export default function PaintTetris(props){
    let allBrick = [];
    for(let i=0;i<props.board.length;i++)
    {
        let check = true;
        for(let j=0;j<props.board[i].length;j++)
        {
            if(props.board[i][j] === 0 )
            {
                check = false;
                break;
            }
        }
        for(let j=0;j<props.board[i].length;j++)
        {
            if(props.board[i][j] == 0)
                allBrick.push(<div key={i+","+j} className="brick"></div>)
            else
            {
                
                if(check === true)
                    allBrick.push(<div key={i+","+j} className="clean-brick "></div>)
                else
                {
                    if(props.board[i][j] === 1)
                    {
                        allBrick.push(<div key={i+","+j} className="I-brick "></div>)
                    }
                    else if(props.board[i][j] === 2)
                    {
                        allBrick.push(<div key={i+","+j} className="O-brick "></div>)
                    }
                    else if(props.board[i][j] === 3)
                    {
                        allBrick.push(<div key={i+","+j} className="J-brick "></div>)
                    }
                    else if(props.board[i][j] === 4)
                    {
                        allBrick.push(<div key={i+","+j} className="L-brick "></div>)
                    }
                    else if(props.board[i][j] === 5)
                    {
                        allBrick.push(<div key={i+","+j} className="S-brick "></div>)
                    }
                    else if(props.board[i][j] === 6)
                    {
                        allBrick.push(<div key={i+","+j} className="Z-brick "></div>)
                    }
                    else
                    {
                        allBrick.push(<div key={i+","+j} className="T-brick "></div>)
                    }
                }
                    
            }
        }
    }


    let downBrick = props.nowBrick.map((element) => [element[0],element[1]])
    while(1)
    {
        let check = false;
        for(let i=0;i<downBrick.length;i++)
        {
            if(downBrick[i][0] + 1 >= 20 || props.board[downBrick[i][0] + 1][downBrick[i][1]] != 0)
            {
                check = true;
                break;
            }
        }
        if(check === true)
        {
            for(let i=0;i<downBrick.length;i++)
            {
                const index = 10 * downBrick[i][0] + downBrick[i][1];
                if(props.board[downBrick[i][0]][downBrick[i][1]] === 0)
                    allBrick[index] = (<div key={downBrick[i][0] + "," + downBrick[i][1]} className="white-brick"></div>);
                else
                {
                    break;
                }
            }
            break;
        }
        else
        {
            for(let i=0;i<downBrick.length;i++)
            {
                downBrick[i][0]+=1;
            }
        }
    }
    for(let i=0;i<props.nowBrick.length;i++)
    {
        const rowIndex = props.nowBrick[i][0];
        const colIndex = props.nowBrick[i][1];
        if(props.board[rowIndex][colIndex] === 0)
        {
            const index = 10 * rowIndex + colIndex;
            if(props.nowBrickType === 0)
            {
                allBrick[index] = (<div key={rowIndex+","+colIndex} className="I-brick"></div>);
            }
            else if(props.nowBrickType === 1)
            {
                allBrick[index] = (<div key={rowIndex+","+colIndex} className="O-brick"></div>);
            }
            else if(props.nowBrickType === 2)
            {
                allBrick[index] = (<div key={rowIndex+","+colIndex} className="J-brick"></div>);
            }
            else if(props.nowBrickType === 3)
            {
                allBrick[index] = (<div key={rowIndex+","+colIndex} className="L-brick"></div>);
            }
            else if(props.nowBrickType === 4)
            {
                allBrick[index] = (<div key={rowIndex+","+colIndex} className="S-brick"></div>);
            }
            else if(props.nowBrickType === 5)
            {
                allBrick[index] = (<div key={rowIndex+","+colIndex} className="Z-brick"></div>);
            }
            else 
            {
                allBrick[index] = (<div key={rowIndex+","+colIndex} className="T-brick"></div>);
            }
            
        }
        //console.log(rowIndex,colIndex)
    }


    
    //console.log(props.board)
    return (<div className="game-board">
        {allBrick}
    </div>)
}