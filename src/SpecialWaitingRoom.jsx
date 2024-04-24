import React from "react";
import './HomePage.css'
import TetrisLogo from './image/tetris-logo.png'
import waitingPepe from './image/pepe-wait.gif'
import questionMark from './image/question-mark.png'
import { waitingListCollection,specialWaitingListCollection, db } from "./firebase"
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

export default function SpecialWaitingRoom(props){

    let finding = false;
    const unsubRef = React.useRef(()=>{});
    const [roomID,setRoomID] = React.useState();
    React.useEffect(()=>{
      if(finding === true)
      {
        return;
      }
      finding = true;
      let cleanBrick = []
      for(let i=0;i<20;i++)
      {
          for(let j=0;j<10;j++)
          {
              cleanBrick.push(0)
          }
      }
      const gameRoomItem = {
          player1Board:cleanBrick,
          player2Board:cleanBrick,
          player1Score:0,
          player2Score:0,
          player1Dead:false,
          player2Dead:false,
          player1Rematch:0, //0 for init,1 for confirm, 2 for reject
          player2Rematch:0,
      }
      addDoc(collection(db,"gameRoom"),gameRoomItem)
      .then((roomID)=>{
          const waitingItem = {
              roomID:roomID.id,
          }
          props.setRoomID(roomID.id)
          props.setPlayerID(1)
          addDoc(collection(db,"specialWaitingList"),waitingItem)
          .then((waitingRoomID)=>{
              const unsubscribe = onSnapshot(specialWaitingListCollection, function (snapshot){
                  setRoomID(waitingRoomID.id)
                  const findRef = doc(db,"specialWaitingList",waitingRoomID.id)
                  console.log(waitingRoomID.id)
                  getDoc(findRef)
                  .then((findDoc)=>{
                      if(findDoc.exists() === false)
                      {
                          props.startMultiplayerMode();
                      }
                  })
              })
              unsubRef.current = ()=>{
                  unsubscribe()
                  const findRef = doc(db,"specialWaitingList",waitingRoomID.id)
                  deleteDoc(findRef)
                  .then()
              }
          })
          
      })
        return ()=>(unsubRef.current());
    },[])

    function backToHomePage(){
        unsubRef.current();
        props.backToHomePage();
    }

    React.useEffect(() => {
        window.addEventListener('beforeunload', backToHomePage);
        return () => {
            window.removeEventListener('beforeunload', backToHomePage);
        };
    }, []);

    return (
        <div>
            <div className="tetris-title">
                <div className="button-container">
                    <button className="back-button" onClick={backToHomePage}>back to home page</button>
                </div>
                <img src={TetrisLogo} className="tetris-logo" />
                <div></div>
            </div>

            <div className="waiting-panel">
                <div className="waiting-image-container">
                    <img src={waitingPepe} className="waiting-image"/>
                </div>
                <div className="waiting-image-container">
                    <img src={questionMark} className="waiting-image"/>
                </div>
            </div>
            <div className="roomID">
              room ID: {roomID}
            </div>
            
        </div>
    )
}