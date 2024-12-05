'use client'
import React from 'react';

import { ProfileForm } from '@/components/profileForm/ProfileForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="border-b border-gray-700 bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-3xl font-bold">Team Member Profile</h1>
        </div>
      </header>
      <main>
        <ProfileForm />
      </main>
    </div>
  );
}

export default App;