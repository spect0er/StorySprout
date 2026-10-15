# 🚀 Deploying StorySprout to Vercel

This repository is fully configured for seamless one-click deployment on **Vercel**. Both the React (Vite) frontend and the Express backend (as Vercel Serverless Functions) can be hosted together in this single project.

---

## 📋 Deployment Options

### Option 1: Full-Stack Deployment on Vercel (Recommended)
Deploy everything (Frontend + Serverless API) in one Vercel project:
- **Build Output**: `dist` (Vite SPA)
- **API Serverless Handler**: `/api` (configured automatically via `vercel.json` and `api/index.js`)
- **No CORS issues**: Frontend and Backend share the same domain.

### Option 2: Split Deployment
If you prefer running your Express backend on **Render**, **Railway**, or **Fly.io**:
- Deploy this repository to Vercel as a Vite Frontend.
- In Vercel Environment Variables, set `VITE_API_BASE_URL=https://your-backend-api.onrender.com`.

---

## 🛠️ Step-by-Step Vercel Deployment Instructions

### 1. Push Your Code to GitHub
Ensure all latest changes are committed and pushed:
```bash
git add .
git commit -m "Configure project for Vercel deployment"
git push origin main
```

### 2. Import into Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Select your `StorySprout` repository.
4. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Configure Environment Variables
In the Vercel project configuration page (under **Environment Variables**), add the following keys from `.env.example`:

| Variable Name | Description | Example / Required? |
| --- | --- | --- |
| `MONGODB_URI` | MongoDB Atlas Connection String | `mongodb+srv://user:pass@cluster0...mongodb.net/StorySprout` |
| `JWT_SECRET` | Secret key for JWT signing | Any secure random string |
| `COHERE_API_KEY` | Cohere API Key for story generation | Required for story & excuse generation |
| `FIREBASE_PROJECT_ID` | Firebase Project ID | e.g. `storysprout-f8d5f` |
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin Service Account Email | e.g. `firebase-adminsdk-...@...iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin Private Key | Include the entire PEM key (with `BEGIN` and `END` headers) |
| `EMAIL_USER` | Gmail address for sending gift stories | (Optional) `your_email@gmail.com` |
| `EMAIL_PASS` | Gmail 16-character App Password | (Optional) App password from Google Account |
| `VITE_API_BASE_URL` | External API URL (if backend is on Render/Railway) | (Optional) Leave empty for Vercel Serverless API |

> 💡 **Tip for `FIREBASE_PRIVATE_KEY`**: If copying from JSON or `.env`, make sure to include the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines. The server automatically handles both literal newlines and `\n` escape sequences.

### 4. Deploy!
Click **Deploy**. Vercel will build your application and launch it with a live `*.vercel.app` URL.

---

## 🧪 Local Development

You can still develop locally without changing any settings:

1. **Start the Express backend**:
   ```bash
   npm run server
   # Server runs on http://localhost:8081
   ```

2. **Start the Vite frontend**:
   ```bash
   npm run dev
   # Vite dev server runs with automatic proxy from /api to http://localhost:8081
   ```
