"use client";
import { useState, useEffect } from "react";
import { IftahQuestionApi } from "@/lib/api";
import { 
  FaQuestionCircle, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaWhatsapp, 
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaDownload
} from "react-icons/fa";

interface IftahQuestion {
  id: string;
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  question: string;
  status: 'pending' | 'answered' | 'rejected';
  created_at: string;
  updated_at?: string;
  answer?: string;
  answered_by?: string;
}

export default function IftahDashboard() {
  const [questions, setQuestions] = useState<IftahQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState<IftahQuestion | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'answered' | 'rejected'>('all');
  const [showModal, setShowModal] = useState(false);
  const [answer, setAnswer] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      
      // Try to load from API first
      try {
        const response = await IftahQuestionApi.getAll();
        if (response.success && response.data) {
          setQuestions(response.data);
          return;
        }
      } catch (apiError) {
        console.log('API failed, trying localStorage...');
      }
      
      // If API fails, load from localStorage
      try {
        const localQuestions = JSON.parse(localStorage.getItem('iftah-questions') || '[]');
        if (localQuestions.length > 0) {
          setQuestions(localQuestions);
          console.log('📱 Loaded questions from localStorage:', localQuestions.length);
        } else {
          console.log('📱 No questions found in localStorage');
        }
      } catch (storageError) {
        console.error('Error loading from localStorage:', storageError);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'pending' | 'answered' | 'rejected') => {
    try {
      setUpdating(true);
      
      // Try API first
      try {
        const response = await IftahQuestionApi.updateStatus(id, status);
        if (response.success) {
          setQuestions(prev => 
            prev.map(q => q.id === id ? { ...q, status } : q)
          );
          if (selectedQuestion?.id === id) {
            setSelectedQuestion(prev => prev ? { ...prev, status } : null);
          }
          return;
        }
      } catch (apiError) {
        console.log('API update failed, updating localStorage...');
      }
      
      // Update localStorage
      const localQuestions = JSON.parse(localStorage.getItem('iftah-questions') || '[]');
      const updatedQuestions = localQuestions.map((q: any) => 
        q.id === id ? { ...q, status, updated_at: new Date().toISOString() } : q
      );
      localStorage.setItem('iftah-questions', JSON.stringify(updatedQuestions));
      
      // Update state
      setQuestions(prev => 
        prev.map(q => q.id === id ? { ...q, status } : q)
      );
      if (selectedQuestion?.id === id) {
        setSelectedQuestion(prev => prev ? { ...prev, status } : null);
      }
      
      console.log('📱 Status updated in localStorage');
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    
    try {
      // Try API first
      try {
        const response = await IftahQuestionApi.delete(id);
        if (response.success) {
          setQuestions(prev => prev.filter(q => q.id !== id));
          if (selectedQuestion?.id === id) {
            setSelectedQuestion(null);
            setShowModal(false);
          }
          return;
        }
      } catch (apiError) {
        console.log('API delete failed, updating localStorage...');
      }
      
      // Update localStorage
      const localQuestions = JSON.parse(localStorage.getItem('iftah-questions') || '[]');
      const updatedQuestions = localQuestions.filter((q: any) => q.id !== id);
      localStorage.setItem('iftah-questions', JSON.stringify(updatedQuestions));
      
      // Update state
      setQuestions(prev => prev.filter(q => q.id !== id));
      if (selectedQuestion?.id === id) {
        setSelectedQuestion(null);
        setShowModal(false);
      }
      
      console.log('📱 Question deleted from localStorage');
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || question.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'answered': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <FaClock className="text-yellow-600" />;
      case 'answered': return <FaCheckCircle className="text-green-600" />;
      case 'rejected': return <FaTimes className="text-red-600" />;
      default: return <FaQuestionCircle className="text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FaQuestionCircle className="text-amber-500" />
                Iftah Questions Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage and respond to Islamic questions</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={loadQuestions}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
              >
                Refresh
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                <FaDownload />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions, names, or emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none appearance-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="answered">Answered</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Questions</p>
                <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
              </div>
              <FaQuestionCircle className="text-amber-500 text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{questions.filter(q => q.status === 'pending').length}</p>
              </div>
              <FaClock className="text-yellow-500 text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Answered</p>
                <p className="text-2xl font-bold text-green-600">{questions.filter(q => q.status === 'answered').length}</p>
              </div>
              <FaCheckCircle className="text-green-500 text-2xl" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{questions.filter(q => q.status === 'rejected').length}</p>
              </div>
              <FaTimes className="text-red-500 text-2xl" />
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {question.question}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">by {question.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{question.email}</p>
                        {question.phone && (
                          <p className="text-gray-500">{question.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(question.status)}`}>
                        {getStatusIcon(question.status)}
                        {question.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(question.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedQuestion(question);
                            setShowModal(true);
                          }}
                          className="text-amber-600 hover:text-amber-700 p-1"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(question.id, 'answered')}
                          className="text-green-600 hover:text-green-700 p-1"
                          title="Mark as Answered"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(question.id, 'rejected')}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Reject"
                        >
                          <FaTimes />
                        </button>
                        <button
                          onClick={() => handleDelete(question.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Question Detail Modal */}
        {showModal && selectedQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Question Details</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Question Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Question</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedQuestion.question}</p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FaUser className="text-amber-500" />
                      Contact Information
                    </h4>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedQuestion.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedQuestion.email}</p>
                      {selectedQuestion.phone && (
                        <p><span className="font-medium">Phone:</span> {selectedQuestion.phone}</p>
                      )}
                      {selectedQuestion.whatsapp && (
                        <p><span className="font-medium">WhatsApp:</span> {selectedQuestion.whatsapp}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Status & Date</h4>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Status:</span> 
                        <span className={`ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedQuestion.status)}`}>
                          {getStatusIcon(selectedQuestion.status)}
                          {selectedQuestion.status}
                        </span>
                      </p>
                      <p><span className="font-medium">Submitted:</span> {new Date(selectedQuestion.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Answer Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Answer</h4>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write your answer here..."
                    className="w-full border border-gray-300 rounded-lg p-4 min-h-[150px] focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleStatusUpdate(selectedQuestion.id, 'answered')}
                      disabled={updating}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      <FaCheckCircle />
                      Mark as Answered
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedQuestion.id, 'rejected')}
                      disabled={updating}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      <FaTimes />
                      Reject
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
