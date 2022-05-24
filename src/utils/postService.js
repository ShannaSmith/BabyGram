import tokenService from "./tokenService";

const BASE_URL = "/api/posts/";

function addLike(postid) {
  return fetch(BASE_URL + `${postid}/likes`, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL!");
  });
}

function removeLike(postid) {
  return fetch(BASE_URL + `${postid}/likes`, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL!");
  });
}

function getAll() {
  return fetch(BASE_URL, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL!");
  });
}

function create(data) {
  return fetch(BASE_URL, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
    method: 'POST',
    body: data
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL!");
  });
}

const postService = {
  addLike,
  removeLike,
  getAll,
  create
};

export default postService;
