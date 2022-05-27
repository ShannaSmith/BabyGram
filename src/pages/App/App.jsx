import React, { useState, useEffect } from "react";
import { Navigate,  useNavigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import FeedPage from "../FeedPage/FeedPage";
import userService from "../../utils/userService";
import Accounts from "../Accounts/Accounts";
import PageHeader from "../../components/Header/Header";
import UserPostGallery from "../PostGallery/PostGallery";

function App() {
  const navigate = useNavigate();
  const location = useLocation()
  const [user, setUser] = useState(userService.getUser())

  function handleSignUpOrLogin(){
    setUser(userService.getUser())
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  useEffect(()=>{
     if(!user && location.pathname == '/'){
       navigate('/login')
     }
  }, [user])

  if(!user) { // are we logged in?
    return (
    <Routes>
       
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
    </Routes>
    )
  }
  else{
  return (
    <>
    
<PageHeader handleLogout={handleLogout} user={user} />
    <Routes>

      <Route
        path="/"
        element={<FeedPage user={user} handleLogout={handleLogout} />}
      />

      <Route path="/:username" element={<ProfilePage user={user} handleLogout={handleLogout}  />} />
 <Route
        path="/profile/:username"
        element={
     
            <ProfilePage user={user} />
      
        }
        />
        <Route
        path="/feeds"
        element={
       
            <FeedPage user={user} />
       
        }
      />
      <Route
        path="/account/:username"
        element={
        
            <Accounts user={user} />
        
        }
      />
      <Route
        path="/gallery/:userId"
        element={
         
            <UserPostGallery user={user} />
     
        }
      />     
       <Route path="/*" element={<Navigate to="/login" />} /> 
    </Routes>
    </>
  );
}
}


export default App;
