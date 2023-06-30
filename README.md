<h1 align="center" id="title">ChitChat</h1>

<p id="description">ChitChat is a fun and friendly chatting application that lets you connect with people all around the world. ChitChat lets you talk to many people or just one person easily and comfortably. ChitChat has a simple and elegant design that makes it easy to use and enjoy!</p>

<p align="center"><img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&amp;logo=openjdk&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&amp;logo=spring&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&amp;logo=javascript&amp;logoColor=%23F7DF1E" alt="shields"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&amp;logo=react&amp;logoColor=%2361DAFB" alt="shields"><img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&amp;logo=html5&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&amp;logo=css3&amp;logoColor=white" alt="shields"></p>

<h2>🚀 Demo</h2>
<p>Note: Since I'm using the free package of railway, the app is unfortunately slow.</p>
https://chitchat-production.up.railway.app/#/
<h2>▶️ Project Video</h2>

[![ChitChat](https://i.imgur.com/VoythA9.png)](https://youtu.be/StTqXEQ2l-Y?t=35s](https://www.youtube.com/watch?v=_5YxjKiDNJ4) "ChitChat")

<h2>Project Screenshots:</h2>
<h3>Public Chat</h4>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/116587797/249452462-c3398c5a-2353-467a-9d44-77053aa58ec3.png" />
<h3>Private Chat</h4>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/116587797/249452798-a6788eb1-ef29-4fa2-9cf2-972500f5721d.png" />
<h3>Start a New Conversation (Private Message)</h3>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/116587797/249453362-ee165708-0f53-4657-b62b-aaabeafebc41.png" />
<h3>Profile Page</h3>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/116587797/249453604-4ebfca53-7c53-4614-ae5a-b56020913cbe.png" />

<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Public Chats
*   Private Messagging
*   Profile Customization
*   Account Management
*   Simple Design

<h2>Database Diagram</h2>
<img src="https://github.com/AhmetAksunger/ChitChat/assets/116587797/449227bc-e71e-4b90-afb3-951caeb0438c.png" />

## API Endpoints
### Authentication API Endpoints
|HTTP Method|URL Path|Status Code|Description|
|:-----:|:-----:|:-----:|:-----:|
| POST | /api/v1/auth | 200 (OK) | Login |
| POST | /api/v1/logout | 200 (OK) | Logout |
### Chat API Endpoints
| HTTP Method | URL Path                 | Status Code | Description                    |
| :---------: | :----------------------: | :---------: | :----------------------------: |
|   WebSocket       | /ws/app/message             | N/A         | Receive public chat messages   |
|   WebSocket       | /ws/private-message         | N/A         | Receive private chat messages  |
|   DELETE    | /api/v1/messages/{messageId} | 200 (OK)      | Delete a chat message          |
### Conversation API Endpoints
| HTTP Method | URL Path                                   | Status Code | Description                               |
| :---------: | :----------------------------------------: | :---------: | :---------------------------------------: |
|   POST      | /api/v1/conversations                      | 201 (Created)         | Create a conversation                     |
|   GET       | /api/v1/conversations/public               | 200 (OK)         | Get public conversations                  |
|   GET       | /api/v1/conversations/{conversationId}/messages | 200( OK)      | Get messages of a specific conversation   |
|   GET       | /api/v1/conversations/participants/{username}/messages | 200 (OK) | Get conversation messages by participants         |
|   GET       | /api/v1/conversations/messaged-participants | 200 (OK)         | Get users with whom the current user has messaged |
### User API Endpoints
| HTTP Method | URL Path             | Status Code | Description               |
| :---------: | :------------------: | :---------: | :-----------------------: |
|    GET      | /api/v1/users        | 200 (OK)         | Get all users             |
|    POST     | /api/v1/users        | 201 (Created)         | Create a new user         |
|    PUT      | /api/v1/users/{id}   | 200 (OK)         | Update user information   |
|  DELETE     | /api/v1/users/{id}   | 200 (OK)         | Delete a user             |
|    GET      | /api/v1/users/{id}   | 200 (OK)         | Get a specific user by ID |

### Image API Endpoints
| HTTP Method | URL Path            | Status Code | Description             |
| :---------: | :-----------------: | :---------: | :---------------------: |
|   POST      | /api/v1/images      | 201 (Created)         | Set profile image       |

### Admin API Endpoğints
| HTTP Method | URL Path                     | Status Code | Description               |
| :---------: | :-------------------------- | :---------: | :-----------------------: |
|  DELETE     | /api/v1/messages/delete-public | 200 (OK)        | Delete public messages    |

<h2>Built With</h2>
Used technologies are:

* **Java Spring Boot**
  * Spring Boot Starter Data JPA
  * Spring Boot Starter Security
  * Spring Boot Starter Web
  * Spring WebSocket
  * Spring Messagging
  * ModelMapper
  * H2 Database
  * Spring Boot Starter Validation
  * Spring Boot DevTools
  * Lombok

* **React**
  * Axios
  * React
  * react-dom
  * react-router-dom
  * react-scripts
  * redux
  * sockjs-client
  * stompjs
  * timeago.js
  * web-vitals
