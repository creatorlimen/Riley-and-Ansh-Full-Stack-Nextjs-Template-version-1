"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { getDocuments, deleteDocument } from '@/lib/firebase/firebaseUtils';
import { VoiceNote } from '@/types/VoiceNote';

export default function VoiceNotesList() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<(VoiceNote & { id: string })[]>([]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    if (!user) return;
    
    try {
      const fetchedNotes = await getDocuments('voiceNotes');
      const userNotes = fetchedNotes
        .filter(note => note.userId === user.uid)
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      setNotes(userNotes as (VoiceNote & { id: string })[]);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDelete = async (noteId: string) => {
    try {
      await deleteDocument('voiceNotes', noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Voice Notes</h2>
      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center">No voice notes yet. Start recording!</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-700">{note.text}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(note.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="ml-4 text-red-500 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
} 