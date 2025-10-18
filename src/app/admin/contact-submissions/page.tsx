"use client";

import { useState, useEffect } from 'react';
import { ContactApi } from '@/lib/api';

interface ContactSubmission {
  id: number;
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  source: string;
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSubmissions = () => {
    const storedSubmissions = ContactApi.getStoredSubmissions();
    setSubmissions(storedSubmissions);
    setLoading(false);
  };

  useEffect(() => {
    loadSubmissions();
    
    // Auto-refresh every 5 seconds to catch new submissions
    const interval = setInterval(loadSubmissions, 5000);
    
    // Also listen for storage changes (when new submissions are added)
    const handleStorageChange = () => {
      loadSubmissions();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const refreshSubmissions = () => {
    setLoading(true);
    loadSubmissions();
  };

  const clearSubmissions = () => {
    ContactApi.clearStoredSubmissions();
    setSubmissions([]);
  };

  const exportSubmissions = () => {
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `contact-submissions-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Contact Form Submissions</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Total submissions: {submissions.length}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={refreshSubmissions}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Refresh
                    </>
                  )}
                </button>
                {submissions.length > 0 && (
                  <>
                    <button
                      onClick={exportSubmissions}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Export JSON
                    </button>
                    <button
                      onClick={clearSubmissions}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Clear All
                    </button>
                  </>
                )}
              </div>
            </div>

            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📭</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
                <p className="text-gray-500">Contact form submissions will appear here.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {submissions.map((submission) => (
                  <div key={submission.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{submission.name}</h3>
                        <p className="text-sm text-gray-500">{submission.email}</p>
                        {submission.phone && (
                          <p className="text-sm text-gray-500">{submission.phone}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {submission.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(submission.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-md p-4">
                      <p className="text-sm text-gray-700">{submission.message}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                      <span>ID: {submission.id}</span>
                      <span>Source: {submission.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
