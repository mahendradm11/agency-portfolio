# SoraZen Project - GoDaddy Deployment Guide

## ✅ Pre-Deployment Checklist - ALL CLEAR

### Code Quality
- ✅ No errors found in the codebase
- ✅ No unresolved imports
- ✅ All dependencies installed and up-to-date
- ✅ No security vulnerabilities (npm audit clean)
- ✅ Frontend builds successfully
- ✅ Backend syntax verified

### Dependencies Status
**Frontend Dependencies:**
- react ^19.2.4
- react-dom ^19.2.4
- react-router-dom ^7.13.2
- axios ^1.13.6
- framer-motion ^12.38.0
- All installed ✅

**Backend Dependencies:**
- express ^4.18.2
- mongoose ^7.5.0
- cors ^2.8.5
- dotenv ^16.3.1
- All installed ✅

---

## 🚀 Deployment Instructions

### Part 1: Frontend Deployment (React + Vite)

#### Step 1: Build the Frontend
```bash
cd Synorix-frontend
npm run build
```
This creates a `dist` folder with optimized production files.

#### Step 2: Upload to GoDaddy
1. **Access GoDaddy File Manager:**
   - Log in to GoDaddy account
   - Go to cPanel (Hosting → Manage)
   - Open File Manager

2. **Upload Frontend Files:**
   - Navigate to `public_html` folder
   - DELETE existing files (backup first if needed)
   - Upload ALL files from `dist` folder to `public_html`
   
3. **Important:** Make sure `index.html` is directly in `public_html`

#### Step 3: Configure Routing
Add a `.htaccess` file in `public_html` (right-click → Create New File):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures React Router works correctly.

---

### Part 2: Backend Deployment (Node.js)

#### Step 1: Set Up Node.js App on GoDaddy

1. **Access Application Manager:**
   - cPanel → Manage → Application Manager (or Node.js)
   - Create or register an application

2. **Application Details:**
   - Name: `sorazen-backend`
   - Node.js Version: 18+ (recommended)
   - Application Root: `/home/username/public_html/api` (or similar)
   - Entry Point: `index.js`
   - Application URL: Your custom domain

#### Step 2: Upload Backend Files

1. Go to File Manager
2. Create folder: `public_html/api`
3. Upload these files:
   - `index.js`
   - `package.json`
   - `models/Contact.js`
   - `.env` (see below)

#### Step 3: Create `.env` File

Create `.env` in the backend root directory with:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<host>/<dbname>
PORT=5000
NODE_ENV=production
```

**Note:** Replace with your actual MongoDB Atlas connection string

#### Step 4: Install Dependencies

In Application Manager, run:
```bash
npm install
```

Or via SSH:
```bash
cd ~/public_html/api
npm install
```

#### Step 5: Start the Application

In Application Manager:
- Click "Start" or "Restart"
- Monitor logs for errors

---

## 🔧 Environment Variables to Set

### Frontend (.env.local in frontend root - if needed)
```
VITE_API_URL=https://yourdomain.com/api
```

### Backend (.env file)
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/sorazen
PORT=5000
NODE_ENV=production
```

---

## 🗄️ Database Setup

### MongoDB Atlas
1. Create free cluster at mongodb.com
2. Create database user
3. Get connection string: `mongodb+srv://user:password@...`
4. Add IP whitelist (allow all from GoDaddy)
5. Use this in `.env` file

---

## 📋 API Endpoints

- **POST** `/api/contact` - Submit contact form
  - Required: `name`, `email`
  - Optional: `phone`, `service`, `budget`, `timeline`, `message`, `projectType`, `description`

---

## ✨ Phone Feature Configured

The "Start a Conversation" button now calls: **+91 9353227875**
- Uses `tel:` protocol
- Works on mobile devices

---

## 🐛 Troubleshooting

### Frontend Not Loading
- Check `.htaccess` file exists
- Verify files uploaded to `public_html`
- Clear browser cache
- Check console for 404 errors

### API Not Responding
- Verify backend is running in Application Manager
- Check MongoDB connection string
- Review backend logs
- Ensure CORS is enabled

### MongoDB Connection Failed
- Verify connection string in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure database user has permission

### Port Already in Use
- Change PORT in `.env` to different port
- Restart application

---

## 📞 Important Contacts

**SoraZen Support:** +91 9353227875
**MongoDB Support:** mongodb.com/support
**GoDaddy Support:** godaddy.com/help

---

## ✅ Final Checklist Before Going Live

- [ ] Frontend builds without errors
- [ ] Backend dependencies installed
- [ ] `.env` file configured with real values
- [ ] MongoDB Atlas connection working
- [ ] Frontend uploaded to `public_html`
- [ ] `.htaccess` file added
- [ ] Backend running in Application Manager
- [ ] API responding from `/api/contact`
- [ ] Phone number link working
- [ ] Domain DNS pointing to GoDaddy

---

**Project Status:** Ready for Deployment ✅
**Last Updated:** April 13, 2026
