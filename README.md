# Voice Notes App

A real-time voice notes application built with Next.js, Firebase, and Deepgram.

## Features

- 🎙️ Real-time voice recording and transcription
- 📝 Instant text transcription using Deepgram AI
- 🔥 Firebase authentication and data storage
- 🎨 Clean and modern UI with Tailwind CSS
- 📱 Responsive design
- 🔒 Secure user data management

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Firebase (Authentication, Firestore)
- Deepgram API for voice transcription
- Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   DEEPGRAM_API_KEY=
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Sign in with your Google account
2. Click the microphone button to start recording
3. Speak into your microphone
4. Click the stop button when finished
5. Your voice note will be automatically transcribed and saved
6. View all your notes in the list below
7. Delete notes using the trash icon

## License

MIT