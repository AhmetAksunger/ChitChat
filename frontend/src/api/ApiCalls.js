import axios from "axios"

export const login = (creds) => {
    return axios.post("http://localhost:8080/api/v1/auth",creds)
}

export const getUsers = (page = 0, size = 5) => {
    return axios.get(`http://localhost:8080/api/v1/users?page=${page}&size=${size}`);
}

export const getPublicConversations = () => {
    return axios.get("http://localhost:8080/api/v1/conversations/public");
}

export const getConversationMessages = (conversationId) => {
    return axios.get(`http://localhost:8080/api/v1/conversations/${conversationId}/messages`);
}