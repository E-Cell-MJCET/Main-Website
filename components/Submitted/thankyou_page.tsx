import React from 'react';
import { CheckCircle } from 'lucide-react';

function EP_Success() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="text-center">
        <div className="mb-8 animate-bounce">
          <CheckCircle className="mx-auto size-24 text-green-500" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Thank You for Submitting!</h1>
        <p className="text-lg text-gray-600">Your registration has been successfully received.</p>
      </div>
    </div>
  );
}

export default EP_Success;