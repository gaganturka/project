import React, {useState,useEffect} from 'react';
import "./css.css"
import { collection,query, orderBy, onSnapshot,doc,getDoc,addDoc,where, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import moment from 'moment';
import {db,auth} from '../../../firebase';
import appointmentAction from '../../../actions/appointment.action';
// import expertUserActions from '../../actions/expertUser.Actions';
import { useParams } from "react-router-dom"

// const firebaseConfig = {
//   type: "service_account",
//   projectId: "borhan-33e53",
//   private_key_id: "78e6d9a4ab437e0cff49f380eee73610687d0fd4",
//   private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvGPDNPm/8zjKm\nX6GSLUwZzSe/LO/j649hV0E4RMwjaF5YwUTXAnOvTttdwaaxZ0tQEEckIJrP1QkW\n87k9b+yNMcZ0dqW/c0uFCwKSupdCKOqxvwU/9+Sf+XW8vhVlHU1WfODuyBRaj1DF\nNyBYQUM7x+ZNEWznRiRrYKqHztocGT95qINjUPTQEmPVVp2fZ/3Kyn+bvOQF+Qj7\nv9dProk3hzXkS4dObJfhyWPYg+ZlocnGeXpzKvrfY7bVmT1lyRtoAwTYzzmR6Ewy\nM1JoTyUTotqTc0r2Ji/KCO5SYbkp1558W6j9N6Sz8d1NBpuqEl/5LyJpUroIcS81\nizhNi7vtAgMBAAECggEAF0yBykW7IBAN9E54UNufKzW9yrX/i7vt/b1fC843vaRn\nHXdGIjgMzbB4Bx87/5InltU7qiZ+gxYtWfT/Wpn4h4cuiZO6FWIRk/f1lTGn6+FG\n7XTmDW9+Z/0JOh6u+R/viQkf4xYTg0Nbs4pUzvmMKTm9vtaJP7L5KKKZvm17X06S\nXGf2drXPkv87D+TUQvjmgLP5HLntLSQR6x8G4toAKvT0Uo9aHbAFpFQw7iUoirkj\nCn+wA2vwXjg2T5H1oaEarwVSCX71U6dXPD61A207xOGzFMFKfOTotoVMlkXPFN91\nu1U3Dj6erJbUbJ6eRl1+ej98ey4htEOFv9KnTt1pTwKBgQDcYHI+ocGKQkWBwVuj\nd2G2A99NoPzK9ysCUqJCG2HCT5n5NWRF/ZmkjRSlHcLQkrGcZlxPQrBr+UwVjf91\nvQ9Z2b/BfYXAZhGw3LJJFiugXZBIZTAtV0QC6/Vpm5MPzuAVrSrk/lJYSWgRVnPk\nT9Wr3Y3ktC0+0E5BZ2zSSkxIrwKBgQDLZsLnImXiNw8JDy8QpiI2pQrgO0YkCPhq\nHQ8jsBGQq/pZ3N6xUqPah4L+VZcowxwo3YQ82Ae5JvtM6qa8FxU/+WISFnYz27Dy\nNf3waIP6Eta6y9W6Se4PtEmW1uHDEOK0A1BXZNgmO3624xCRqOORfW5JanJLhMdS\noh3lRVn0IwKBgQC3SXPbSZd5kVLT72hzFXhr9N6FZw65FEduICIZj0KIZMIv9csX\nNyvRIxF3nsAHzunvpWbC+TlYJDi2eKpuVzbsSOFmYSqb8YhnK7cQeGMCdq7ot1gR\nbdIACBXNpvnyHOJcxPC3EhqUmUD3ooqy6f9ReOxpub0j0AY1+XoVkHvPuwKBgCcp\nT9lEjC0zwJdT7xHbirbOq/tkLir99yYnFiUe3yLlmbv3hIDLknSepp/lRsc4WZGc\npLs6NLJ3SOcUPqn0H8lDcJhe7r8pSzY3Iv9IgDCDtAge+rV1SnqHkauTD8CI3b0e\n7jcFWYBy8ACyUxxYUghPCA7mib70f5PvVqYv5hPVAoGAA0lx8Aer9/Xgi9c+tWCu\nTVLVkKpyuFtRx/M7is0zsYV4SZEJ0Q//rfX4cFhSwkcf03iPVNs1umE7R3Pbslx4\nA3X7wq/ioqD4oG8tx3urVN61wjRuYvbcIN2osFEqG3JsNcWoWL+ZRl3auIVaAlgk\ntQSLMH7fsrI6mwrS0FbIUxM=\n-----END PRIVATE KEY-----\n",
//   client_email: "firebase-adminsdk-rf954@borhan-33e53.iam.gserviceaccount.com",
//   client_id: "104461572710667083825",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   storageBucket:"gs://borhan-33e53.appspot.com",
//   client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rf954%40borhan-33e53.iam.gserviceaccount.com"
// };


// firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();

const  App=()=>  {
 
  let unsubscribe;

  const params = useParams();
    const [input,setInput]=useState("");
  const [listmessages,setlistmessages]=useState([]);
  const [myId,setMyId]=useState("1");
  const [receiverId,setReceiverId]=useState("2");
  const [userData,setUserData]=useState({});
  const [expertData,setExpertData]=useState({});
  const [chatRoomId,setChatRoomId]=useState("")
  const scrollToBottom = () => {
    const objDiv = document.getElementById('scrollbarbc');
        objDiv.scrollTop = objDiv.scrollHeight;
    
  }

  const getRealtimeUsers =async () => { 

    console.log("wdcdcdc")
    const messageRef = collection(db, "room", "12new", "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
        //   console.log("Id: ", doc.id, "Data: ", doc.data());
          if(1){
                        users.push(doc.data());
                    }
        });
        
        setlistmessages(users)
        scrollToBottom()
      });

    return unsubscribe;

}
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
      console.log(res.data);
    }
  })
    getRealtimeUsers();
}, []);



  const updateMessage = async () => {
      console.log("lmkmlnk")
    
      let text=urlify(input);
      console.log(text);
      let msgObj={
        sendId:"2",
        message:text,
        type:0,
        receiverid:"1",
        imageUrl:"",  
      }
      console.log("ecknjcdkjndc");
    const messageRef = collection(db, "room", "12new", "messages");
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

    // await setDoc(doc(citiesRef, "SF"));
    // let msgObj={
    //   sendId:"2",
    //   message:input,
    //   type:0,
    //   receiverid:"1",
    //   imageUrl:"",  
    // }
    // const db = firestore();
    //  db.collection('room')
    // .doc("12new")
    // .collection("messages").add({
    //     ...msgObj,
    //     isView: false,
    //     createdAt: new Date()
    
    // })
    // .then((data) => {
    //     console.log(data)
    // })
    // .catch(error => {
    //     console.log(error)
    // });


}
const formHandler = (e) => {
  console.log(e);
  console.log(e.target)
  const file = e.target.files[0];
  console.log( e.target.files, e.target.files[0])
  uploadFiles(file);
};

const uploadFiles = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `files/${file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);
 
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
                        sendId:"2",
                        message:"",
                        type:1,
                        receiverid:"1",
                        imageUrl:downloadURL, 
                        fileName:file.name 
                      }
          const messageRef = collection(db, "room", "12new", "messages");
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
                          sendId:"2",
                          message:"",
                          type:2,
                          receiverid:"1",
                          imageUrl:downloadURL, 
                          fileName:file.name 
                        }
            const messageRef = collection(db, "room", "12new", "messages");
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
  
  };
 
    return (
    <>
  <div class="app">
 <div class="header">
  <div class="logo">
  <img class="user-profile account-profile" src={expertData.profilePic} alt=""/>
  </div>
  <div class="search-bar">
   <h1>{expertData.firstName?expertData.firstName:""+" "+expertData.lastName?expertData.lastName:""} (Expert)</h1>
  </div>
  {/* <div class="user-settings">
   <div class="dark-light">
    <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
   </div>
   <div class="settings">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
     <circle cx="12" cy="12" r="3" />
     <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
   </div>
   <img class="user-profile account-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"   alt="" />
  </div> */}
 </div>
 <div class="wrapper">
 <div class="chat-area" id='scrollbarbc'>
    <div class="chat-area-header">
    <div class="chat-area-title">expert chat</div>
   </div>
   <div class="chat-area-main">
   {
      listmessages.length>0?
       listmessages.map(e=>{
        let sentby="";
        let userprofile=expertData.profilePic;
        console.log(e.type,'dwccd')
        if(e.sendId=="2"){
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
    </>
    );
  
}


export default App;


