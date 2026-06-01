# MediCall Survey

A clean, fast, and professional survey web app for MediCall built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Landing Page**: With big scannable QR code linking to the survey
- **Survey Page**: Toggle between "I am a Patient" and "I am a Doctor" sections
- **10 Questions**: 5 for patients, 5 for doctors
- **Form Validation**: React Hook Form + Zod
- **Google Sheets Integration**: Automatically saves responses (via webhook)
- **Success Screen**: "Thank you" message after submission
- **Mobile-Friendly**: Responsive design for all devices

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- QRCode.react
- Lucide Icons
- clsx + tailwind-merge

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Copy `.env.example` to `.env.local` and add your Google Sheets webhook URL.

```bash
cp .env.example .env.local
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Google Sheets Integration

1. **Option 1: SheetDB** - Easy and straightforward
   - Go to [sheetdb.io](https://sheetdb.io/)
   - Connect your Google Sheet
   - Get the API URL and add it to `GOOGLE_SHEETS_WEBHOOK_URL` in `.env.local`

2. **Option 2: Make.com** - More powerful and customizable
   - Create a scenario with "Webhook" trigger
   - Add a "Google Sheets" module to add rows
   - Copy the webhook URL to your `.env.local`

3. **Option 3: Zapier** - Similar to Make.com
   - Create a Zap with "Webhook" trigger
   - Add "Google Sheets" action to create a new row
   - Use the webhook URL in your environment variables

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
