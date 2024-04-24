import React from "react";
import PaintTetris from "./PaintTetris";
import './TetrisGame.css'
import PaintNextBrick from "./PaintNextBrick";
import PaintScore from "./PaintScore";
import GameOverPanel from "./GameOverPanel";
import PauseButton from "./PauseButton";
import tetrisTitleImage from "./image/tetris-logo.png"

export default function TetrisGame(props){
    const [board,setBoard] = React.useState(()=>{
        let tempBoard = []
        for(let i =0;i<20;i++)
        {
            let tempBoardInside = []
            for(let j=0;j<10;j++)
            {
                tempBoardInside.push(0)
            }
            tempBoard.push(tempBoardInside)
        }
        return tempBoard
    });

    const [nowBrick,setNowBrick] = React.useState([[0,5],[1,4],[1,5],[1,6]])
    const [cleaning,setCleaning] = React.useState(false)
    const [brickType,setBrickType] = React.useState([[[0,5],[1,5],[2,5],[3,5]],[[0,4],[0,5],[1,4],[1,5]],
        [[0,5],[1,5],[2,5],[2,4]],[[0,4],[1,4],[2,4],[2,5]],
        [[0,5],[0,4],[1,4],[1,3]],[[0,4],[0,5],[1,5],[1,6]],[[0,5],[1,4],[1,5],[1,6]]])
    const [nowBrickType,setNowBrickType] = React.useState(6)
    const [nowBrickDir,setNowBrickDir] = React.useState(0)
    const [nextBrick,setNextBrick] = React.useState(1)
    const [canRotate,setCanRotate] = React.useState(true)
    const [downMove,setDownMove] = React.useState(true)
    const [score,setScore] = React.useState(0)
    const [clearLine,setClearLine] = React.useState(0)
    const [level,setLevel] = React.useState(1)
    const [dead,setDead] = React.useState(false)
    const [pause,setPause] = React.useState(false)
    const downMoveTime = 500
    const minimumDownSpeed = 100
    const maximumDownSpeed = 1000;

    React.useEffect(()=>{
            const intervalID = setInterval(function(){
                setCleaning((prev) => {
                    if(prev === false && pause === false)
                    {
                        dropBrick()
                    }
                    return prev;
                })
        },Math.max(maximumDownSpeed - ((level-1) * 100),minimumDownSpeed))
        return ()=>clearInterval(intervalID)
    },[level,pause])
    
    function pauseGame(){
        setPause(prev=>(!prev));
    }

    function resetGame(){
        setBoard(()=>{
            let tempBoard = []
            for(let i =0;i<20;i++)
            {
                let tempBoardInside = []
                for(let j=0;j<10;j++)
                {
                    tempBoardInside.push(0)
                }
                tempBoard.push(tempBoardInside)
            }
            return tempBoard
        })
        setNowBrick([[0,5],[1,4],[1,5],[1,6]])
        setCleaning(false)
        setBrickType([[[0,5],[1,5],[2,5],[3,5]],[[0,4],[0,5],[1,4],[1,5]],
            [[0,5],[1,5],[2,5],[2,4]],[[0,4],[1,4],[2,4],[2,5]],
            [[0,5],[0,4],[1,4],[1,3]],[[0,4],[0,5],[1,5],[1,6]],[[0,5],[1,4],[1,5],[1,6]]])
        setNowBrickType(6)
        setNowBrickDir(0)
        setNextBrick(1)
        setCanRotate(true)
        setDownMove(true)
        setScore(0)
        setClearLine(0)
        setLevel(1)
        setDead(false)
        setPause(false)
    }

    function dropBrick(){
        setNowBrick((prev)=>{
            let tempBrick = prev.map((element)=>([element[0] + 1, element[1]]))
            return tempBrick
        })
    }
    
    function setDownBrick(){
        setNowBrick((prev)=>{
            for(let i=0;i<nowBrick.length;i++)
            {
                board[prev[i][0]][prev[i][1]] = nowBrickType + 1;
            }
            return prev
        })
        
        //console.log(board)
        
    }

    React.useEffect(checkDownBrick,[nowBrick,pause])

    function checkDownBrick(){
        if(pause === true)
        {
            return;
        }
        //console.log(nowBrick)
        for(let i=0;i<nowBrick.length;i++)
        {
            if((nowBrick[i][0] === 19 || board[nowBrick[i][0] + 1][nowBrick[i][1]] !== 0) && cleaning === false)
            {
                setCleaning(true)
                setTimeout(setNewBrick,downMoveTime)
                break;
            }
        }
    }

    function setNewBrick(){
        setNowBrick((prev)=>{
            for(let i=0;i<prev.length;i++)
            {
                if((prev[i][0] === 19 || board[prev[i][0] + 1][prev[i][1]] !== 0) )
                {
                    setDownBrick();
                    setDownMove(false)
                    setTimeout(()=>{
                        cleanBrick();
                        setNowBrick(generateNewBrick());
                        setCleaning(false)
                        setDownMove(true)
                    },500)  
                    return prev
                }
            }
            setCleaning(false)
            setDownMove(true)
            return prev
        })



    }

    function generateNewBrick(){
        //console.log(brickType)
        const randomNumber = Math.floor(Math.random() * brickType.length);
        checkDead(brickType[nextBrick])
        setNowBrickType(nextBrick)
        const temp = brickType[nextBrick].map(element=>(element))
        setNextBrick(randomNumber)
        setNowBrickDir(0)
        return temp;
    }

    function checkDead(newBrick){
        setBoard((prev)=>{
            for(let i=0;i<newBrick.length;i++)
            {
               if(prev[newBrick[i][0]][newBrick[i][1]] != 0)
               {
                    setDead(true);
                    setPause(true);
               } 
            }
            return prev;
        })
        
    }
    

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if(pause === true)
            {
                return;
            }
            if (event.key === "ArrowUp" ) {
                rotateBrick();
            } else if (event.key === "ArrowDown" && cleaning === false) {
                moveDown();
            } else if (event.key === "ArrowLeft" && downMove === true) {
                moveLeft();
            } else if (event.key === "ArrowRight" && downMove === true) {
                moveRight();
            }
            else if (event.code === 'Space') {
                downToBottom();
            }
            
        };
    
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [nowBrick,cleaning,nowBrickDir,nowBrickType,downMove,pause]);

    function downToBottom(){
        let downBrick = nowBrick.map((element) => [element[0],element[1]])
        while(1)
        {
            let check = false;
            for(let i=0;i<downBrick.length;i++)
            {
                if(downBrick[i][0] + 1 >= 20 || board[downBrick[i][0] + 1][downBrick[i][1]] != 0)
                {
                    check = true;
                    break;
                }
            }
            if(check === true)
            {
                setNowBrick(downBrick)
                setCleaning(true)
                setNewBrick()
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
    }

    function checkValidRotate(prev,temp,nowBrickDir){
        for(let i=0;i<4;i++)
            {
                if(temp[i][1] < 0 || temp[i][1] > 9 || temp[i][0] >= 19 ||
                    (temp[i][1] >= 0 && board[temp[i][0]][temp[i][1]] !== 0) )
                {
                    return prev
                }
                if(( board[temp[i][0]][temp[i][1]] !== 0))
                {
                    return prev
                }
                if((board[nowBrick[i][0]][nowBrick[i][1]] !== 0))
                {
                    return prev
                }

            }
            
            setNowBrickDir((last)=>{
                if((nowBrickDir + 1)%4 === last )
                {
                    return last;
                }
                else
                {
                    setCanRotate(false)
                    setTimeout(()=>setCanRotate(true),100)
                    return (nowBrickDir + 1)%4
                }
            })
            return temp;
    }

    function IbrickRoatate(prev)
    {
        const nowDir = nowBrickDir;
        if(nowBrickDir%2 === 0)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+2,element[1]+2];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-2,element[1]-2];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
    }

    function JbrickRotate(prev){
        const nowDir = nowBrickDir;
        if(nowBrickDir%4 === 0)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+2,element[1]+2];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else if(nowBrickDir%4 === 1)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+2,element[1]-2];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else if(nowBrickDir%4 === 2)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-2,element[1]-2];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-2,element[1]+2];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
    }

    function LbrickRotate(prev){
        const nowDir = nowBrickDir;
        if(nowBrickDir%4 === 0)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+2,element[1]+2];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else if(nowBrickDir%4 === 1)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+2,element[1]-2];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else if(nowBrickDir%4 === 2)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-2,element[1]-2];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-2,element[1]+2];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
    }

    function SbrickRoatate(prev)
    {
        const nowDir = nowBrickDir;
        if(nowBrickDir%2 === 0)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+2,element[1]];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-2,element[1]];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
    }

    function ZbrickRoatate(prev)
    {
        const nowDir = nowBrickDir;
        if(nowBrickDir%2 === 0)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0],element[1]+2];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0],element[1]-2];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
    }
    
    function TbrickRotate(prev){
        const nowDir = nowBrickDir;
        if(nowBrickDir%4 === 0)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+1,element[1]+1];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else if(nowBrickDir%4 === 1)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+1,element[1]-1];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else if(nowBrickDir%4 === 2)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-1,element[1]-1];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-1,element[1]+1];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
    }

    function rotateBrick(){
        setNowBrick((prev)=>{
            if(nowBrickType === 0)
            {
                return IbrickRoatate(prev);   
            }
            else if(nowBrickType === 1)
            {
                return prev;
            }
            else if(nowBrickType === 2)
            {
                return JbrickRotate(prev)
            }
            else if(nowBrickType === 3)
            {
                return LbrickRotate(prev)
            }
            else if(nowBrickType === 4)
            {
                return SbrickRoatate(prev)
            }
            else if(nowBrickType === 5)
            {
                return ZbrickRoatate(prev)
            }
            else if(nowBrickType === 6)
            { 
                return TbrickRotate(prev)
            }
        })
    }

    

    function moveRight(){
        setNowBrick((prev)=>{
            let temp = prev.map((element)=>[...element]);
            for(let i=0;i<4;i++)
            {
                if(temp[i][1] >= 9 || (temp[i][1] < 9 && board[temp[i][0]][temp[i][1]+1] !== 0))
                {
                    return prev
                }
                temp[i][1]++;
            }
            return temp;
        })
    }  
    function moveLeft(){
        setNowBrick((prev)=>{
            let temp = prev.map((element)=>[...element]);
            for(let i=0;i<4;i++)
            {
                if(temp[i][1] <= 0 || (temp[i][1] > 0 && board[temp[i][0]][temp[i][1]-1] !== 0) )
                {
                    return prev
                }
                temp[i][1]--;
            }
            return temp;
        })
    }  
    
    function moveDown(){
        setNowBrick((prev)=>{
            let temp = prev.map((element)=>[...element]);
            for(let i=0;i<4;i++)
            {
                temp[i][0]++;
            }
            return temp;
        })
    }  
    
    function cleanBrick(){
        setBoard((prev)=>{
            let newBoard = []
            for(let i=prev.length-1;i>=0;i--)
            {
                let check = true;
                for(let j=0;j<prev[i].length;j++)
                {
                    if(prev[i][j] === 0)
                    {
                        check = false;
                        break;
                    }
                }
                if(check === false)
                {
                    newBoard.push(prev[i]);
                }
            }
            addScore(20 - newBoard.length)
            while(newBoard.length < 20)
            {
                let temp = []
                for(let i=0;i<10;i++)
                {
                    temp.push(0);
                }
                newBoard.push(temp);
            }
            return newBoard.reverse()
        })
        
    }

    function addScore(clearLine){
        if(clearLine === 0)
        {
            return;
        }
        setClearLine((prev)=>{
            const newClearLine = prev + clearLine;
            if(newClearLine >= level * 10)
            {
                setLevel((prev)=>{
                    console.log(prev+1)
                    return prev+1;
                })
            }
            return newClearLine
        })
        setScore((prev)=>{
            if(clearLine === 1)
            {
                return prev + 100;
            }
            else if(clearLine === 2)
            {
                return prev + 300;
            }
            else if(clearLine === 3)
            {
                return prev + 500;
            }
            else
            {
                return prev + 800;
            }
        })
    }

    return (
        <div className="game-panel">
            <div className="tetris-title">
                <div></div>
                <img src={tetrisTitleImage} className="tetris-logo" />
                <div></div>
            </div>
            <div className="game-component-panel">
                <PaintScore score = {score} clearLine = {clearLine} level = {level} opponent = {false}/>
                <PaintTetris board  = {board} nowBrick = {nowBrick} nowBrickType = {nowBrickType}/>
                <div>
                    <PauseButton pauseGame = {pauseGame} pause = {pause}/>
                    <PaintNextBrick nextBrickType = {nextBrick}/>
                </div>
            </div>
            {dead === true && <GameOverPanel resetGame = {resetGame} backToHomePage = {props.backToHomePage}/>}
        </div>
        
    )
}