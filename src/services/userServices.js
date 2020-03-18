import http from "./httpService"

export function getUsers() {
  return http.get("/users");
}

export function getUserById(id) {
  return http.get("/users/" + id)
}

export function deleteUser(id) {
  return http.delete("/users/" + id);
}

// for creating new user(Sign up) or editing user info
export function saveUser(user) {
  // if _id is present then its a PUT request, otherwise its a POST
  if (user._id) {
    return http.put("/users/" + user._id, {
      username: user.username,
      email: user.email,
      password: user.password
    });
  } else {
    return http.post("/users/", user);
  }
}
