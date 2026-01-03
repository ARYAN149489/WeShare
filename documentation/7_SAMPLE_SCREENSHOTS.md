# 7. SAMPLE SCREENSHOTS

## 7.1 Authentication & Landing

### 7.1.1 Landing Page
**Purpose**: First page users see when visiting WeShare

**Description**:
- Hero section with platform introduction
- Call-to-action buttons for Register/Login
- Brief overview of how WeShare works
- Features highlight section
- Responsive navigation bar

**Key Elements**:
- WeShare logo and branding
- Navigation menu (Home, About, Login, Register)
- Hero text: "Share Food, Share Hope"
- Primary CTA buttons
- Feature cards (Donate, Request, Connect)

**Location**: `/` (root URL)

---

### 7.1.2 Registration Page
**Purpose**: New user account creation

**Description**:
- User registration form
- Role selection (Donor or Receiver)
- Email and password fields
- Address and phone number input
- Location information capture

**Form Fields**:
- Name (text input)
- Email (email input with validation)
- Password (password input with strength indicator)
- Confirm Password
- Role (radio buttons: Donor/Receiver)
- Phone Number (optional)
- Address (textarea)
- Terms & Conditions checkbox

**Validation Messages**:
- "Email already exists"
- "Password must be at least 8 characters"
- "Passwords do not match"
- "All required fields must be filled"

**Location**: `/register`

---

### 7.1.3 Login Page
**Purpose**: User authentication

**Description**:
- Simple login form
- Email and password fields
- Remember me option
- Forgot password link
- Link to registration page

**Form Fields**:
- Email (email input)
- Password (password input)
- Remember Me (checkbox)

**Error Messages**:
- "Invalid credentials"
- "Please enter valid email"
- "Account not found"

**Success Action**:
- Redirect to dashboard
- Store JWT token in localStorage
- Load user profile

**Location**: `/login`

---

## 7.2 Donor Pages

### 7.2.1 Donor Dashboard
**Purpose**: Central hub for donor activities

**Description**:
- Welcome message with user's name
- Quick statistics cards
- Recent donations list
- Pending requests notification
- Quick action buttons

**Dashboard Cards**:
- Total Donations: Shows count of all donations created
- Active Donations: Currently available donations
- Pending Requests: Number of requests waiting for approval
- Completed Donations: Successfully completed donations

**Quick Actions**:
- Create New Donation button
- View All Donations link
- View Requests link
- Profile settings link

**Recent Activity**:
- Last 5 donations with status
- Recent request notifications
- Quick approve/reject buttons

**Location**: `/donor/dashboard`

---

### 7.2.2 Create Donation Page
**Purpose**: Post new food donation listing

**Description**:
- Comprehensive donation form
- Category selection dropdown
- Quantity and description fields
- Location auto-populated from profile
- Image upload (future enhancement)

**Form Fields**:
- Title (text input) - e.g., "Fresh Vegetables"
- Category (dropdown):
  - Vegetables
  - Fruits
  - Grains
  - Dairy
  - Prepared Food
  - Baked Goods
  - Canned Goods
  - Others
- Quantity (text input) - e.g., "5 kg", "10 servings"
- Description (textarea) - Details about the food
- Location (auto-filled, can edit)
- Expiration/Best Before (date picker - future)

**Preview Section**:
- Shows how listing will appear to receivers
- Preview card with all entered information

**Buttons**:
- Submit Donation (primary)
- Cancel (secondary)
- Save as Draft (future)

**Success Message**:
- "Donation created successfully!"
- "Receivers nearby will be notified"

**Location**: `/donor/create-donation`

---

### 7.2.3 My Donations Page
**Purpose**: View and manage all donor's donations

**Description**:
- List of all donations created by donor
- Filter tabs by status
- Search functionality
- Edit/Delete actions
- Status indicators

**Filter Tabs**:
- All Donations
- Available
- Reserved
- Completed
- Expired

**Donation Card Display**:
- Title and category icon
- Quantity and description
- Creation date
- Status badge (color-coded)
- Number of requests received
- Actions menu (Edit, Delete, Mark Complete)

**Status Colors**:
- Available: Green
- Reserved: Yellow
- Completed: Blue
- Expired: Gray

**Action Buttons**:
- View Requests (if requests exist)
- Edit (if no approved requests)
- Delete (with confirmation)
- Mark as Completed

**Empty State**:
- "No donations yet"
- "Create your first donation" button

**Location**: `/donor/my-donations`

---

### 7.2.4 Donation Details Page
**Purpose**: View single donation with all requests

**Description**:
- Complete donation information
- Map showing location (future)
- List of all requests for this donation
- Approve/Reject request functionality
- Donation status management

**Donation Information**:
- Title and category
- Full description
- Quantity available
- Posted date
- Current status
- Location details

**Requests Section**:
- List of all requests
- Each request shows:
  - Receiver name
  - Quantity requested
  - Urgency level
  - Request message
  - Requested date
  - Request status

**Request Actions**:
- Approve button (green)
- Reject button (red)
- View receiver profile (future)
- Contact receiver (future)

**Status Update**:
- Mark as Completed button
- Cancel Donation button
- Edit Donation (if no approved requests)

**Location**: `/donor/donation/:id`

---

### 7.2.5 Browse Donation Requests Page
**Purpose**: View all requests across donor's donations

**Description**:
- Consolidated view of all requests
- Filter by donation
- Filter by urgency
- Approve/reject actions

**Display**:
- Request cards with:
  - Donation title (which donation is requested)
  - Receiver name
  - Quantity requested
  - Urgency indicator
  - Request message
  - Time ago
  - Status

**Filters**:
- All Requests
- Pending Only
- By Urgency (Critical, High, Medium, Low)
- By Donation

**Bulk Actions** (future):
- Select multiple requests
- Approve/Reject multiple at once

**Location**: `/donor/requests`

---

## 7.3 Receiver Pages

### 7.3.1 Receiver Dashboard
**Purpose**: Central hub for receiver activities

**Description**:
- Welcome message
- Statistics cards
- Nearby donations map/list
- Active requests status
- Quick search

**Dashboard Cards**:
- Available Donations: Count of donations nearby
- My Requests: Total requests made
- Approved Requests: Requests approved by donors
- Completed: Successfully received donations

**Nearby Donations**:
- 5 closest donations
- Distance shown
- Category and quantity
- Quick request button

**Active Requests**:
- Pending requests with status
- Approved requests with donor contact info
- Rejected requests with reason (if provided)

**Quick Actions**:
- Browse All Donations
- Create Request
- View My Requests
- Update Profile

**Location**: `/receiver/dashboard`

---

### 7.3.2 Browse Donations Page
**Purpose**: Search and discover available donations

**Description**:
- Grid/list view of available donations
- Search bar
- Category filters
- Distance filters
- Sort options

**Search & Filters**:
- Search box (by title/description)
- Category checkboxes
- Distance radius slider (5km, 10km, 25km, 50km)
- Sort by:
  - Distance (nearest first)
  - Newest first
  - Quantity

**Donation Cards**:
- Title and category icon
- Quantity available
- Distance from user
- Brief description
- Posted time ago
- Donor name/area
- Request button

**View Modes**:
- Grid view (cards)
- List view (detailed rows)
- Map view (future)

**Empty State**:
- "No donations available nearby"
- "Try increasing search radius"
- "Create a request instead" button

**Location**: `/receiver/browse-donations`

---

### 7.3.3 Donation Details Page (Receiver View)
**Purpose**: View complete donation information and request it

**Description**:
- Full donation details
- Donor information (limited)
- Request form
- Distance and location info

**Donation Information**:
- Title, category, quantity
- Full description
- Posted date
- Distance from receiver
- General location (not exact address)
- Status (available/reserved)

**Request Section**:
- Quantity needed (input)
- Urgency level (dropdown)
- Message to donor (textarea)
- Submit Request button

**Urgency Levels**:
- Low (can wait)
- Medium (need soon)
- High (need within 24 hours)
- Critical (urgent need)

**Already Requested**:
- If user already requested this donation
- Show request status
- Option to cancel request

**Location**: `/receiver/donation/:id`

---

### 7.3.4 My Requests Page
**Purpose**: View and manage all receiver's requests

**Description**:
- List of all requests made
- Status filter tabs
- Request details
- Cancel pending requests

**Filter Tabs**:
- All Requests
- Pending
- Approved
- Rejected
- Completed

**Request Cards**:
- Donation title
- Quantity requested
- Urgency indicator
- Request status with badge
- Requested date
- Donor response (if any)
- Action buttons

**Status Indicators**:
- Pending: Orange badge
- Approved: Green badge with donor info
- Rejected: Red badge
- Completed: Blue badge

**Actions**:
- Cancel (for pending requests)
- Contact Donor (for approved requests)
- Mark as Received (for approved requests)
- View Donation Details

**Empty State**:
- "No requests yet"
- "Browse available donations" button

**Location**: `/receiver/my-requests`

---

### 7.3.5 Create Request Page
**Purpose**: Post a food request/need

**Description**:
- Form to describe food needs
- Category selection
- Urgency indicator
- Matching suggestions

**Form Fields**:
- Title (what you need)
- Category (dropdown)
- Quantity needed
- Description (why you need it)
- Urgency level
- Location (auto-filled)

**Matching Suggestions**:
- As user types, show similar available donations
- "Found 3 matching donations" message
- Quick links to matching donations

**Submit Options**:
- Post Request (creates public request)
- Save Draft (future)
- Cancel

**Success**:
- "Request posted successfully"
- "We'll notify you of matching donations"
- Option to browse donations immediately

**Location**: `/receiver/create-request`

---

## 7.4 Shared Pages

### 7.4.1 Notifications Page
**Purpose**: View all user notifications

**Description**:
- List of all notifications
- Unread count indicator
- Mark as read functionality
- Filter by type

**Notification Types**:
- **Donation Notifications** (for receivers):
  - "New donation available near you"
  - "Your request was approved"
  - "Your request was rejected"
  
- **Request Notifications** (for donors):
  - "New request for your donation"
  - "Request was cancelled"
  
- **General Notifications**:
  - "Welcome to WeShare"
  - "Profile updated successfully"

**Notification Card**:
- Icon based on type
- Title and message
- Timestamp (e.g., "2 hours ago")
- Unread indicator (blue dot)
- Click to mark as read
- Link to related item

**Actions**:
- Mark all as read button
- Filter by type dropdown
- Clear old notifications (future)

**Empty State**:
- "No notifications yet"
- Bell icon illustration

**Location**: `/notifications`

---

### 7.4.2 Profile Page
**Purpose**: View and edit user profile

**Description**:
- User information display
- Edit mode
- Password change option
- Account statistics

**Profile Information**:
- Name
- Email (non-editable)
- Role badge (Donor/Receiver)
- Phone number
- Address
- Member since date

**Editable Fields**:
- Name
- Phone number
- Address
- Location coordinates (auto-updated from address)

**Account Statistics**:
- For Donors:
  - Total Donations Made
  - Active Donations
  - Completed Donations
  - Impact (kg of food shared)
  
- For Receivers:
  - Total Requests Made
  - Approved Requests
  - Food Received (kg)

**Change Password Section**:
- Current password
- New password
- Confirm new password
- Update button

**Actions**:
- Edit Profile button
- Save Changes button
- Cancel button
- Delete Account (future, with confirmation)

**Location**: `/profile`

---

## 7.5 Admin Pages (Future Enhancement)

### 7.5.1 Admin Dashboard
**Purpose**: Platform management and monitoring

**Features**:
- Total users count
- Total donations and requests
- Active users today
- Platform statistics graphs
- Recent activity feed

---

### 7.5.2 User Management
**Purpose**: Manage all users

**Features**:
- User list with filters
- Activate/deactivate accounts
- View user activity
- Send notifications

---

### 7.5.3 Content Moderation
**Purpose**: Review and moderate content

**Features**:
- Flagged donations/requests
- Report management
- Content removal
- User warnings

---

## 7.6 Responsive Design Screenshots

### 7.6.1 Mobile View (320px - 768px)
- Hamburger menu navigation
- Stacked layout
- Touch-friendly buttons
- Simplified forms
- Bottom navigation (future)

### 7.6.2 Tablet View (768px - 1024px)
- Two-column layouts
- Sidebar navigation
- Grid views (2 columns)
- Optimized card sizes

### 7.6.3 Desktop View (1024px+)
- Full navigation bar
- Multi-column layouts
- Sidebar + main content
- Expanded cards
- More information density

---

## 7.7 Error and Loading States

### 7.7.1 Loading States
- Spinner on page load
- Skeleton screens for content
- Button loading indicators
- Progress bars for uploads

### 7.7.2 Error States
- 404 Not Found page
- 500 Server Error page
- Form validation errors
- Network error messages
- Empty state illustrations

### 7.7.3 Success States
- Success toast messages
- Confirmation modals
- Success page after actions
- Check mark animations

---

## 7.8 UI Components

### 7.8.1 Navigation
- Top navigation bar with logo
- User menu dropdown
- Notification bell icon with badge
- Responsive mobile menu

### 7.8.2 Cards
- Donation cards
- Request cards
- Notification cards
- Statistics cards
- User profile cards

### 7.8.3 Forms
- Text inputs
- Dropdowns/selects
- Textareas
- Radio buttons
- Checkboxes
- Date pickers
- File upload (future)

### 7.8.4 Buttons
- Primary buttons (green)
- Secondary buttons (gray)
- Danger buttons (red)
- Icon buttons
- Loading buttons

### 7.8.5 Badges and Tags
- Status badges (available, reserved, completed)
- Urgency tags (low, medium, high, critical)
- Category tags
- Role badges (donor, receiver, admin)

### 7.8.6 Modals and Dialogs
- Confirmation dialogs
- Delete confirmations
- Success messages
- Error alerts
- Information popups

---

## 7.9 Color Scheme

### Primary Colors:
- **Green (#4CAF50)**: Primary actions, success, available status
- **Blue (#2196F3)**: Links, information, completed status
- **Orange (#FF9800)**: Warnings, pending status
- **Red (#F44336)**: Errors, rejections, delete actions

### Neutral Colors:
- **White (#FFFFFF)**: Backgrounds, cards
- **Light Gray (#F5F5F5)**: Secondary backgrounds
- **Dark Gray (#333333)**: Text
- **Medium Gray (#666666)**: Secondary text

### Semantic Colors:
- **Success**: Green variants
- **Error**: Red variants
- **Warning**: Orange/Yellow variants
- **Info**: Blue variants

---

## 7.10 Typography

### Fonts:
- **Headings**: Sans-serif (Arial, Helvetica)
- **Body**: Sans-serif
- **Monospace**: Code snippets (future)

### Sizes:
- **H1**: 32px - Page titles
- **H2**: 24px - Section headings
- **H3**: 20px - Card titles
- **Body**: 16px - Regular text
- **Small**: 14px - Meta information
- **Tiny**: 12px - Labels, timestamps

---

## 7.11 Icons

### Icon Library: Font Awesome / Material Icons

**Common Icons Used**:
- 🏠 Home
- 👤 User/Profile
- 🔔 Notifications
- ➕ Add/Create
- 🔍 Search
- 📍 Location
- 🍎 Food categories
- ✅ Approve/Success
- ❌ Reject/Delete
- ⚙️ Settings
- 🚪 Logout
- 📧 Email
- 📱 Phone

---

## Notes on Screenshots:
*Since this is a documentation file, actual screenshots would be inserted here after the application is fully deployed and running. Screenshots should be high-quality PNG files showing the actual application interface with sample data populated.*

**Recommended Screenshot Specifications**:
- Format: PNG
- Resolution: 1920x1080 (desktop), 375x812 (mobile)
- Include realistic sample data
- Annotate key features with arrows/highlights
- Show various states (empty, loaded, error)
