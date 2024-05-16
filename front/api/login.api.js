import axios from 'axios'
const login = axios.create({
    baseURL: 'http://localhost:8000/'
})
export const registerUser = (data) => {
    return login.post("/workplans/register/", data)
}
export const secretVerify = (urls) => {
    return login.get("workplans/verify/"+urls)
}
export const loginFunc = (data) => {
    return login.post("workplans/token/",data)
}
export const updateProf = (data) => {
    return login.put("workplans/profile/update/",data, {headers:{Authorization: "Bearer " + data.accesToken}})
}
export const recoverPassword = (data) => {
    return login.post("/workplans/password/", data)
}
export const updatePassword = (data) => {
    return login.post("/workplans/password/"+data.urls, data)
}