# Backend Setup Guide

## Quick Start

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Set up environment variables:**
- Copy `.env.example` to `.env`
- Fill in your Gmail credentials and Google Sheets info

3. **Run the server:**
```bash
npm start           # Production
npm run dev         # Development with auto-reload
```

Server runs on `http://localhost:3000` by default.

---

## Configuration

### Email Setup (Gmail)
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Generate an **App Password** (16-character password)
4. Add to `.env`:
   ```
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   ```

### Google Sheets Setup (Optional - for data logging)
1. Create a Google Sheet with columns: `Name`, `Email`, `Message`, `Timestamp`
2. Create a Google Cloud Project and Service Account:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project
   - Enable Google Sheets API
   - Create Service Account (JSON key)
3. Share the Google Sheet with the service account email
4. Add to `.env`:
   ```
   GOOGLE_SHEET_ID=sheet_id_from_url
   GOOGLE_SERVICE_ACCOUNT_KEY='paste_entire_json_here'
   ```

---

## API Endpoints

### POST `/api/contact`
Accepts contact form submissions.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

### GET `/health`
Health check endpoint for monitoring.

---

## Production Deployment

### Using Railway.app (Recommended)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Using Render
1. Push code to GitHub
2. Create new Web Service on [Render](https://render.com)
3. Connect GitHub repo
4. Add environment variables
5. Deploy

### Using Vercel (Serverless)
Requires restructuring as serverless functions.

---

## Features

✅ **Email Notifications** - Sends to your inbox when form submitted  
✅ **Google Sheets Logging** - Auto-stores submissions in spreadsheet  
✅ **Input Validation** - Server-side validation for security  
✅ **CORS Support** - Works with frontend on different domain  
✅ **Error Handling** - Graceful error responses  
✅ **Environment Variables** - Secure credential management  

---

## Troubleshooting

**"Gmail authentication failed"**
- Verify 2-Step Verification is enabled
- Use 16-character App Password, not regular password

**"Google Sheets not updating"**
- Verify Service Account email is shared with Sheet
- Check GOOGLE_SHEET_ID is correct

**"Connection refused on port 3000"**
- Change PORT in .env
- Check no other service using port 3000
