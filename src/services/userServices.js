import Axios from "axios";

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function getUsers() {
  return Axios.get("/users");
}

export function getUserById(id) {
  return Axios.get("/users/" + id);
}

export function deleteUser(id) {
  return Axios.delete("/users/" + id);
}

export function saveUser(user) {
  // if _id is present then its a PUT request, otherwise its a POST
  if (user._id) {
    return Axios.put("/users/" + user._id, {
      username: user.username,
      email: user.email,
      password: user.password
    });
  } else {
    return Axios.post("/users/", user);
  }
}
