import React, { useState, useCallback, useEffect } from 'react';
import {useLocation,useNavigate } from 'react-router-dom'
import Loader from "react-js-loader";
import Room from './Room';
import './convo/Video.css'
import ConversationsApp from './ConversationApp';
import { prependOnceListener } from 'superagent';
const VideoChat = (props) => {
//   const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [identity,setIdentity]=useState('');
  const [token, setToken] = useState(null);
  const [loading,setLoading]=useState(true);
const [convoId,setConvoId]=useState('');
//   const handleUsernameChange = useCallback(event => {
//     setUsername(event.target.value);
//   }, []);
const location = useLocation();
const history=useNavigate();
  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);
  const handleSubmit = useCallback(async () => {
    // event.preventDefault();
    const data = await fetch('http://localhost:5000/website/videoChatTokenUser', {
      method: 'POST',
      body: JSON.stringify({
       appointmentId:location.state.appointmentId,
        // convoId:localStorage.getItem('convoId')==='undefined'?'':localStorage.getItem('convoId'),
      }),
      headers: {
        'Content-Type': 'application/json',
        'authorization':localStorage.getItem('token')
      }
    }).then(res => res.json());
    console.log(data,'data')
    setToken(data.data.token);
    setRoomName(data.data.roomId);
    setIdentity(data.data.identity);
    // localStorage.setItem("convoId",data.data.convoId);
  }, [ roomName]);
  
  useEffect(() => {
    
  handleSubmit();
  },[])
  const handleLogout = useCallback(event => {
    setToken(null);
    history('/appointmentdetails')
  }, []);

  let render;
  if (token) {
    render = (
      <div className="row" style={{marginTop: '95px'}}>  
      <div className='col-lg-8'> 
        <Room roomName={roomName} token={token} handleLogout={handleLogout} />
           </div>
           <div className='col-lg-4'>
               <ConversationsApp token={token} name={identity} room={roomName} />
               </div>  
      </div>
    );
  } else {
    render = (
        <div className='row' style={{marginTop: '95px'}}>
        <div className='item'>
        <Loader type="spinner-cub" bgColor={"#000"} title={"Loading"} color={'#000'} size={100} />
         {/* <p>hi ashish sir</p> */}
        </div>
    </div>
    );
  }
  return render;
};

export default VideoChat