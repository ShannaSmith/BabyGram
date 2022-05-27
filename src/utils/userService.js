import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

// NOTE THIS IS configured to send off a multi/part form request
// aka photo
function signup(user) {
  return (
    fetch(BASE_URL + "signup", {
      method: "POST",
      body: user, //<- no need to stringify the user data because we're not sending over json we are sending over from/data
    })
      .then((res) => {
        if (res.ok) return res.json();
        // Probably a duplicate email
        throw new Error("Email already taken!");
      })
      // Parameter destructuring!
      .then(({ token }) => tokenService.setToken(token))
  );
  // Setting our token in localStorage in our browser
  // then we'll be able to use with every request!
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

function getProfile(username) {
  return fetch(BASE_URL + username, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL!");
  });
}

function getAllUsers() {
  return fetch(BASE_URL, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL!");
  });
}

function getGrantedUsers() {
  return fetch(BASE_URL + 'granted', {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL!");
  });
}

function grantAccess(recipientId) {
  return fetch(BASE_URL + `grant/${recipientId}`, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL!");
  });
}

function revokeAccess(recipientId) {
  return fetch(BASE_URL + `revoke/${recipientId}`, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL!");
  });
}

function getLoggedInUser() {
  return fetch(BASE_URL + 'me', {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL!");
  });
}

const userService = {
  signup,
  logout,
  login,
  getAllUsers,
  getProfile,
  getUser,
  grantAccess,
  revokeAccess,
  getGrantedUsers,
  getLoggedInUser
};

export default userService;
