"use client";

import { DeepgramContextProvider } from '@/lib/contexts/DeepgramContext';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import VoiceRecorder from '@/components/VoiceRecorder';
import VoiceNotesList from '@/components/VoiceNotesList';
import SignInButton from '@/components/SignInButton';

export default function Home() {
  return (
    <AuthProvider>
      <DeepgramContextProvider>
        <main className="min-h-screen bg-gray-50">
          <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Voice Notes App</h1>
            <SignInButton />
            <VoiceRecorder />
            <VoiceNotesList />
          </div>
        </main>
      </DeepgramContextProvider>
    </AuthProvider>
  );
}
