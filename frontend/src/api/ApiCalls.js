import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";

export const login = (creds) => {
  return axios.post(`${baseURL}/auth`, creds);
};

export const getUsers = (
  pageable = true,
  token,
  page = 0,
  size = 5
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(
    `${baseURL}/users?pageable=${pageable}&page=${page}&size=${size}`,
    config
  );
};

export const getPublicConversations = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${baseURL}/conversations/public`, config);
};

export const getConversationMessages = (conversationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(
    `${baseURL}/conversations/${conversationId}/messages`,
    config
  );
};

export const getPrivateConversationMessages = (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(
    `${baseURL}/conversations/participants/${username}/messages`,
    config
  );
};

export const startConversationWithUser = (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`${baseURL}/conversations`, data, config);
};

export const getMessagedUsers = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${baseURL}/conversations/messaged-participants`, config);
};

export const deleteMessage = (token, messageId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.delete(`${baseURL}/messages/${messageId}`, config);
};

export const register = (creds) => {
  const config = {
    headers: {
      "Accept-Language": "en-US",
    },
  };
  return axios.post(`${baseURL}/users`, creds, config);
};

export const updateUser = (userId, body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`${baseURL}/users/${userId}`, body, config);
};

export const deleteUser = (userId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${baseURL}/users/${userId}`,config);
}

export const saveProfileImage = (file, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(`${baseURL}/images`, file, config);
};

export const getUser = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${baseURL}/users/${userId}`, config);
};

export const searchUsersLike = (input, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${baseURL}/users?pageable=false&like=${input}`, config);
};

export const logout = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`${baseURL}/logout`, {}, config);
};
