# 3. SPECIFIC REQUIREMENTS

## 3.1 Functional Requirements

### 3.1.1 User Management

#### FR-1.1: User Registration
- System shall allow users to register with email and password
- System shall validate email format and password strength
- Password must be minimum 8 characters with uppercase, lowercase, and number
- System shall send email verification upon registration
- System shall store user role (Donor, Receiver, or Admin)

#### FR-1.2: User Authentication
- System shall provide secure login using email and password
- System shall generate JWT tokens for authenticated sessions
- System shall implement session timeout after 24 hours
- System shall allow users to logout and invalidate tokens
- System shall hash passwords using bcrypt before storage

#### FR-1.3: User Profile Management
- Users shall be able to view and update their profile information
- System shall store: name, email, phone number, address, and location coordinates
- System shall allow users to update their password
- System shall validate and geocode user addresses
- Users shall be able to view their role and account status

### 3.1.2 Donation Management (For Donors)

#### FR-2.1: Create Donation
- Donors shall be able to create new donation listings
- Required fields: title, category, quantity, description, location
- System shall automatically capture donor ID and timestamp
- System shall geocode location to coordinates for proximity search
- System shall set initial status as "available"
- System shall support categories: Vegetables, Fruits, Grains, Dairy, Prepared Food, Baked Goods, Canned Goods, Others

#### FR-2.2: View Donations
- Donors shall see list of all their donations
- System shall display: title, category, quantity, status, creation date
- System shall allow filtering by status (available, reserved, completed, expired)
- System shall show number of pending requests per donation

#### FR-2.3: Update Donation
- Donors shall be able to edit donation details before it's reserved
- System shall allow updating: title, description, quantity, category
- System shall prevent editing if donation has approved requests
- System shall track modification timestamp

#### FR-2.4: Delete Donation
- Donors shall be able to delete donations
- System shall only allow deletion if no approved requests exist
- System shall notify receivers if a donation they requested is deleted

#### FR-2.5: Manage Requests
- Donors shall view all requests for their donations
- System shall display: receiver name, quantity requested, urgency, timestamp
- Donors shall be able to approve or reject requests
- System shall update donation status to "reserved" upon approval
- System shall notify receiver of approval/rejection decision
- Donors shall mark donations as "completed" after successful handover

### 3.1.3 Request Management (For Receivers)

#### FR-3.1: Browse Donations
- Receivers shall browse all available donations
- System shall display: title, category, quantity, distance, donor location
- System shall show donations in order of proximity (nearest first)
- System shall allow search by title or category
- System shall filter by category and distance range

#### FR-3.2: Create Request
- Receivers shall create food requests describing their needs
- Required fields: title, category, quantity, urgency, description
- System shall support urgency levels: low, medium, high, critical
- System shall capture receiver location for matching
- System shall set initial status as "pending"

#### FR-3.3: Request Specific Donation
- Receivers shall request specific donations from listings
- System shall validate quantity requested doesn't exceed available
- System shall notify donor of new request
- System shall track request status (pending, approved, rejected, completed)

#### FR-3.4: View Requests
- Receivers shall view all their requests
- System shall display: title, quantity, status, urgency, creation date
- System shall show matched donations for each request
- System shall allow filtering by status

#### FR-3.5: Cancel Request
- Receivers shall be able to cancel pending requests
- System shall notify donor of cancellation
- System shall update donation availability if request was approved

### 3.1.4 Notification System

#### FR-4.1: In-App Notifications
- System shall create notifications for key events
- Events include: new request, request approved/rejected, donation available, donation expiring
- Users shall view notifications in dedicated notifications page
- System shall show unread notification count
- Users shall mark notifications as read
- System shall support notification types: donation, request, general

#### FR-4.2: Email Notifications
- System shall send email notifications using Gmail SMTP
- Emails shall be sent for: registration confirmation, request updates, donation matches
- System shall include relevant details and direct links in emails
- System shall handle email delivery errors gracefully

### 3.1.5 Search and Discovery

#### FR-5.1: Location-Based Search
- System shall calculate distance between users using geolocation
- System shall sort donations by proximity to receiver
- System shall display distance in kilometers
- System shall support searching within specified radius (5km, 10km, 25km, 50km)

#### FR-5.2: Category Filtering
- System shall allow filtering donations by food category
- System shall support multiple category selection
- System shall show category count for available donations

#### FR-5.3: Text Search
- System shall support keyword search in donation titles and descriptions
- Search shall be case-insensitive
- System shall highlight matching results

### 3.1.6 Administrative Functions

#### FR-6.1: User Management
- Admins shall view all registered users
- Admins shall be able to activate/deactivate user accounts
- Admins shall view user statistics (total donors, receivers, donations)

#### FR-6.2: Content Moderation
- Admins shall view all donations and requests
- Admins shall be able to remove inappropriate content
- Admins shall generate reports on platform activity

## 3.2 Non-Functional Requirements

### 3.2.1 Performance Requirements

#### NFR-1.1: Response Time
- API requests shall respond within 2 seconds under normal load
- Page load time shall not exceed 3 seconds
- Database queries shall execute within 1 second
- Search results shall return within 2 seconds

#### NFR-1.2: Scalability
- System shall support up to 10,000 concurrent users
- System shall handle 1,000 donations and 5,000 requests initially
- Database shall be designed to scale horizontally
- Application shall be stateless to support load balancing

#### NFR-1.3: Throughput
- System shall process minimum 100 requests per second
- Email service shall handle 1,000 emails per hour
- Notification system shall deliver notifications within 5 seconds

### 3.2.2 Security Requirements

#### NFR-2.1: Authentication & Authorization
- All API endpoints shall require valid JWT token (except public routes)
- Passwords shall be hashed using bcrypt with salt rounds ≥ 10
- JWT tokens shall expire after 24 hours
- System shall implement role-based access control (RBAC)

#### NFR-2.2: Data Protection
- All communication shall use HTTPS/TLS encryption
- Sensitive data shall be encrypted at rest
- User passwords shall never be stored in plain text
- System shall sanitize all user inputs to prevent injection attacks

#### NFR-2.3: Privacy
- User email addresses shall not be publicly visible
- Location data shall be used only for proximity calculation
- System shall comply with data protection regulations
- Users shall be able to delete their accounts and associated data

### 3.2.3 Reliability Requirements

#### NFR-3.1: Availability
- System shall maintain 99% uptime
- Planned maintenance shall be scheduled during low-traffic hours
- System shall have automated backup every 24 hours

#### NFR-3.2: Fault Tolerance
- Application shall handle database connection failures gracefully
- System shall log all errors for debugging
- Failed email deliveries shall be retried up to 3 times

#### NFR-3.3: Data Integrity
- Database transactions shall be ACID-compliant
- System shall validate all data before storage
- Foreign key relationships shall be maintained

### 3.2.4 Usability Requirements

#### NFR-4.1: User Interface
- UI shall be responsive and work on mobile, tablet, and desktop
- Interface shall be intuitive requiring no training
- System shall provide clear error messages and feedback
- Navigation shall be consistent across all pages

#### NFR-4.2: Accessibility
- Application shall support modern browsers (Chrome, Firefox, Safari, Edge)
- Color contrast shall meet WCAG 2.1 AA standards
- Font sizes shall be readable (minimum 14px)

#### NFR-4.3: Learnability
- New users shall be able to create donation/request within 5 minutes
- System shall provide helpful tooltips and guidance
- Error messages shall be clear and actionable

### 3.2.5 Maintainability Requirements

#### NFR-5.1: Code Quality
- Code shall follow ES6+ JavaScript standards
- Backend shall follow MVC architecture pattern
- Frontend shall follow component-based architecture
- Code shall include inline comments for complex logic

#### NFR-5.2: Documentation
- All API endpoints shall be documented
- Database schema shall be documented
- README shall include setup instructions
- Code shall include JSDoc comments for functions

#### NFR-5.3: Modularity
- System components shall be loosely coupled
- Each module shall have single responsibility
- Code shall be reusable and DRY (Don't Repeat Yourself)

### 3.2.6 Portability Requirements

#### NFR-6.1: Cross-Platform
- Application shall run on Windows, macOS, and Linux
- Frontend shall work on all major browsers
- Backend shall be deployable on any Node.js compatible server

#### NFR-6.2: Database Portability
- MongoDB database shall be easily exportable/importable
- Connection strings shall be environment-configurable

## 3.3 System Constraints

### 3.3.1 Technical Constraints
- Backend must use Node.js and Express.js
- Frontend must use React 18
- Database must be MongoDB
- Authentication must use JWT

### 3.3.2 Business Constraints
- Application must be free for end users
- Initial deployment for local community
- English language only in first version

### 3.3.3 Regulatory Constraints
- Must comply with data protection laws
- Must include food safety disclaimers
- Must not guarantee food quality (peer-to-peer platform)

## 3.4 Assumptions and Dependencies

### 3.4.1 Assumptions
- Users have access to internet-connected devices
- Users can provide accurate location information
- Food donors follow basic food safety practices
- Users communicate honestly about food quality and quantity

### 3.4.2 Dependencies
- MongoDB Atlas for database hosting
- Gmail SMTP for email services
- Geocoding service for location conversion
- Internet connectivity for all features

## 3.5 Acceptance Criteria

The system will be considered complete when:

1. All functional requirements are implemented and tested
2. Users can successfully register, login, and manage profiles
3. Donors can create, update, and manage donations
4. Receivers can browse, search, and request donations
5. Notification system works for all key events
6. Location-based matching functions correctly
7. All non-functional requirements are met
8. System passes security audit
9. Documentation is complete
10. Application is successfully deployed and accessible
