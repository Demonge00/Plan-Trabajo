import axios from "axios";
const login = axios.create({
  baseURL: "http://localhost:8000/",
});
export const registerUser = (data) => {
  return login.post("/workplans/register/", data);
};
export const secretVerify = (urls) => {
  return login.get("workplans/verify/" + urls);
};
export const loginFunc = (data) => {
  return login.post("workplans/token/", data);
};
export const updateProf = (data) => {
  return login.put("workplans/profile/update/", data, {
    headers: { Authorization: "Bearer " + data.accesToken },
  });
};
export const recoverPassword = (data) => {
  return login.post("/workplans/password/", data);
};
export const updatePassword = (data) => {
  return login.post("/workplans/password/" + data.urls, data);
};
export const createWorkplan = (data) => {
  //console.log(data.get("name"))
  return login.post("/workplans/create/", data, {
    headers: {
      Authorization: "Bearer " + data.get("token"),
      "Content-Type": "multipart/form-data",
    },
  });
};
export const obtainWorkplans = (header, onFetch) => {
  login
    .get("workplans/list/", { headers: { Authorization: "Bearer " + header } })
    .then((request) => {
      onFetch(request.data.list);
      return;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};
export const selectPlan = (data, onFetch) => {
  login
    .post("/workplans/select/", data.date, {
      headers: { Authorization: "Bearer " + data.accesToken },
    })
    .then((response) => {
      onFetch(response.data);
      console.log(response.data);
      return;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};
