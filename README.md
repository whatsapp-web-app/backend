# Real-Time Chat Application

This is a real-time chat application built using the **MERN Stack** for full-stack development with a **NestJS** backend, **React** as the frontend, and **Socket.IO** for handling real-time communication. The app provides an interactive chat experience that includes authentication, private messaging, group messaging, and the ability to add friends.

## Features

- **User Authentication**: Sign up and login functionality with JWT-based authentication.
- **Private Messaging**: Users can engage in 1-on-1 chats with other users.
- **Group Messaging**: Users can create groups and send messages to multiple participants.
- **Add Friend**: Users can send friend requests and add friends for easier communication.
- **Real-Time Communication**: Messages are sent and received in real time using Socket.IO.
- **Online Status**: See which friends are online or offline.
- **Responsive UI**: The app is mobile-friendly and adapts to various screen sizes.

## Tech Stack

### Backend

- **NestJS**: A progressive Node.js framework for building efficient, scalable server-side applications.
- **MongoDB**: A NoSQL database for storing user data, messages, and chat groups.
- **Express**: Lightweight, fast web framework used in NestJS under the hood.
- **Socket.IO**: Handles real-time messaging between users.
- **JWT (JSON Web Token)**: Secure authentication mechanism for user sessions.

### Frontend

- **React**: A popular library for building dynamic user interfaces.
- **Redux**: State management for managing authentication and chat data.
- **Socket.IO Client**: Used for real-time communication with the backend.
- **TailwindCSS**: Utility-first CSS framework for designing responsive UIs.

## Installation

### Prerequisites

- **Node.js** (v14+)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **NPM** or **Yarn**

### Clone the repository

```bash
git clone https://github.com/yourusername/realtime-chat-app.git
cd realtime-chat-app
```

### Backend Setup (NestJS)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `backend` directory with the following environment variables:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/chat-app
   JWT_SECRET=your_jwt_secret
   SOCKET_PORT=5000
   ```

4. Run the NestJS server:

   ```bash
   npm run start:dev
   ```

   The backend should now be running on `http://localhost:5000`.

### Frontend Setup (React)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `frontend` directory:

   ```bash
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the React development server:

   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3000`.

### Socket.IO Setup

Socket.IO is integrated with both the backend and frontend. When the backend starts, Socket.IO is initialized on `http://localhost:5000`, and the React frontend connects via the client-side Socket.IO library.

## Usage

- **Sign Up**: Create a new account to get started.
- **Login**: Authenticate with your credentials.
- **Private Messaging**: Select a friend from the list to start a private chat.
- **Group Messaging**: Create a new group, invite participants, and start a group chat.
- **Add Friends**: Use the "Add Friend" feature to connect with other users.

Messages will be delivered instantly using Socket.IO for real-time communication. The app also displays the online status of your friends.

## Folder Structure

```bash
.
├── backend
│   ├── src
│   │   ├── auth         # Authentication logic
│   │   ├── chat         # Chat message handling (Socket.IO)
│   │   ├── users        # User management (adding friends)
│   │   ├── groups       # Group chat management
│   │   ├── app.module.ts
│   │   └── main.ts
├── frontend
│   ├── src
│   │   ├── components   # React components (Chat UI, Friend List, etc.)
│   │   ├── pages        # Pages (Login, Sign Up, Chat Rooms)
│   │   ├── redux        # Redux state management (actions, reducers)
│   │   ├── services     # API calls to the backend
│   │   ├── App.js       # Main React app file
│   │   └── index.js     # Entry point
└── README.md            # This file
```

## Future Improvements

- **File Sharing**: Allow users to share images, videos, and other files within chats.
- **Video/Voice Calls**: Integrate WebRTC to enable voice and video calling.
- **Notifications**: Add push notifications for new messages and friend requests.

## Contributing

Contributions are welcome! Please fork this repository, create a feature branch, and submit a pull request.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

## License

This project is licensed under the MIT License.

---

Feel free to modify any sections or add more details specific to your project!
