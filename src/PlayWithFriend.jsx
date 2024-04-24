import React from "react";
import './HomePage.css'
import TetrisLogo from "./image/tetris-logo.png"
import CantFindRoom from "./CantFindRoom";
import { waitingListCollection,gameRoomColloection, db } from "./firebase"
import {
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
    getDoc
} from "firebase/firestore"

export default function PlayWithFriend(props){
    const [roomCode,setRoomCode] = React.useState("")
    const [cantFind,setCantFind] = React.useState(false)
    
    function changeInput(event){
      setRoomCode(event.target.value)
    }
    
    function findRoom(){
      if(roomCode.length === 0)
      {
        setCantFind(true);
        return;
      }
      const roomID = roomCode;
      const docRef = doc(db,"specialWaitingList",roomID)
      getDoc(docRef)
      .then((data)=>{
        if(data.exists() === true)
        {
          props.setRoomID(data.data().roomID)
          props.setPlayerID(2)
          deleteDoc(docRef)
          .then(()=>{
              props.startMultiplayerMode();
          })
        }
        else
        {
          setCantFind(()=>true);
        }
      })
      
    }

    return(
        <div>
            <div className="tetris-title">
                <div >
                    <button className="back-button" onClick={props.backToHomePage}>back to home page</button>
                </div>
                <img src={TetrisLogo} className="tetris-logo" />
                <div></div>
            </div>
            {cantFind === true && <CantFindRoom back = {()=>setCantFind(false)}/>}
            <div className="select-mode-background">
                <div></div>
                <div className="select-mode-panel">
                    <button className="mode-button" onClick ={props.specialWaitingRoom}>
                        create a room
                    </button>
                    <input 
                       className="input-room-code"
                       type="text" 
                       placeholder="input room id"
                       name = "roomCode"
                       onChange = {changeInput}
                       value = {roomCode}
                    />
                    <button className="mode-button" onClick ={findRoom}>
                        join a room
                    </button>
                </div>
                <div></div>
            </div>
            
        </div>
    )
}