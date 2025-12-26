# PMSSS - Prime Minister's Special Scholarship Scheme

<div align="center">

![PMSSS Logo](frontend/src/assets/SIH_Logo.png)

**A digital platform ensuring transparency, efficiency, and accessibility in scholarship distribution.**

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.5.0-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🎯 About

PMSSS (Prime Minister's Special Scholarship Scheme) is a comprehensive web application designed to streamline the scholarship application and management process. The platform provides a secure, transparent, and user-friendly interface for students to apply for scholarships, track their applications, and manage their profiles.

### Key Highlights

- **Paperless Application Process**: Complete digital workflow eliminating physical paperwork
- **Real-time Status Tracking**: Students can track their application status in real-time
- **Secure Authentication**: JWT-based authentication with role-based access control
- **Multi-role Support**: Separate dashboards for Students, Finance Administrators, and SAG (State Advisory Group)
- **Email Notifications**: Automated email notifications for important updates
- **Responsive Design**: Mobile-first design ensuring accessibility across all devices

## ✨ Features

### For Students
- 📝 **Online Registration**: Multi-step registration form with validation
- 📄 **Document Upload**: Secure document upload and management
- 📊 **Application Tracking**: Real-time status updates and notifications
- 💰 **Transaction History**: View scholarship disbursement history
- 👤 **Profile Management**: Update personal and academic information

### For Finance Administrators
- ✅ **Application Approval**: Review and approve student applications
- 💵 **Disbursement Management**: Manage scholarship disbursements
- 📈 **Dashboard Analytics**: Overview of applications and disbursements
- 📋 **Student Management**: View and manage student records

### For SAG (State Advisory Group)
- 🔍 **Application Review**: Review student applications
- 📊 **Reporting**: Generate reports and analytics
- ✅ **Approval Workflow**: Multi-level approval process

## 🛠 Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite 7.1.2** - Build tool and dev server
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **React Router DOM 7.9.1** - Client-side routing
- **React Hot Toast 2.6.0** - Notification system
- **Lucide React 0.544.0** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web framework
- **MongoDB 7.5.0** - Database (via Mongoose)
- **JWT 9.0.2** - Authentication
- **Bcryptjs 2.4.3** - Password hashing
- **Nodemailer** - Email service
- **CORS 2.8.5** - Cross-origin resource sharing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **MongoDB** (v6.0 or higher) or MongoDB Atlas account
- **Git** (for version control)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/suraj-savle/PSD.git
cd PSD
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/pmsss
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pmsss

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Email Configuration (Outlook/Hotmail)
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173

# Email TLS Configuration (Optional)
# Set to 'false' only in development if needed
EMAIL_TLS_REJECT_UNAUTHORIZED=true
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000

# Finance Admin Credentials (Optional - for testing)
VITE_FINANCE_ADMIN_1_EMAIL=admin1@pmsss.gov.in
VITE_FINANCE_ADMIN_1_PASSWORD=Admin@123
VITE_FINANCE_ADMIN_2_EMAIL=admin2@pmsss.gov.in
VITE_FINANCE_ADMIN_2_PASSWORD=Admin@123
VITE_FINANCE_ADMIN_3_EMAIL=admin3@pmsss.gov.in
VITE_FINANCE_ADMIN_3_PASSWORD=Admin@123
```

### MongoDB Setup

#### Option 1: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGO_URI` in `.env`

## 🎮 Usage

### Start Development Servers

#### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### Terminal 2 - Frontend Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Seed Test Data (Optional)

To create a test student account:

```bash
cd backend
node seedTestStudent.js
```

**Note**: Update the seed file with environment variables for production use.

### Build for Production

#### Frontend

```bash
cd frontend
npm run build
```

The production build will be in `frontend/dist/`

#### Backend

```bash
cd backend
npm start
```

## 📁 Project Structure

```
PSD/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── emailController.js    # Email service
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT authentication
│   │   └── upload.js              # File upload handling
│   ├── models/
│   │   └── User.js                # User schema
│   ├── routes/
│   │   ├── authRoutes.js          # Auth endpoints
│   │   ├── emailRoutes.js         # Email endpoints
│   │   └── studentRoutes.js       # Student endpoints
│   ├── server.js                   # Express server
│   └── seedTestStudent.js         # Database seeder
│
├── frontend/
│   ├── public/
│   │   └── images/                # Static images
│   ├── src/
│   │   ├── assets/                # Logo and images
│   │   ├── components/            # Reusable components
│   │   │   ├── DatePicker.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── pages/
│   │   │   ├── Auth/              # Authentication pages
│   │   │   ├── finance/          # Finance dashboard
│   │   │   ├── student/          # Student dashboard
│   │   │   └── Landing.jsx       # Landing page
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   └── vite.config.js            # Vite configuration
│
└── README.md                      # This file
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "student123",
  "email": "student@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe",
  ...
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "student@example.com",
  "password": "SecurePass123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Student Endpoints

#### Get Student Data
```http
GET /api/student/profile
Authorization: Bearer <token>
```

#### Update Student Profile
```http
PUT /api/student/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Updated Name",
  ...
}
```

### Email Endpoints

#### Send Welcome Email
```http
POST /api/email/welcome
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "student@example.com",
  "name": "John Doe",
  "username": "student123"
}
```

### Test Endpoint

```http
GET /api/test
```

Returns: `{ "message": "Server is working correctly", "timestamp": "..." }`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/suraj-savle/PSD.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary
   - Update documentation if needed

4. **Commit Your Changes**
   ```bash
   git commit -m "Add: your feature description"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Request review from maintainers

### Code Style Guidelines

- Use meaningful variable and function names
- Follow ESLint configuration
- Write self-documenting code
- Add JSDoc comments for complex functions
- Keep functions small and focused

## 🔒 Security

- **Never commit sensitive data** (passwords, API keys, etc.)
- Use environment variables for configuration
- Keep dependencies updated
- Enable SSL/TLS in production
- Use strong JWT secrets
- Implement rate limiting for APIs
- Validate and sanitize all user inputs

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **Suraj Savle** - [@suraj-savle](https://github.com/suraj-savle)
- **Swapnil Kalambe** - [@Codewithswappy](https://github.com/Codewithswappy)

## 📞 Contact

- **Email**: support@pmsss.gov.in
- **GitHub**: [@suraj-savle/PSD](https://github.com/suraj-savle/PSD)
- **Issues**: [GitHub Issues](https://github.com/suraj-savle/PSD/issues)

## 🙏 Acknowledgments

- Prime Minister's Special Scholarship Scheme (PMSSS)
- Smart India Hackathon (SIH)
- All contributors and supporters

---

<div align="center">

**Made with ❤️ for transparent and accessible scholarship management**

⭐ Star this repo if you find it helpful!

</div>

