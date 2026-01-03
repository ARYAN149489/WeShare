# 6. TOOLS USED

## 6.1 Development Environment

### 6.1.1 Operating Systems
- **Windows 10/11**
  - Primary development platform
  - PowerShell for command-line operations
  - Compatible with all project dependencies

- **macOS**
  - Secondary development platform
  - Terminal for command-line operations
  - Full cross-platform compatibility

### 6.1.2 Code Editors and IDEs

#### Visual Studio Code (Primary)
- **Version**: Latest stable
- **Purpose**: Primary code editor for frontend and backend development
- **Key Extensions Used**:
  - ESLint - JavaScript linting
  - Prettier - Code formatting
  - ES7+ React/Redux/React-Native snippets
  - MongoDB for VS Code
  - GitLens - Git integration
  - Thunder Client - API testing
  - Auto Rename Tag
  - Bracket Pair Colorizer

**Why VS Code?**
- Lightweight and fast
- Excellent React and Node.js support
- Integrated terminal
- Rich extension ecosystem
- Free and open-source

## 6.2 Frontend Development Tools

### 6.2.1 Core Technologies

#### React (v18.2.0)
- **Purpose**: Building interactive user interfaces
- **Installation**: `npm install react react-dom`
- **Features Used**:
  - Functional components
  - React Hooks (useState, useEffect, useContext, useNavigate)
  - Context API for state management
  - Component lifecycle management

#### React Router DOM (v6.20.1)
- **Purpose**: Client-side routing and navigation
- **Installation**: `npm install react-router-dom`
- **Features Used**:
  - BrowserRouter for routing
  - Route component for defining routes
  - Link and Navigate for navigation
  - Protected routes implementation
  - useParams, useNavigate, useLocation hooks

#### Axios (v1.6.2)
- **Purpose**: HTTP client for API requests
- **Installation**: `npm install axios`
- **Features Used**:
  - GET, POST, PUT, DELETE requests
  - Request/response interceptors
  - Authorization header configuration
  - Error handling

### 6.2.2 Build and Development Tools

#### Create React App (react-scripts v5.0.1)
- **Purpose**: React project scaffolding and build tooling
- **Installation**: Included in project setup
- **Features**:
  - Webpack bundling
  - Babel transpilation
  - Hot module replacement
  - Development server
  - Production build optimization

#### npm (Node Package Manager)
- **Purpose**: Package management and script execution
- **Version**: 6.0.0+
- **Key Commands**:
  - `npm install` - Install dependencies
  - `npm start` - Start development server
  - `npm run build` - Create production build
  - `npm test` - Run tests

## 6.3 Backend Development Tools

### 6.3.1 Runtime Environment

#### Node.js (v14+)
- **Purpose**: JavaScript runtime for server-side code
- **Download**: https://nodejs.org/
- **Features Used**:
  - Event-driven architecture
  - Non-blocking I/O
  - npm ecosystem
  - ES6+ module support

### 6.3.2 Framework and Libraries

#### Express.js (v4.18.2)
- **Purpose**: Web application framework
- **Installation**: `npm install express`
- **Features Used**:
  - RESTful API routing
  - Middleware pipeline
  - Request/response handling
  - Static file serving
  - Error handling

#### Mongoose (v8.0.3)
- **Purpose**: MongoDB object modeling
- **Installation**: `npm install mongoose`
- **Features Used**:
  - Schema definition
  - Data validation
  - Middleware (pre/post hooks)
  - Query building
  - Population (joins)
  - Indexing

### 6.3.3 Authentication and Security

#### JSON Web Token (jsonwebtoken v9.0.2)
- **Purpose**: Stateless authentication
- **Installation**: `npm install jsonwebtoken`
- **Usage**: Token generation and verification

#### bcryptjs (v2.4.3)
- **Purpose**: Password hashing
- **Installation**: `npm install bcryptjs`
- **Usage**: Hash passwords before storage, compare during login

#### CORS (v2.8.5)
- **Purpose**: Cross-Origin Resource Sharing
- **Installation**: `npm install cors`
- **Usage**: Allow frontend to communicate with backend

### 6.3.4 Utilities

#### dotenv (v16.3.1)
- **Purpose**: Environment variable management
- **Installation**: `npm install dotenv`
- **Usage**: Load configuration from .env file

#### express-validator (v7.0.1)
- **Purpose**: Request validation middleware
- **Installation**: `npm install express-validator`
- **Usage**: Validate and sanitize user input

#### Nodemailer (v7.0.10)
- **Purpose**: Email sending
- **Installation**: `npm install nodemailer`
- **Usage**: Send notification emails via Gmail SMTP

#### nodemon (v3.0.2) - Dev Dependency
- **Purpose**: Auto-restart server on file changes
- **Installation**: `npm install --save-dev nodemon`
- **Usage**: Development server with hot reload

## 6.4 Database Tools

### 6.4.1 MongoDB Atlas
- **Purpose**: Cloud-hosted MongoDB database
- **Website**: https://www.mongodb.com/cloud/atlas
- **Features**:
  - Free tier for development
  - Automatic backups
  - Scalability
  - Security features
  - Geographic distribution
  - Monitoring and alerting

**Setup Steps**:
1. Create account at MongoDB Atlas
2. Create new cluster
3. Configure network access (IP whitelist)
4. Create database user
5. Get connection string
6. Configure in .env file

### 6.4.2 MongoDB Compass
- **Purpose**: GUI for MongoDB database management
- **Download**: https://www.mongodb.com/products/compass
- **Features Used**:
  - Database browsing
  - Collection management
  - Query execution
  - Index management
  - Data import/export
  - Performance monitoring

## 6.5 API Development and Testing

### 6.5.1 Postman
- **Purpose**: API development and testing
- **Download**: https://www.postman.com/
- **Features Used**:
  - API request building
  - Collection organization
  - Environment variables
  - Response validation
  - Test automation
  - Documentation generation

**Collections Created**:
- Authentication APIs
- Donation APIs
- Request APIs
- Notification APIs
- User APIs

### 6.5.2 Thunder Client (VS Code Extension)
- **Purpose**: Lightweight API testing within VS Code
- **Installation**: VS Code Extensions Marketplace
- **Features**: Quick API testing without leaving editor

## 6.6 Version Control

### 6.6.1 Git
- **Purpose**: Source code version control
- **Download**: https://git-scm.com/
- **Commands Used**:
  - `git init` - Initialize repository
  - `git add` - Stage changes
  - `git commit` - Commit changes
  - `git push` - Push to remote
  - `git pull` - Pull from remote
  - `git branch` - Branch management
  - `git merge` - Merge branches

### 6.6.2 GitHub
- **Purpose**: Remote repository hosting
- **Website**: https://github.com/
- **Features Used**:
  - Code hosting
  - Collaboration
  - Issue tracking
  - README documentation

## 6.7 Documentation Tools

### 6.7.1 Draw.io (diagrams.net)
- **Purpose**: Creating system diagrams
- **Website**: https://app.diagrams.net/
- **Diagrams Created**:
  - System Architecture Diagram
  - ER Diagram
  - Use Case Diagram
  - Data Flow Diagrams (Level 0, 1, 2)
  - Sequence Diagrams
  - Class Diagram

### 6.7.2 Markdown
- **Purpose**: Documentation formatting
- **Editor**: VS Code with Markdown Preview
- **Files**:
  - README.md
  - SETUP_GUIDE.md
  - Documentation files

## 6.8 Communication and Email Services

### 6.8.1 Gmail SMTP
- **Purpose**: Sending email notifications
- **Configuration**:
  - Host: smtp.gmail.com
  - Port: 587
  - Security: TLS
  - Authentication: App Password

**Setup**:
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password
3. Configure in .env file

## 6.9 Browser Developer Tools

### 6.9.1 Chrome DevTools
- **Purpose**: Frontend debugging and testing
- **Features Used**:
  - Console for debugging
  - Network tab for API monitoring
  - Elements inspector
  - Application tab (localStorage, cookies)
  - Performance profiling
  - Responsive design testing

### 6.9.2 Supported Browsers
- Google Chrome (Primary)
- Mozilla Firefox
- Safari
- Microsoft Edge

## 6.10 Terminal and Command Line Tools

### 6.10.1 Windows PowerShell
- **Purpose**: Command-line interface (Windows)
- **Commands Used**:
  - npm commands
  - Directory navigation
  - File management
  - Server management

### 6.10.2 Terminal (macOS/Linux)
- **Purpose**: Command-line interface (Unix-based)
- **Shell**: Bash/Zsh
- **Commands Used**:
  - npm commands
  - chmod (permissions)
  - File operations

## 6.11 Package Management

### 6.11.1 npm (Node Package Manager)
- **Version**: 6.0.0+
- **Purpose**: JavaScript package management
- **Key Files**:
  - package.json - Project metadata and dependencies
  - package-lock.json - Locked dependency versions
  - node_modules/ - Installed packages

### 6.11.2 Dependency Management
**Frontend Dependencies** (18 packages):
- Production: react, react-dom, react-router-dom, axios
- Build tools: react-scripts

**Backend Dependencies** (10 packages):
- Production: express, mongoose, jsonwebtoken, bcryptjs, cors, dotenv, nodemailer, express-validator
- Development: nodemon

## 6.12 Project Management Tools

### 6.12.1 File Organization
- **Structure**:
  ```
  UiUx/
  ├── backend/
  ├── frontend/
  └── documentation/
  ```

### 6.12.2 Documentation Structure
- Markdown files for all documentation
- Separate files for each section
- Diagrams in .drawio format

## 6.13 Development Workflow Tools

### 6.13.1 Scripts
- **start.sh** - Unix startup script (removed)
- **start.bat** - Windows startup script (removed)
- npm scripts for automation

### 6.13.2 Environment Configuration
- **.env** - Environment variables (backend)
- **.env.example** - Environment template
- **.gitignore** - Ignored files configuration

## 6.14 Geolocation Services

### 6.14.1 Browser Geolocation API
- **Purpose**: Get user's current location
- **Usage**: Location-based matching

### 6.14.2 MongoDB Geospatial Queries
- **Purpose**: Calculate distances between locations
- **Index**: 2dsphere index on location coordinates
- **Queries**: $near, $geoWithin operators

## 6.15 Additional Utilities

### 6.15.1 Online Resources
- **MDN Web Docs**: JavaScript and Web API reference
- **Stack Overflow**: Problem solving and community support
- **React Documentation**: Official React guides
- **Express Documentation**: Official Express guides
- **MongoDB Documentation**: Database reference

### 6.15.2 Development Aids
- **Google**: General search
- **ChatGPT**: Problem solving and code assistance
- **GitHub Copilot**: Code suggestions (optional)

## 6.16 Tool Summary Table

| Category | Tool | Version | Purpose |
|----------|------|---------|---------|
| **Code Editor** | VS Code | Latest | Primary development environment |
| **Runtime** | Node.js | 14+ | JavaScript runtime |
| **Frontend Framework** | React | 18.2.0 | UI library |
| **Backend Framework** | Express.js | 4.18.2 | Web server framework |
| **Database** | MongoDB | 5.0+ | NoSQL database |
| **ODM** | Mongoose | 8.0.3 | MongoDB object modeling |
| **Routing** | React Router | 6.20.1 | Client-side routing |
| **HTTP Client** | Axios | 1.6.2 | API requests |
| **Authentication** | JWT | 9.0.2 | Token-based auth |
| **Security** | bcryptjs | 2.4.3 | Password hashing |
| **Email** | Nodemailer | 7.0.10 | Email service |
| **Validation** | express-validator | 7.0.1 | Input validation |
| **API Testing** | Postman | Latest | API development |
| **Database GUI** | MongoDB Compass | Latest | Database management |
| **Version Control** | Git | Latest | Source control |
| **Diagrams** | Draw.io | Web | System diagrams |
| **Package Manager** | npm | 6+ | Dependency management |

## 6.17 Learning Resources Used

- **Official Documentation**: React, Express, MongoDB, Node.js
- **Video Tutorials**: YouTube channels for specific topics
- **Online Courses**: Web development courses
- **Community Forums**: Stack Overflow, Reddit
- **Blogs**: Medium, Dev.to for best practices
