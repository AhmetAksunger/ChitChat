import axios from "axios"

export const login = (creds) => {
    return axios.post("http://localhost:8080/api/v1/auth",creds)
}

export const getUsers = (pageable = true,token,page = 0, size = 5) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get(`http://localhost:8080/api/v1/users?pageable=${pageable}&page=${page}&size=${size}`,config);
}

export const getPublicConversations = (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get("http://localhost:8080/api/v1/conversations/public",config);
}

export const getConversationMessages = (conversationId,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get(`http://localhost:8080/api/v1/conversations/${conversationId}/messages`,config);
}

export const getPrivateConversationMessages = (username,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return axios.get(`http://localhost:8080/api/v1/conversations/participants/${username}/messages`,config)
}

export const startConversationWithUser = (data,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return axios.post("http://localhost:8080/api/v1/conversations",data,config)
}

export const getMessagedUsers = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get("http://localhost:8080/api/v1/conversations/messaged-participants",config)
};

export const deleteMessage = (token, messageId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios.delete(`http://localhost:8080/api/v1/messages/${messageId}`,config);
}

export const register = (creds) => {
  const config = {
    headers: {
      'Accept-Language': 'en-US'
    }
  };
  return axios.post("http://localhost:8080/api/v1/users",creds,config);
}

export const updateUser = (userId, body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios.put(`http://localhost:8080/api/v1/users/${userId}`,body,config);
}

export const saveProfileImage = (file, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios.post("http://localhost:8080/api/v1/images", file, config);
}

export const getUser = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios.get(`http://localhost:8080/api/v1/users/${userId}`,config);
}

export const searchUsersLike = (input,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios.get(`http://localhost:8080/api/v1/users?pageable=false&like=${input}`,config);
}