# Codohub Project Workflow & Architecture

## Project Overview
Codohub is a full-stack web application that provides an interactive coding environment with support for multiple programming languages, voice-to-text conversion, and image-to-text capabilities. It's designed as a learning and development platform for programmers.

## Technology Stack

### Backend Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool
- **JWT (JSON Web Tokens)** - Authentication and authorization
- **bcryptjs** - Password hashing
- **child_process** - Python code execution
- **uuid** - Unique identifier generation
- **cors** - Cross-origin resource sharing
- **cookie-parser** - Cookie parsing middleware
- **dotenv** - Environment variable management

### Frontend Technologies
- **React 19** - JavaScript library for building user interfaces
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **CodeMirror** - Code editor component
- **Axios** - HTTP client for API requests
- **Formik** - Form handling library
- **Yup** - Schema validation
- **React Hot Toast** - Toast notifications
- **GSAP** - Animation library
- **Tesseract.js** - OCR (Optical Character Recognition)
- **React Speech Recognition** - Voice recognition

## Project Architecture

```
codohub/
├── backend/                 # Node.js/Express server
│   ├── server.js           # Main server file
│   ├── app.js              # Express app configuration
│   ├── db/                 # Database connection
│   ├── model/              # MongoDB schemas
│   └── router/             # API route handlers
├── frontend/               # React application
│   ├── src/
│   │   ├── Components/     # React components
│   │   │   ├── Editor/     # Code editors
│   │   │   ├── Header/     # Navigation header
│   │   │   └── Screens/    # Page components
│   │   └── index.jsx       # App entry point
│   └── vite.config.js      # Vite configuration
└── package.json            # Root package configuration
```

## Step-by-Step Workflow

### 1. Project Initialization & Setup

#### Backend Setup
1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   - Create `.env` file with:
     - `MONGODB_URI` - MongoDB connection string
     - `SECRET_KEY` - JWT secret key
     - `PORT` - Server port (default: 5000)
     - `NODE_ENV` - Environment (development/production)

3. **Database Connection**
   - MongoDB connection established in `db/conn.js`
   - Mongoose connects to MongoDB instance
   - User schema defined with password hashing

#### Frontend Setup
1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Development Server**
   ```bash
   npm run dev
   ```
   - Vite dev server starts on port 3000
   - Proxy configured to backend API on port 5000

### 2. User Authentication Flow

#### Registration Process
1. **User Input**
   - Username, email, password, confirm password
   - Form validation using Yup schema

2. **Backend Processing**
   - Password validation (minimum 6 characters)
   - Email uniqueness check
   - Password hashing using bcryptjs
   - User document creation in MongoDB

3. **Response**
   - JWT token generation
   - HTTP-only cookie set
   - Success response with user data

#### Login Process
1. **User Input**
   - Email and password
   - Form validation

2. **Backend Processing**
   - Email lookup in database
   - Password comparison using bcryptjs
   - JWT token generation

3. **Response**
   - JWT token in HTTP-only cookie
   - User profile data returned

#### Authentication Middleware
- JWT token verification on protected routes
- Token stored in HTTP-only cookies for security
- Automatic token refresh on successful requests

### 3. Code Execution Workflow

#### Python Code Execution
1. **Code Submission**
   - User writes Python code in CodeMirror editor
   - Code sent to `/api/execute/python/execute` endpoint

2. **Backend Processing**
   - Code validation and sanitization
   - Temporary file creation with UUID
   - Python process spawning using child_process

3. **Execution & Safety**
   - 10-second timeout for execution
   - 1MB output buffer limit
   - Temporary file cleanup after execution

4. **Response**
   - STDOUT and STDERR captured
   - Success/error status returned
   - Output displayed in frontend

#### Multi-Language Support
- **Python**: Full execution with CodeMirror syntax highlighting
- **JavaScript**: Browser-based execution (planned)
- **HTML**: Live preview rendering (planned)

### 4. Advanced Features

#### Voice-to-Text Conversion
1. **Voice Input**
   - React Speech Recognition integration
   - Real-time speech-to-text conversion
   - Language selection support

2. **Text Processing**
   - Converted text inserted into code editor
   - Support for multiple programming languages

#### Image-to-Text (OCR)
1. **Image Upload**
   - File input for image selection
   - Tesseract.js integration for OCR

2. **Text Extraction**
   - OCR processing of uploaded images
   - Extracted text displayed in editor
   - Support for various image formats

### 5. Frontend Component Architecture

#### Core Components
1. **App.jsx**
   - Main application component
   - React Router setup
   - Toast notification system

2. **Header.jsx**
   - Navigation component
   - User authentication status
   - Responsive design

3. **Editor Components**
   - Language-specific editors (Python, JavaScript, HTML)
   - CodeMirror integration
   - Run, clear, copy, download functionality

4. **Screen Components**
   - Landing page with user introduction
   - Login/Register forms
   - Coding workspace

### 6. API Endpoints

#### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /logout` - User logout
- `GET /profile` - User profile retrieval

#### Code Execution Routes (`/api/execute/python`)
- `POST /execute` - Python code execution

#### Health Check
- `GET /api/health` - Server status

### 7. Security Features

#### Authentication Security
- JWT tokens with expiration
- HTTP-only cookies
- Password hashing with bcryptjs
- Input validation and sanitization

#### Code Execution Security
- Temporary file isolation
- Process timeout limits
- Output buffer restrictions
- Automatic cleanup of temporary files

### 8. Development Workflow

#### Backend Development
1. **Start Development Server**
   ```bash
   cd backend
   npm run dev  # Uses nodemon for auto-restart
   ```

2. **API Testing**
   - Test endpoints using Postman or similar tools
   - Monitor MongoDB connections
   - Check JWT token generation

#### Frontend Development
1. **Start Development Server**
   ```bash
   cd frontend
   npm run dev  # Vite dev server with hot reload
   ```

2. **Component Development**
   - Edit React components with live reload
   - Test API integration
   - Responsive design testing

### 9. Production Deployment

#### Backend Deployment
1. **Environment Setup**
   - Production MongoDB instance
   - Environment variables configuration
   - CORS settings for production domain

2. **Server Deployment**
   ```bash
   npm start  # Production server start
   ```

#### Frontend Deployment
1. **Build Process**
   ```bash
   npm run build  # Production build
   ```

2. **Deployment**
   - Static files served from web server
   - API proxy configuration
   - HTTPS enforcement

### 10. Monitoring & Maintenance

#### Performance Monitoring
- API response times
- Database query performance
- Memory usage tracking
- Error logging and monitoring

#### Security Updates
- Regular dependency updates
- Security vulnerability scanning
- JWT token rotation
- Input validation improvements

## Key Features Summary

1. **Multi-Language Code Editor** - Support for Python, JavaScript, and HTML
2. **Real-time Code Execution** - Python code execution with output display
3. **Voice-to-Text Integration** - Speech recognition for code input
4. **Image-to-Text Conversion** - OCR capabilities for code extraction
5. **User Authentication** - Secure JWT-based authentication system
6. **Responsive Design** - Mobile-friendly user interface
7. **Code Management** - Copy, download, and clear functionality
8. **Modern UI/UX** - GSAP animations and toast notifications

## Future Enhancements

1. **Additional Languages** - Support for more programming languages
2. **Collaborative Coding** - Real-time collaborative editing
3. **Code Sharing** - Public/private code snippet sharing
4. **Learning Paths** - Structured programming tutorials
5. **Code Analysis** - Static code analysis and suggestions
6. **Git Integration** - Version control integration
7. **Cloud Deployment** - Direct deployment to cloud platforms
8. **Mobile App** - React Native mobile application

This workflow provides a comprehensive understanding of how Codohub works, from initial setup to production deployment, covering all the technologies, components, and processes involved in the application.
