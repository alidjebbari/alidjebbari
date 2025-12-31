# 🚀 Ali Djebbari – Personal Portfolio

A clean, contemporary portfolio built with a refined design and a strong, dependable structure.


## Features

### Frontend
- 🌓 Dark and Light mode with persistent preference
- 📱 Fully responsive design (mobile-first)
- 🔍 Project filtering by technology
- 📊 Animated stat counters
- 🏥 BMI calculator tools
- 💱 Real-time currency converter
- 📧 Contact form & success feedback when completed

### Backend
- 📬 **Email notifications** - Submissions sent directly to my Email service
- 📑 **Google Sheets logging** - Track all contact submissions
- ✅ **Input validation** - Server-side security checks
- 🔒 **CORS support** - Cross-origin request handling
- ⚡ **Easy deployment** - Railway, Render, Heroku support

## 🚀 Quick Start

### Option 1: Frontend Only No Email
```bash
open index.html

npx serve
```

### Full Set up (Frontend + Backend)

**Step 1: Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with Gmail credentials (see setup guide)
npm run dev
```

**Step 2: Frontend (in another terminal)**
```bash
# Use any HTTP server
npx serve
```

Visit `http://localhost:3000` - contact form will now send emails!

**👉detailed setup instructions [SETUP_GUIDE**
## 📁 Project Structure

```
portfolio/
├── index.html                  # Main portfolio page
├── README.md                   # This file
├── SETUP_GUIDE.md              # Complete setup instructions
├── BACKEND_SETUP.md            # Backend-specific guide
│
├── assets/
│   ├── css/
│   │   └── custom.css          # Tailwind customizations
│   ├── js/
│   │   └── main.js             # Frontend logic & API integration
│   ├── docs/
│   │   └── Ali_Djebbari_Resume.pdf
│   └── img/                    # Portfolio images
│
└── backend/                    # Node.js Express server
    ├── server.js               # Main server
    ├── package.json            # Dependencies
    ├── .env.example            # Environment template
    ├── .gitignore
    └── README.md               # Backend docs
```

## 🔧 Configuration

### Frontend
- **API URL:** Edit in `assets/js/main.js` 
- **Styling:** Modify `assets/css/custom.css` or update Tailwind classes
- **Resume:** Replace `assets/docs/Ali_Djebbari_Resume.pdf`

### Backend
- **Email:** Set `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
- 
## 📬 How It Works

### Contact Form Submission
1. User fills form on portfolio
2. Frontend validates input
3. Sends POST to `http://localhost:3000/api/contact`
4. Backend validates again
5. Sends email to your inbox
6. Logs to Google Sheets (if configured)
7. Returns success response

### Currency Converter
- Uses free `exchangerate-api.com` tier
- Fetches live rates on each conversion
- Supports 160+ currencies

## 🚀 Deployment

### Deploy Backend to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Inside backend directory
railway login
railway init
railway up
```

### Deploy Backend to Render
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. New → Web Service
4. Connect GitHub repo
5. Add environment variables
6. Deploy

### Deploy Frontend to Netlify
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. New site → GitHub
4. Connect repo
5. Deploy

**Update `API_BASE_URL` in `assets/js/main.js` with your production backend URL**

## 🛠 Customization

### Update Content
Edit sections in `index.html`:
- `#about` - About section
- `#skills` - Skills grid
- `#courses` - Course spotlights
- `#experience` - Experience timeline
- `#projects` - Project cards
- `#tools` - Tools/skills
- `#lab` - Home lab section
- `#contact` - Contact form

### Update Email Recipient
1. Edit `backend/.env`
2. Change `RECIPIENT_EMAIL=your.email@gmail.com`
3. Restart backend

### Add Google Sheets Logging
1. Create Google Sheet with columns: `Name`, `Email`, `Message`, `Timestamp`
2. Get Sheet ID from URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/`
3. Create Service Account in Google Cloud Console
4. Share sheet with service account email
5. Add to `backend/.env`:
   ```
   GOOGLE_SHEET_ID=your_sheet_id
   GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
   ```

## 📊 What's Changed

From the previous version:
- ✅ **Removed FormSubmit** - Now uses your own backend
- ✅ **Live email notifications** - Emails go straight to your inbox
- ✅ **Data persistence** - Optional Google Sheets integration
- ✅ **Live currency rates** - Real API instead of static data
- ✅ **Better security** - Server-side validation
- ✅ **Professional structure** - Proper frontend/backend separation
- ✅ **Easy deployment** - Support for multiple platforms

## 🧪 Testing

### Test Backend Health
```bash
curl http://localhost:3000/health
# Response: {"status":"Backend is running"}
```

### Test Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }'
```

### Check Email
Submit form and check your inbox for the email notification.

### Check Google Sheets
If configured, new submissions will appear in your Google Sheet.

## ❓ Troubleshooting

**Frontend form not submitting?**
- Check backend is running: `curl http://localhost:3000/health`
- Check browser console for errors
- Verify API_BASE_URL in `main.js`

**Emails not received?**
- Use Gmail App Password, not your regular password
- Verify 2-Step Verification is enabled
- Check RECIPIENT_EMAIL in `.env`
- Check spam folder

**Google Sheets not updating?**
- Verify Service Account email has sheet access
- Check GOOGLE_SHEET_ID is correct
- Verify column names: Name, Email, Message, Timestamp

**CORS errors?**
- Update FRONTEND_URL in `backend/.env`
- Must match frontend URL exactly

## 📚 Full Guides

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup walkthrough
- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Backend-specific instructions
- **[backend/README.md](./backend/README.md)** - API documentation

## 🤝 Credits

Designed and built by **Ali Djebbari**. Enhanced with modern backend infrastructure for professional contact handling and data management.

---

**Ready to deploy?** Start with [SETUP_GUIDE.md](./SETUP_GUIDE.md) →
