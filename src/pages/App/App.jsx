import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  const PrivateRoute = ({ children }) => {
    return user ? (
      <>
        <PageHeader handleLogout={handleLogout} user={user} />
        {children}
      </>
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <h1>This is Home Page!</h1>
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/profile/:username"
        element={
          <PrivateRoute>
            <ProfilePage user={user} />
          </PrivateRoute>
        }
      />
      <Route
        path="/feeds"
        element={
          <PrivateRoute>
            <FeedPage user={user} />
          </PrivateRoute>
        }
      />
      <Route
        path="/account"
        element={
          <PrivateRoute>
            <Accounts user={user} />
          </PrivateRoute>
        }
      />
      <Route
        path="/gallery/:userId"
        element={
          <PrivateRoute>
            <UserPostGallery user={user} />
          </PrivateRoute>
        }
      />      
    </Routes>
  );
}

export default App;
