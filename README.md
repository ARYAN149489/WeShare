# 🤝 Donor-Receiver Platform

🌐 **Live Website:** [https://wesshare.netlify.app/](https://wesshare.netlify.app/)

A full-stack web application connecting generous donors with those in need. Facilitates seamless donation of food, clothes, electronics, books, and more to help communities thrive.

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green) ![Node.js](https://img.shields.io/badge/Node.js-v18+-blue) ![React](https://img.shields.io/badge/React-v18.2-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### For Donors
- 📦 Create and manage donation listings
- 🔍 Browse donation requests from receivers
- 📅 Schedule pickup or drop-off options
- 📊 Track donation history and status
- 🔔 Real-time notifications for matching requests

### For Receivers
- 🎁 Browse available donations by category
- 📝 Create specific donation requests
- 🚨 Set urgency levels (low, medium, high, critical)
- 🔍 Advanced search and filtering
- 📍 Location-based donation matching

### General
- 🔐 Secure JWT authentication
- 📧 Email notifications for important updates
- 🌍 Geolocation-based matching
- 📱 Fully responsive design
- ⭐ Rating and review system

---

## 🛠️ Tech Stack

**Frontend:** React, React Router, Context API, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JWT, Bcrypt  
**Email:** Nodemailer with Gmail SMTP  
**Deployment Ready:** Vercel, Heroku, AWS, or Digital Ocean

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd donor-receiver-platform
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm start
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

4. **Seed Database (Optional)**
```bash
cd backend
node seed-comprehensive.js
```

The app will be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

---


## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create donation
- `PUT /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation

### Requests
- `GET /api/requests/all-open` - Get all open requests
- `POST /api/requests` - Create request
- `PUT /api/requests/:id` - Update request

For detailed API documentation, see the [API Guide](./documentation/API_GUIDE.md).

---

## 🗄️ Database Schema

**Collections:**
- **Users** - Donor and receiver profiles
- **Donations** - Available donation listings
- **Requests** - Donation requests from receivers
- **Notifications** - System notifications

**Categories:** Food, Clothes, Blood, Medicine, Books, Electronics, Furniture, Other

---

## 🔮 Future Enhancements

1. **📸 Image Upload System**
   - Add photo uploads for donations
   - Image compression and optimization
   - Multiple image gallery support

2. **💬 Real-time Chat**
   - Direct messaging between donors and receivers
   - Socket.io integration
   - Chat history and file sharing

3. **📱 Mobile Application**
   - React Native mobile app
   - Push notifications
   - Offline mode support

4. **🤖 AI-Powered Matching**
   - Smart donation-request matching algorithm
   - Predictive analytics for donation trends
   - Automated recommendations

5. **🌐 Multi-language Support**
   - Internationalization (i18n)
   - Support for regional languages
   - Cultural customization options

---

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👥 Authors

- **Aryan Kansal**  - [ARYAN149489](https://github.com/ARYAN149489)

---

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- React community for excellent documentation

---

![Star this repo](https://img.shields.io/github/stars/yourusername/donor-receiver-platform?style=social)
