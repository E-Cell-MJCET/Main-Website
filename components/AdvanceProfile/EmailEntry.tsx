/* eslint-disable no-unused-vars */
"use client";
import React, { useState } from 'react';

import { supabase } from '@/utils/supabase';

const emails = [
  "anzar6673@gmail.com",
  "mabwaali@gmail.com",
  "airaqureshi174@gmail.com",
  "mohiuddghouse@gmail.com",
  "syedsarfarazali382@gmail.com",
  "srehman081@gmail.com",
  "abfarhan14@gmail.com",
  "maimoonakhatoon413@gmail.com"
];

const insertEmails = async () => {
  const emailObjects = emails.map(email => ({ email }));

  const { data, error } = await supabase
    .from('PermittedMembers')
    .insert(emailObjects);

  if (error) {
    console.error('Error inserting emails:', error.message);
  } else {
    console.log('Successfully inserted emails:', data);
  }
};

// insertEmails();

const EmailEntry: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setMessageType(null);

    if (!email) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      setLoading(false);
      
return;
    }

    try {
      const { error } = await supabase
        .from('PermittedMembers')
        .insert([{ email }]);

      if (error) {
        setMessage(`Error: ${error.message}`);
        setMessageType('error');
      } else {
        setMessage('Email successfully added!');
        setMessageType('success');
        setEmail('');
      }
    } catch (err:any) {
      setMessage('An unexpected error occurred. Please try again.');
      setMessageType('error');
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Add Permitted Email</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@domain.com"
                className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                loading ? 'cursor-not-allowed opacity-70' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="mr-2 size-4 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Add Email'
              )}
            </button>
          </div>
        </form>
        {message && (
          <div
            className={`mt-4 rounded-md p-4 ${
              messageType === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            <div className="flex">
              <div className="shrink-0">
                {messageType === 'success' ? (
                  <svg className="size-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="size-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm">{message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailEntry;