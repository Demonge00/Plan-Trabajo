import axios from 'axios'
const login = axios.create({
    baseURL: 'http://localhost:8000/'
})
export const registerUser = (data) => {
    return login.post("/workplans/register/", data)
}