import TetrisGame from './TetrisGame';
import React from 'react';
import './App.css';
import HomePage from './HomePage';
import WaitingPage from './waitingPage';
import MultiplayerGame from './MultiplayerGame'
import PlayWithFriend from './PlayWithFriend';
import SpecialWaitingRoom from './SpecialWaitingRoom';

function App() {
  const [nowPage,setNowPage] = React.useState("homePage")
  const [roomID,setRoomID] = React.useState("")
  const [playerID,setPlayerID] = React.useState("")
  const [multiPlayerID,setMultiPlayerID] = React.useState("");
  let page;
  if(nowPage === "homePage")
  {
    page = <HomePage startSinglePlayerMode = {()=>(setNowPage("singlePlayerMode"))} startMatching = {()=>(setNowPage("waitingForMatch"))}
     playWithFriend = {()=>(setNowPage("playWithFriend"))}/>
  }
  else if(nowPage === "singlePlayerMode")
  {
    page = <TetrisGame backToHomePage = {()=>(setNowPage("homePage"))}/>
  }
  else if(nowPage === "waitingForMatch")
  {
    page = <WaitingPage backToHomePage = {()=>(setNowPage("homePage"))} startMultiplayerMode = {()=>(setNowPage("startMultiplayerMode"))}
                        setRoomID = {(id)=>setRoomID(id)} setPlayerID = {(id)=>setPlayerID(id)}/>
  }
  else if(nowPage === "startMultiplayerMode")
  {
    page = <MultiplayerGame playerID = {playerID} roomID = {roomID} backToHomePage = {()=>(setNowPage("homePage"))}/>
  }
  else if(nowPage === "playWithFriend")
  {
    page = <PlayWithFriend backToHomePage = {()=>(setNowPage("homePage"))} specialWaitingRoom = {()=>(setNowPage("specialWaitingRoom"))}
    startMultiplayerMode = {()=>(setNowPage("startMultiplayerMode"))} setRoomID = {(id)=>setRoomID(id)} setPlayerID = {(id)=>setPlayerID(id)}/>
  }
  else if(nowPage === "specialWaitingRoom")
  {
    page = <SpecialWaitingRoom backToHomePage = {()=>(setNowPage("homePage"))} startMultiplayerMode = {()=>(setNowPage("startMultiplayerMode"))}
    setRoomID = {(id)=>setRoomID(id)} setPlayerID = {(id)=>setPlayerID(id)} roomID = {roomID}/>
  }
  return (
    page
    
  );
}

export default App;
