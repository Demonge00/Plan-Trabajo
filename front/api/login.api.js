import axios from 'axios'
const login = axios.create({
    baseURL: 'http://localhost:8000/workplans/register/'
})
export const registerUser = (data) => {
    return login.post("/", data)
}