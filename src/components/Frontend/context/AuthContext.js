import React,{createContext,useState} from 'react';

export const AuthContext =createContext();


const AuthContextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [loggedInBorhanUserInfo,setLoggedInBorhanUserInfo]=useState([]);
  return (
      <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,loggedInBorhanUserInfo,setLoggedInBorhanUserInfo}}>
        {props.children}
      </AuthContext.Provider>
  )
}

export default AuthContextProvider