import axios from "axios"

export const login = (creds) => {
    return axios.post("http://localhost:8080/api/v1/auth",creds)
}