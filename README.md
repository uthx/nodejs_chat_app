# nodejs_chat_app.
Node JS chat application
**Real-Time Chat Application**

This repository contains the source code for a real-time chat application built using Socket.IO, Express, and SQLite. The application enables users to exchange text messages and share images in real-time.

### Features:

1. **Real-Time Communication**: Utilizes Socket.IO for enabling real-time bidirectional communication between the server and clients, allowing instant message delivery.

2. **Message Storage**: Implements SQLite database to persistently store messages, ensuring that users can retrieve missed messages upon reconnecting to the chat.

3. **Image Sharing**: Allows users to share images within the chat by converting images to base64 format and storing them in the database along with text messages.

4. **Cross-Platform Compatibility**: The application is designed to work seamlessly across various platforms and devices, facilitating communication between users regardless of their preferred device or operating system.

### Technologies Used:

- **Socket.IO**: A JavaScript library for real-time web applications, facilitating real-time bidirectional event-based communication.
- **Express**: A minimal and flexible Node.js web application framework used for building web applications and APIs.
- **SQLite**: A lightweight, serverless, and self-contained SQL database engine used for storing chat messages persistently.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, enabling server-side execution of JavaScript code.
- **HTML/CSS**: Used for creating the user interface and styling the chat application.
- **JavaScript (ES6+)**: The primary programming language used for both client-side and server-side development.

### Usage:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Run the application using `npm start`.
5. Access the application via a web browser at `http://localhost:3000`.

### Future Enhancements:

- **Message Encryption**: Consider implementing message encryption using RSA or other encryption algorithms to ensure secure communication between clients and the server.
- **User Authentication**: Introduce user authentication mechanisms to secure access to the chat application and personalize user experiences.
- **Improved UI/UX**: Enhance the user interface and experience with features such as message threading, emoji support, and customizable chat themes.
- **Scalability**: Explore options for scaling the application to handle a larger number of concurrent users efficiently.

### Contributors:

- Rahul Dhiman
