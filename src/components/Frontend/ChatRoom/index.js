import React, {useState,useEffect} from 'react';
import "./css.css"
import { collection,query, orderBy, onSnapshot,doc,getDoc,addDoc,where, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import moment from 'moment';
import {db,auth} from '../../../firebase';
import appointmentAction from '../../../actions/appointment.action';
import { useParams } from "react-router-dom"
import Sidebaruser from "../Sidebaruser"
const  App=()=>  {
 
  let unsubscribe;

  const params = useParams();
    const [input,setInput]=useState("");
  const [listmessages,setlistmessages]=useState([]);
  const [myId,setMyId]=useState(null);
  const [receiverId,setReceiverId]=useState(null);
  const [userData,setUserData]=useState(null);
  const [expertData,setExpertData]=useState("");
  const [chatRoomId,setChatRoomId]=useState(null)
  const scrollToBottom = () => {
    const objDiv = document.getElementById('scrollbarbc');
        objDiv.scrollTop = objDiv.scrollHeight;
    
  }
// sbfv
  const getRealtimeUsers =async () => { 
    console.log("wdcdcdc")
    if(chatRoomId){

    const messageRef = collection(db, "room",chatRoomId, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
        //   console.log("Id: ", doc.id, "Data: ", doc.data());
          if(1){
                        users.push(doc.data());
                    }
        });
        console.log("user:",users)
        setlistmessages(users)
        scrollToBottom()
      });

    return unsubscribe;
    }
}
useEffect(()=>{
  getRealtimeUsers();
},[chatRoomId])
function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + '</a>';
  })
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}
useEffect(() => {
  let id =params.id;
  console.log("ll",id)
  appointmentAction.getChatAppointmentById({id},(err,res)=>{
    if(err){

    }else{
      let {chatappointmentdata,expertProfileData}=res.data;
      let data=chatappointmentdata;
      console.log(chatappointmentdata,expertProfileData,"datais herre ")
      setUserData(data.userId);
      setExpertData(expertProfileData);
      setChatRoomId(data.chatRoomId);
      setReceiverId(data.expertId._id);
      setMyId(data.userId._id);

      console.log(res.data);
    }
  })
    getRealtimeUsers();
}, []);



  const updateMessage = async () => {
      let text=urlify(input);

      console.log(text);
      
    
      if(expertData&&userData,chatRoomId&&myId){
        let msgObj={
          sendId:myId,
          message:text,
          type:0,
          receiverid:receiverId,
          imageUrl:"",  
        }
      const messageRef = collection(db, "room",chatRoomId, "messages");
    
    addDoc(messageRef, {
        ...msgObj,
        isView: false,
        createdAt: new Date()
    
    }).then((data) => {
        console.log(data)
        scrollToBottom()
        setInput("");
    })
    .catch(error => {
        console.log(error)
    });
  }

}
const formHandler = (e) => {
  console.log(e);
  console.log(e.target)
  const file = e.target.files[0];
  console.log( e.target.files, e.target.files[0])
  if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)){
    alert('not an image');
    return
  }
    
  uploadFiles(file);
};

const uploadFiles = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `files/${file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);
    if(expertData&&userData,chatRoomId&&myId){
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          let msgObj={
                        sendId:myId,
                        message:"",
                        type:1,
                        receiverid:receiverId,
                        imageUrl:downloadURL, 
                        fileName:file.name 
                      }
          const messageRef = collection(db, "room",chatRoomId, "messages");
          addDoc(messageRef, {
              ...msgObj,
              isView: false,
              createdAt: new Date()
          
          }).then((data) => {
              console.log(data)
              scrollToBottom()
          })
          .catch(error => {
              console.log(error)
          });
        });
      }
    );
    }
};
const formHandler1 = (e) => {
    console.log(e);
    console.log(e.target)
    const file = e.target.files[0];
    console.log( e.target.files, e.target.files[0])
    uploadFiles1(file);
  };
  
  const uploadFiles1 = (file) => {
      const storage = getStorage();
      const storageRef = ref(storage, `files/${file.name}`);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      if(expertData&&userData,chatRoomId&&myId){
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            let msgObj={
              sendId:myId,
              message:"",
              type:2,
              receiverid:receiverId,
              imageUrl:downloadURL, 
              fileName:file.name 
            }
            const messageRef = collection(db, "room", chatRoomId, "messages");
            addDoc(messageRef, {
                ...msgObj,
                isView: false,
                createdAt: new Date()
            
            }).then((data) => {
                console.log(data)
                scrollToBottom()
            })
            .catch(error => {
                console.log(error)
            });
          });
        }
      );
      }
  };
 
    return (
    <>
    <section className="admin-wrapper">
         <Sidebaruser/>
         <div className="admin-content-wrapper">
            <div className="row">
               <div className="col-lg-12">
  <div class="app">
 <div class="header">
  <div class="logo">
  <img class="user-profile account-profile" src={expertData.profilePic} alt=""/>
  </div>
  <div class="search-bar">
   <h1>{expertData.firstName?expertData.firstName:""} </h1>
  </div>
 </div>
 <div class="wrapper">
 <div class="chat-area" id='scrollbarbc'>
   
   <div class="chat-area-main">
   {
      listmessages.length>0&&myId&&expertData&&userData?
       listmessages.map(e=>{
        let sentby="";
        let userprofile=expertData.profilePic;
        console.log(e.type,'dwccd')
        if(e.sendId===myId){
          sentby="owner"
          userprofile=userData.profilePic

        }
          if(e.type==0){
            return(
              
        <>  
        <div class={`chat-msg ${sentby}`}>
         <div class="chat-msg-profile">
       <img class="chat-msg-img" src={userprofile} alt="" />
       <div class="chat-msg-date">{moment(e.createdAt.seconds).format("dddd, MMMM Do")}</div>
        </div>
       <div class="chat-msg-content">
       <div class="chat-msg-text">  
        <p dangerouslySetInnerHTML={{__html: e.message}}>

        </p>
</div>
       </div>
       </div>
        </>
       )}else if(e.type==1){
        return(
        <div class={`chat-msg ${sentby}`}>
        <div class="chat-msg-profile">
      <img class="chat-msg-img" src={userprofile} alt="" />
      <div class="chat-msg-date"> 14/2022</div>
       </div>
      <div class="chat-msg-content">
      <div class="chat-msg-text">
      <img src={e.imageUrl} /></div>
      </div>
      </div>
        )
       }else if(e.type==2)
       return(
        <div class={`chat-msg ${sentby}`}>
        <div class="chat-msg-profile">
      <img class="chat-msg-img" src={userprofile}  alt="" />
      <div class="chat-msg-date">{moment(e.createdAt.seconds).format("dddd, MMMM Do")}</div>
       </div>
      <div class="chat-msg-content">
      <div class="main-flex">
           <div class="pdf-icon">
          <ul>
             <li>
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>  </li>
              <li><h5> &nbsp; {e.fileName?e.fileName:"file"}</h5></li> 
           
          </ul>
          </div>
          <div class="down-icon">
          <a href={e.imageUrl} download><i class="fa fa-download" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
      </div>
       )
       })       
     :""}
   </div>
   <div class="chat-area-footer">
   <label class="custom-file-upload">
   <input type="file" className="input" accept="image/png, image/jpeg" onChange={e=>{
     e.preventDefault();
     formHandler(e);
   }} />
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image">
     <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
     <circle cx="8.5" cy="8.5" r="1.5" />
     <path d="M21 15l-5-5L5 21" /></svg>
</label>
     <label class="custom-file-upload">
   <input type="file" className="input" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
   onChange={e=>{
     e.preventDefault();
     formHandler1(e);
   }} />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip">
     <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
</label>
    <input type="text" placeholder="Type something here..." value={input}  onChange={(e)=>{
      setInput(e.target.value);
    }}
     onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              updateMessage(event.target.value);
                            }
                          }}
    />
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile">
     <circle cx="12" cy="12" r="10" />
     <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up">
     <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /> </svg>
   </div>
  </div>
 </div>
</div>
</div></div>
</div>
</section>
    </>
    );
  
}


export default App;


