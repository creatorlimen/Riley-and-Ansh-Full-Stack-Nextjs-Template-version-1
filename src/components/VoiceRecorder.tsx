'use client';

import { useState, useEffect } from 'react';
import { useDeepgram, SOCKET_STATES } from '@/lib/contexts/DeepgramContext';
import { useAuth } from '@/lib/hooks/useAuth';
import { addDocument } from '@/lib/firebase/firebaseUtils';
import { VoiceNote } from '@/types/VoiceNote';
import { Timestamp } from 'firebase/firestore';

export default function VoiceRecorder() {
  const { connectToDeepgram, disconnectFromDeepgram, connectionState, realtimeTranscript, error } = useDeepgram();
  const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = async () => {
    if (!isRecording) {
      await connectToDeepgram();
      setIsRecording(true);
    } else {
      disconnectFromDeepgram();
      setIsRecording(false);
      
      // Save the note if there's any transcript
      if (realtimeTranscript.trim() && user) {
        const note: VoiceNote = {
          text: realtimeTranscript.trim(),
          createdAt: Timestamp.now(),
          userId: user.uid
        };
        await addDocument('voiceNotes', note);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6">
      {error && (
        <div className="text-red-500 bg-red-100 p-3 rounded-lg">
          {error}
        </div>
      )}
      
      <button
        onClick={toggleRecording}
        disabled={!user}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isRecording ? (
          <StopIcon className="w-10 h-10 text-white" />
        ) : (
          <MicrophoneIcon className="w-10 h-10 text-white" />
        )}
      </button>

      {isRecording && (
        <div className="relative w-64 h-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <WaveformAnimation />
          </div>
        </div>
      )}

      {realtimeTranscript && (
        <div className="w-full max-w-2xl bg-white p-4 rounded-lg shadow">
          <p className="text-gray-700">{realtimeTranscript}</p>
        </div>
      )}

      {!user && (
        <p className="text-gray-500">Please sign in to record voice notes</p>
      )}
    </div>
  );
}

function MicrophoneIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  );
}

function StopIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
    </svg>
  );
}

function WaveformAnimation() {
  return (
    <div className="flex items-center justify-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-blue-500 animate-pulse"
          style={{
            height: `${Math.random() * 40 + 10}px`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}