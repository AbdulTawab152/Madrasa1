"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, Award, ChevronDown, ChevronUp, FileText, Loader2 } from "lucide-react";

type Iftah = {
  id: number;
  tag_id: number;
  title: string;
  slug: string;
  question: string;
  answer: string;
  date: string;
  note?: string;
  mufti_id: number;
  is_published: boolean;
  attachment?: string;
  is_top?: boolean;
};

type Mufty = {
  id: number;
  full_name: string;
};

export default function IftahListPage() {
  const [iftahs, setIftahs] = useState<Iftah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [muftis, setMuftis] = useState<Record<number, string>>({});
  const [selectedMufti, setSelectedMufti] = useState<number | "">("");
  const [dateFilter, setDateFilter] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch iftahs
        const iftahRes = await fetch("https://lawngreen-dragonfly-304220.hostingersite.com/api/iftah");
        if (!iftahRes.ok) {
          throw new Error(`Failed to fetch iftahs: ${iftahRes.status} ${iftahRes.statusText}`);
        }
        const iftahData = await iftahRes.json();
        setIftahs(iftahData);

        // Fetch muftis
        const muftiRes = await fetch("https://lawngreen-dragonfly-304220.hostingersite.com/api/mufties");
        if (!muftiRes.ok) {
          throw new Error(`Failed to fetch muftis: ${muftiRes.status} ${muftiRes.statusText}`);
        }
        const muftiData = await muftiRes.json();

        console.log("Mufti Data:", muftiData); // Debug log

        const muftiMap = muftiData.reduce((acc: Record<number, string>, mufti: Mufty) => {
          acc[mufti.id] = mufti.full_name;
          return acc;
        }, {});

        setMuftis(muftiMap);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredIftahs = iftahs.filter(iftah => {
    const matchesSearch = iftah.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      iftah.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMufti = !selectedMufti || iftah.mufti_id === selectedMufti;
    const matchesDate = !dateFilter || new Date(iftah.date).toISOString().split('T')[0] === dateFilter;

    return matchesSearch && matchesMufti && matchesDate;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">We couldn't load the questions. Please try again later.</p>
          <p className="text-sm text-gray-500 mb-6">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Islamic Q&A</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Find answers to your religious questions from qualified scholars
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Award className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedMufti}
                onChange={(e) => setSelectedMufti(e.target.value ? Number(e.target.value) : "")}
              >
                <option value="">All Scholars</option>
                {Object.entries(muftis).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredIftahs.length > 0 ? (
            filteredIftahs.map((iftah) => (
              <div
                key={iftah.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <button
                  className="w-full text-left p-6 focus:outline-none"
                  onClick={() => toggleExpand(iftah.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {iftah.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center">
                          <Award className="h-4 w-4 mr-1 text-green-600" />
                          {muftis[iftah.mufti_id] || 'Unknown Scholar'}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                          {formatDate(iftah.date)}
                        </span>
                        {iftah.is_top && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {expandedId === iftah.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {expandedId === iftah.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    <div className="prose max-w-none text-gray-700 mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Question:</h4>
                      <p className="mb-4">{iftah.question}</p>

                      <h4 className="font-medium text-gray-900 mb-2">Answer:</h4>
                      <p className="whitespace-pre-line">{iftah.answer}</p>

                      {iftah.note && (
                        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                          <p className="text-sm text-yellow-700">
                            <strong>Note:</strong> {iftah.note}
                          </p>
                        </div>
                      )}

                      {iftah.attachment && (
                        <div className="mt-4">
                          <a
                            href={iftah.attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-green-600 hover:text-green-800"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Attachment
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        onClick={() => toggleExpand(iftah.id)}
                        className="text-sm font-medium text-green-600 hover:text-green-800"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-500">No questions found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMufti('');
                  setDateFilter('');
                }}
                className="mt-4 text-green-600 hover:text-green-800 text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
