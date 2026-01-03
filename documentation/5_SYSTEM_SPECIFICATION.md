# 5. SYSTEM SPECIFICATION

## 5.1 System Architecture

### 5.1.1 Architecture Pattern
WeShare follows a **Three-Tier Client-Server Architecture**:

```
┌─────────────────────────────────────┐
│     Presentation Layer (Frontend)   │
│         React Application           │
└─────────────────────────────────────┘
                  ↕ HTTP/HTTPS
┌─────────────────────────────────────┐
│     Application Layer (Backend)     │
│    Node.js + Express.js Server      │
└─────────────────────────────────────┘
                  ↕ MongoDB Protocol
┌─────────────────────────────────────┐
│       Data Layer (Database)         │
│         MongoDB Atlas               │
└─────────────────────────────────────┘
```

### 5.1.2 Architecture Characteristics
- **RESTful API Design**: Stateless communication between frontend and backend
- **MVC Pattern**: Model-View-Controller separation in backend
- **Component-Based Frontend**: Reusable React components
- **Microservices Ready**: Modular design allows future service separation

## 5.2 Technology Stack

### 5.2.1 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework for building interactive user interfaces |
| React Router | 6.20.1 | Client-side routing and navigation |
| Axios | 1.6.2 | HTTP client for API communication |
| CSS3 | - | Styling and responsive design |
| JavaScript (ES6+) | - | Programming language |

**Key Frontend Features:**
- Single Page Application (SPA) architecture
- Context API for state management
- React Hooks for component logic
- Responsive design for mobile and desktop
- Form validation and error handling

### 5.2.2 Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 14+ | JavaScript runtime environment |
| Express.js | 4.18.2 | Web application framework |
| MongoDB | 5.0+ | NoSQL database |
| Mongoose | 8.0.3 | MongoDB object modeling |
| JWT | 9.0.2 | Authentication tokens |
| bcryptjs | 2.4.3 | Password hashing |
| Nodemailer | 7.0.10 | Email sending service |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| dotenv | 16.3.1 | Environment variable management |
| express-validator | 7.0.1 | Request validation middleware |

**Key Backend Features:**
- RESTful API endpoints
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- Error handling middleware
- Database connection pooling

### 5.2.3 Database

**MongoDB** - NoSQL Document Database

**Characteristics:**
- Schema-less document structure
- Flexible data models
- Horizontal scalability
- Geospatial indexing support
- Built-in replication and sharding

**Hosting:** MongoDB Atlas (Cloud)

### 5.2.4 Development Tools

| Tool | Purpose |
|------|---------|
| VS Code | Code editor |
| Git | Version control |
| Postman | API testing |
| MongoDB Compass | Database management |
| npm | Package manager |
| nodemon | Development server auto-reload |

## 5.3 System Components

### 5.3.1 Frontend Components

#### Core Components:
1. **App.js** - Root component with routing
2. **Navbar.js** - Navigation bar
3. **AuthContext.js** - Authentication state management
4. **PrivateRoute.js** - Protected route wrapper

#### Page Components:
1. **Landing.js** - Home/landing page
2. **Login.js** - User login
3. **Register.js** - User registration
4. **Dashboard.js** - User dashboard

#### Donor Components:
1. **CreateDonation.js** - Create new donation
2. **MyDonations.js** - View donor's donations
3. **DonationDetails.js** - Single donation details
4. **BrowseDonationRequests.js** - View requests for donations

#### Receiver Components:
1. **BrowseDonations.js** - Browse available donations
2. **MyRequests.js** - View receiver's requests
3. **CreateRequest.js** - Create new request

#### Shared Components:
1. **Notifications.js** - View all notifications
2. **Profile.js** - User profile management

### 5.3.2 Backend Components

#### Models (Data Layer):
1. **User.js** - User schema and methods
2. **Donation.js** - Donation schema
3. **Request.js** - Request schema
4. **Notification.js** - Notification schema

#### Routes (API Endpoints):
1. **auth.js** - Authentication routes
2. **donations.js** - Donation management routes
3. **requests.js** - Request management routes
4. **users.js** - User management routes
5. **notifications.js** - Notification routes

#### Middleware:
1. **auth.js** - JWT verification
2. **roleCheck.js** - Role-based access control
3. **errorHandler.js** - Global error handling
4. **validator.js** - Input validation

#### Services:
1. **emailService.js** - Email sending functionality
2. **notificationService.js** - Notification creation
3. **locationService.js** - Geolocation calculations

## 5.4 Database Schema

### 5.4.1 User Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, indexed),
  password: String (required, hashed),
  role: String (enum: ['donor', 'receiver', 'admin']),
  phone: String,
  address: String,
  location: {
    type: String (default: 'Point'),
    coordinates: [Number, Number] // [longitude, latitude]
  },
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- email (unique)
- location (2dsphere for geospatial queries)
```

### 5.4.2 Donation Collection

```javascript
{
  _id: ObjectId,
  donor: ObjectId (ref: 'User', required),
  category: String (enum: categories, required),
  title: String (required),
  quantity: String (required),
  description: String,
  location: {
    type: String (default: 'Point'),
    coordinates: [Number, Number]
  },
  status: String (enum: ['available', 'reserved', 'completed', 'expired']),
  createdAt: Date,
  expiresAt: Date,
  updatedAt: Date
}

Indexes:
- donor
- status
- location (2dsphere)
- createdAt
```

### 5.4.3 Request Collection

```javascript
{
  _id: ObjectId,
  receiver: ObjectId (ref: 'User', required),
  donationId: ObjectId (ref: 'Donation'),
  category: String (required),
  title: String (required),
  quantity: String (required),
  description: String,
  urgency: String (enum: ['low', 'medium', 'high', 'critical']),
  location: {
    type: String (default: 'Point'),
    coordinates: [Number, Number]
  },
  status: String (enum: ['pending', 'approved', 'rejected', 'completed']),
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- receiver
- donationId
- status
- createdAt
```

### 5.4.4 Notification Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  type: String (enum: ['donation', 'request', 'general']),
  title: String (required),
  message: String (required),
  link: String,
  data: Object,
  isRead: Boolean (default: false),
  createdAt: Date
}

Indexes:
- userId
- isRead
- createdAt
```

## 5.5 API Specifications

### 5.5.1 Authentication APIs

**POST /api/auth/register**
- Purpose: Register new user
- Request Body: { name, email, password, role, phone, address }
- Response: { token, user }
- Status: 201 Created

**POST /api/auth/login**
- Purpose: User login
- Request Body: { email, password }
- Response: { token, user }
- Status: 200 OK

**GET /api/auth/me**
- Purpose: Get current user
- Headers: Authorization: Bearer {token}
- Response: { user }
- Status: 200 OK

### 5.5.2 Donation APIs

**POST /api/donations**
- Purpose: Create donation
- Auth: Required (Donor)
- Request Body: { category, title, quantity, description, location }
- Response: { donation }
- Status: 201 Created

**GET /api/donations**
- Purpose: Get all available donations
- Auth: Required
- Query: ?category, ?search, ?distance
- Response: { donations }
- Status: 200 OK

**GET /api/donations/:id**
- Purpose: Get donation by ID
- Auth: Required
- Response: { donation }
- Status: 200 OK

**PUT /api/donations/:id**
- Purpose: Update donation
- Auth: Required (Owner only)
- Request Body: { title, description, quantity, category }
- Response: { donation }
- Status: 200 OK

**DELETE /api/donations/:id**
- Purpose: Delete donation
- Auth: Required (Owner only)
- Response: { message }
- Status: 200 OK

**GET /api/donations/my-donations**
- Purpose: Get donor's donations
- Auth: Required (Donor)
- Response: { donations }
- Status: 200 OK

### 5.5.3 Request APIs

**POST /api/requests**
- Purpose: Create request
- Auth: Required (Receiver)
- Request Body: { category, title, quantity, urgency, description }
- Response: { request }
- Status: 201 Created

**GET /api/requests**
- Purpose: Get all requests
- Auth: Required
- Response: { requests }
- Status: 200 OK

**GET /api/requests/my-requests**
- Purpose: Get receiver's requests
- Auth: Required (Receiver)
- Response: { requests }
- Status: 200 OK

**PUT /api/requests/:id/approve**
- Purpose: Approve request
- Auth: Required (Donor)
- Response: { request }
- Status: 200 OK

**PUT /api/requests/:id/reject**
- Purpose: Reject request
- Auth: Required (Donor)
- Response: { request }
- Status: 200 OK

### 5.5.4 Notification APIs

**GET /api/notifications**
- Purpose: Get user notifications
- Auth: Required
- Response: { notifications }
- Status: 200 OK

**PUT /api/notifications/:id/read**
- Purpose: Mark notification as read
- Auth: Required
- Response: { notification }
- Status: 200 OK

### 5.5.5 User APIs

**GET /api/users/profile**
- Purpose: Get user profile
- Auth: Required
- Response: { user }
- Status: 200 OK

**PUT /api/users/profile**
- Purpose: Update user profile
- Auth: Required
- Request Body: { name, phone, address }
- Response: { user }
- Status: 200 OK

## 5.6 Security Specifications

### 5.6.1 Authentication Flow
1. User submits credentials (email, password)
2. Server validates credentials
3. Server generates JWT token (expires in 24h)
4. Client stores token in localStorage
5. Client includes token in Authorization header for subsequent requests
6. Server validates token on each protected route

### 5.6.2 Password Security
- Passwords hashed using bcrypt with 10 salt rounds
- Minimum password requirements enforced
- Passwords never logged or transmitted in plain text

### 5.6.3 API Security
- CORS enabled with whitelist of allowed origins
- Input validation using express-validator
- SQL injection prevention through Mongoose ODM
- XSS protection through input sanitization
- Rate limiting on authentication endpoints

### 5.6.4 Data Security
- Environment variables for sensitive configuration
- MongoDB connection using TLS/SSL
- User data access restricted by ownership and role

## 5.7 Performance Specifications

### 5.7.1 Database Optimization
- Indexes on frequently queried fields
- 2dsphere index for geospatial queries
- Query result pagination
- Connection pooling

### 5.7.2 API Optimization
- Response compression (gzip)
- Caching headers for static resources
- Efficient query selection (only required fields)
- Asynchronous operations

### 5.7.3 Frontend Optimization
- Code splitting with React lazy loading
- Image optimization
- Minification and bundling
- Browser caching

## 5.8 Deployment Specifications

### 5.8.1 Environment Configuration
- Development: localhost
- Production: Cloud hosting (Heroku, AWS, DigitalOcean)

### 5.8.2 Environment Variables
- PORT: Server port number
- MONGODB_URI: Database connection string
- JWT_SECRET: Secret key for JWT signing
- EMAIL_USER: Email service username
- EMAIL_PASSWORD: Email service password
- FRONTEND_URL: Frontend application URL
- NODE_ENV: Environment (development/production)

### 5.8.3 Build Process
- Frontend: `npm run build` creates optimized production build
- Backend: Direct deployment of Node.js application
- Static files served from `/build` directory

## 5.9 Testing Specifications

### 5.9.1 Unit Testing
- Test individual components and functions
- Mock external dependencies
- Coverage target: 70%+

### 5.9.2 Integration Testing
- Test API endpoints
- Test database operations
- Test authentication flow

### 5.9.3 User Acceptance Testing
- Test complete user workflows
- Verify all functional requirements
- Cross-browser compatibility testing

## 5.10 Monitoring and Logging

### 5.10.1 Error Logging
- Console logging for development
- File-based logging for production
- Error stack traces captured

### 5.10.2 Activity Logging
- User authentication events
- Critical operations (create, update, delete)
- Failed requests and errors

### 5.10.3 Performance Monitoring
- API response times
- Database query performance
- Error rates and types
