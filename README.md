# CodeHub - Online Code Editor Platform

A comprehensive web-based code editor platform that allows users to write, execute, and test code in multiple programming languages with additional utility features like voice-to-text and image-to-text conversion.

## 🚀 Features

### Core Features
- **Multi-Language Code Editor**: Support for JavaScript, Python, and HTML/CSS
- **Real-time Code Execution**: Execute code directly in the browser
- **Syntax Highlighting**: CodeMirror integration for better code readability
- **Error Handling**: Proper error display and debugging information
- **Code Download**: Ability to download code files
- **Copy to Clipboard**: Easy code sharing functionality

### Authentication System
- **User Registration**: Signup with username, email, and password
- **Secure Login/Logout**: JWT-based authentication
- **Password Security**: Bcrypt hashing for password protection
- **Session Management**: Persistent login sessions

### Advanced Features
- **Voice-to-Text Converter**: Real-time voice input with symbol mapping
- **Image-to-Text (OCR)**: Extract text from images using Tesseract.js
- **Real-time HTML Editor**: Live preview with split-view editing
- **Modern UI/UX**: Responsive design with dark theme

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CodeMirror 6** - Advanced code editor
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Formik + Yup** - Form handling and validation
- **Tesseract.js** - OCR functionality

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Python (for Python code execution)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codohub
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   
   Create `backend/config.env`:
   ```env
   PORT=5000
   MONGODB_URI=/........................................................................./
   SECRET_KEY=your_jwt_secret_key
   NODE_ENV=development
   ```

5. **Start the development servers**

   Backend (from `backend` directory):
   ```bash
   npm run dev
   ```

   Frontend (from `frontend` directory):
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🏗️ Project Structure

```
codohub/
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Editor/
│   │   │   │   ├── Python.jsx
│   │   │   │   ├── Javascript.jsx
│   │   │   │   ├── Html.jsx
│   │   │   │   ├── Voice2Text.jsx
│   │   │   │   ├── Image2Text.jsx
│   │   │   │   └── LangList.jsx
│   │   │   ├── Screens/
│   │   │   │   ├── Homepage.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── Errorpage.jsx
│   │   │   │   └── Logout.jsx
│   │   │   ├── HomepageScreen/
│   │   │   │   ├── LandingPage.jsx
│   │   │   │   └── CodingPage.jsx
│   │   │   ├── Header.jsx
│   │   │   └── App.jsx
│   │   ├── assets/
│   │   └── index.js
│   └── public/
├── backend/
│   ├── router/
│   │   ├── auth.js
│   │   └── executepy.js
│   ├── model/
│   │   └── userSchema.js
│   ├── db/
│   │   └── conn.js
│   ├── python_runner/
│   ├── dart_runner/
│   ├── app.js
│   └── config.env
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Code Execution
- `POST /api/execute/python/execute` - Execute Python code

## 🎯 Usage

### Code Editor
1. Register or login to access the code editor
2. Select your preferred programming language
3. Write your code in the editor
4. Click "Run" to execute the code
5. View output in the results panel
6. Use "Copy" or "Download" to save your code

### Voice-to-Text
1. Select "Voice to Text" from the language menu
2. Click "Start" to begin voice recognition
3. Speak your code with proper symbol names
4. Click "Convert" to apply symbol mapping
5. Copy the converted text to clipboard

### Image-to-Text (OCR)
1. Select "Image to Text" from the language menu
2. Upload an image or drag and drop
3. Click "Extract Text" to perform OCR
4. View the extracted text and confidence score
5. Edit the text if needed and copy to clipboard

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Proper cross-origin settings
- **Input Validation**: Sanitized user inputs
- **Code Execution Sandboxing**: Isolated execution environment

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue on GitHub or contact the development team.

## 🔮 Future Enhancements

- [ ] Real-time collaboration features
- [ ] Additional programming languages (C++, Java, Rust)
- [ ] Code formatting and linting
- [ ] Git integration
- [ ] User code snippets and templates
- [ ] Advanced debugging tools
- [ ] Performance profiling
- [ ] Mobile app version
