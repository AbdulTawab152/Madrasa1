"use client";
import { useState, useEffect } from "react";
import { AwlyaaChartsApi } from "@/lib/api";
import { AwlyaaChart } from "@/lib/types";
import { FaUser, FaChevronDown, FaChevronUp, FaTimes, FaInfoCircle, FaCalendarAlt, FaIdCard, FaCrown, FaGraduationCap, FaExternalLinkAlt } from "react-icons/fa";
import { apiConfig } from "@/lib/config";
import { cleanText } from "@/lib/textUtils";

export default function AwlyaaChartsSection() {
  const [charts, setCharts] = useState<AwlyaaChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChart, setSelectedChart] = useState<AwlyaaChart | null>(null);
  const [expandedCharts, setExpandedCharts] = useState<Set<number>>(new Set());
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [dynamicBranches, setDynamicBranches] = useState<Map<number, AwlyaaChart[]>>(new Map());
  const [treeData, setTreeData] = useState<AwlyaaChart[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await AwlyaaChartsApi.getAll();
        
        if (!response.success) {
          throw new Error(response.error || 'Failed to load Awlyaa charts');
        }
        
        const chartsData = Array.isArray(response.data) ? response.data : [];
        setCharts(chartsData);
        
        // Build tree structure - find root nodes (those with no parents)
        const rootNodes = chartsData.filter(chart => 
          !chart.parents || chart.parents.length === 0
        );
        setTreeData(rootNodes);
        
        // Initialize all teachers as expanded by default
        const allTeacherIds = chartsData.map(chart => chart.id);
        setExpandedCharts(new Set(allTeacherIds));
      } catch (err) {
        console.error('Error fetching Awlyaa charts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load charts');
        setCharts([]);
        setTreeData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  const toggleExpanded = (chartId: number) => {
    const newExpanded = new Set(expandedCharts);
    if (newExpanded.has(chartId)) {
      newExpanded.delete(chartId);
    } else {
      newExpanded.add(chartId);
    }
    setExpandedCharts(newExpanded);
  };

  const handleTeacherClick = (teacherId: number) => {
    setSelectedTeacher(selectedTeacher === teacherId ? null : teacherId);
    const students = getStudents(teacherId);
    setDynamicBranches(prev => {
      const newMap = new Map(prev);
      if (selectedTeacher === teacherId) {
        newMap.delete(teacherId);
      } else {
        newMap.set(teacherId, students);
      }
      return newMap;
    });
  };

  const addDynamicBranch = (teacherId: number, student: AwlyaaChart) => {
    setDynamicBranches(prev => {
      const newMap = new Map(prev);
      const currentBranches = newMap.get(teacherId) || [];
      if (!currentBranches.find(s => s.id === student.id)) {
        newMap.set(teacherId, [...currentBranches, student]);
      }
      return newMap;
    });
  };

  const removeDynamicBranch = (teacherId: number, studentId: number) => {
    setDynamicBranches(prev => {
      const newMap = new Map(prev);
      const currentBranches = newMap.get(teacherId) || [];
      newMap.set(teacherId, currentBranches.filter(s => s.id !== studentId));
      return newMap;
    });
  };

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return '/placeholder-awlyaa.svg';
    return `${apiConfig.storageBaseUrl}/${imagePath}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Find all students of a given teacher
  const getStudents = (teacherId: number) => {
    return charts.filter(chart => 
      chart.parents && chart.parents.some(parent => parent.teacher_awlyaa_chart_id === teacherId)
    );
  };

  // Track visited nodes to prevent circular references
  const visitedNodes = new Set<number>();

  // Get paginated tree data
  const getPaginatedTreeData = () => {
    if (showAll) return treeData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return treeData.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(treeData.length / itemsPerPage);

  // Render a single node in the tree
  const renderTreeNode = (node: AwlyaaChart, level: number = 0, isLast: boolean = false, maxDepth: number = 5, visited: Set<number> = new Set()) => {
    // Prevent infinite recursion by limiting depth
    if (level > maxDepth) {
      return null;
    }

    // Prevent circular references
    if (visited.has(node.id)) {
      return null;
    }

    // Add current node to visited set
    const newVisited = new Set(visited);
    newVisited.add(node.id);

    const students = getStudents(node.id);
    const isRoot = level === 0;

    return (
      <div key={node.id} className="relative">
        {/* Node */}
        <div className={`flex justify-center ${level > 0 ? 'mt-4 sm:mt-6 md:mt-8 lg:mt-10' : 'mt-2 sm:mt-3 md:mt-4 lg:mt-6'}`}>
          <div className="relative group">
            {/* Connection line from parent */}
            {level > 0 && (
              <div className="absolute -top-6 sm:-top-8 md:-top-10 lg:-top-12 left-1/2 transform -translate-x-1/2 w-px h-6 sm:h-8 md:h-10 lg:h-12 bg-gray-400"></div>
            )}
            
            {/* Node Card - Full Size Image Design */}
            <div 
              className={`
                relative bg-white rounded-full shadow-md sm:shadow-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 sm:hover:scale-110 hover:shadow-lg sm:hover:shadow-xl overflow-hidden
                ${isRoot ? 'border-amber-400 shadow-amber-200' : 'border-blue-300 shadow-blue-200'}
                ${isRoot ? 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32' : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28'}
              `}
              onClick={() => {
                setSelectedChart(node);
              }}
            >
              {/* Full Size Profile Image */}
              <div className="w-full h-full">
                <img
                  src={getImageUrl(node.image)}
                  alt={node.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-awlyaa.svg';
                  }}
                />
              </div>
            </div>
            
            {/* Name Outside Card - Below */}
            <div className="text-center mt-2">
              <h3 className={`text-gray-800 font-bold ${isRoot ? 'text-xs sm:text-sm md:text-base lg:text-lg' : 'text-xs sm:text-sm md:text-base'} truncate max-w-full px-1`}>
                {cleanText(node.name)}
              </h3>
            </div>
          </div>
        </div>

        {/* Children/Students - Always Show All Students */}
        {students.length > 0 && (
          <div className="relative">
            {/* Vertical line from teacher to horizontal line */}
            <div className="absolute left-1/2 top-0 w-px bg-gray-400 transform -translate-x-1/2" 
                 style={{ height: `${Math.max(students.length * 30, 20)}px` }}></div>
            
            {/* Students layout - clean horizontal layout */}
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 justify-center max-w-full relative">
                {/* Horizontal connecting line across all students */}
                {students.length > 1 && (
                  <div className="absolute top-4 sm:top-5 md:top-6 lg:top-7 left-0 right-0 h-px bg-gray-400"></div>
                )}
                
                {students.map((student, index) => (
                  <div key={student.id} className="relative">
                    {/* Vertical line from horizontal line down to each student */}
                    <div className="absolute top-4 sm:top-5 md:top-6 lg:top-7 left-1/2 transform -translate-x-1/2 w-px h-4 sm:h-5 md:h-6 lg:h-7 bg-gray-400"></div>
                    {renderTreeNode(student, level + 1, index === students.length - 1, maxDepth, newVisited)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-600 font-medium text-lg">Loading Awlyaa Charts...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaInfoCircle className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Charts</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Tree Visualization */}
        <div className="p-2 sm:p-4 md:p-6 lg:p-8 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          {/* Tree Container */}
          <div className="w-full">
            {getPaginatedTreeData().length > 0 ? (
              <div className="flex justify-center">
                <div className="space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8">
                  {getPaginatedTreeData().map((rootNode) => {
                    try {
                      return renderTreeNode(rootNode, 0);
                    } catch (error) {
                      console.error('Error rendering tree node:', error);
                      return null;
                    }
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <FaUser className="text-amber-500 text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">No Master Teachers Found</h3>
                <p className="text-gray-500 max-w-lg mx-auto text-lg">No root teachers are available in the current data.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {treeData.length > itemsPerPage && !showAll && (
              <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-2 bg-amber-100 hover:bg-amber-200 disabled:bg-gray-100 disabled:text-gray-400 text-amber-700 font-semibold rounded-lg sm:rounded-xl transition-all duration-300 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    Previous
                  </button>
                  
                  <span className="px-3 sm:px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base">
                    {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 sm:px-4 py-2 bg-amber-100 hover:bg-amber-200 disabled:bg-gray-100 disabled:text-gray-400 text-amber-700 font-semibold rounded-lg sm:rounded-xl transition-all duration-300 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    Next
                  </button>
                </div>

                <button
                  onClick={() => setShowAll(true)}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center gap-2 text-sm sm:text-base"
                >
                  <FaUser className="text-base sm:text-lg" />
                  See All {treeData.length} Teachers
                </button>
              </div>
            )}

            {/* Show Less Button */}
            {showAll && (
              <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
                <button
                  onClick={() => {
                    setShowAll(false);
                    setCurrentPage(1);
                  }}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center gap-2 text-sm sm:text-base"
                >
                  <FaChevronUp className="text-base sm:text-lg" />
                  Show Less
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Detail Modal */}
        {selectedChart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] flex">
              {/* Fixed Left Sidebar - Teacher Image and Info */}
              <div className="w-80 bg-gray-50 rounded-l-2xl sm:rounded-l-3xl p-6 flex flex-col">
                {/* Teacher Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <FaUser className="text-white text-lg" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{cleanText(selectedChart.name)}</h2>
                      <p className="text-sm text-gray-600">ID: {cleanText(selectedChart.uniqu_id)}</p>
                    </div>
                  </div>
                </div>

                {/* Teacher Image */}
                <div className="relative mb-6">
                  <img
                    src={getImageUrl(selectedChart.image)}
                    alt={selectedChart.name}
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-awlyaa.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                </div>

                {/* Basic Information */}
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaIdCard className="text-amber-600" />
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Unique ID:</span>
                      <span className="text-gray-900 text-sm">{cleanText(selectedChart.uniqu_id)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Created:</span>
                      <span className="text-gray-900 text-sm">{formatDate(selectedChart.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Updated:</span>
                      <span className="text-gray-900 text-sm">{formatDate(selectedChart.updated_at)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Right Side - Relationships */}
              <div className="flex-1 flex flex-col">
                {/* Header with Close Button */}
                <div className="p-6 border-b border-gray-200 flex justify-end">
                  <button
                    onClick={() => setSelectedChart(null)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    {/* Teachers */}
                    {selectedChart.parents && selectedChart.parents.length > 0 && (
                      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <FaUser className="text-green-600" />
                          Teachers ({selectedChart.parents.length})
                        </h3>
                        <div className="space-y-4">
                          {selectedChart.parents.map((parent, index) => (
                            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
                              <h4 className="font-semibold text-gray-800 mb-2">{cleanText(parent.teacher_chart.name)}</h4>
                              <p className="text-sm text-gray-600 mb-2">ID: {cleanText(parent.teacher_chart.uniqu_id)}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FaCalendarAlt className="text-green-500" />
                                <span>Added: {formatDate(parent.created_at)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Students */}
                    {(() => {
                      const students = getStudents(selectedChart.id);
                      return students.length > 0 && (
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FaUser className="text-blue-600" />
                            Students ({students.length})
                          </h3>
                          <div className="space-y-2">
                            {students.map((student, index) => (
                              <div key={student.id} className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                                <h4 className="font-semibold text-gray-800 text-sm">{cleanText(student.name)}</h4>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* No Relationships Message */}
                    {(() => {
                      const students = getStudents(selectedChart.id);
                      return (!selectedChart.parents || selectedChart.parents.length === 0) && 
                             students.length === 0 && (
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                          <FaUser className="text-gray-400 text-3xl mx-auto mb-3" />
                          <p className="text-gray-600">No relationships recorded for this scholar.</p>
                        </div>
                      );
                    })()}

                    {/* See More Button */}
                    {selectedChart.awlyaa_id && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <FaExternalLinkAlt className="text-amber-600" />
                          Full Details
                        </h3>
                        <p className="text-gray-600 mb-4">
                          View complete information about this scholar including biography, achievements, and more.
                        </p>
                        <a
                          href={`/awlayaa/${selectedChart.awlyaa_id}`}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                        >
                          <FaExternalLinkAlt className="text-sm" />
                          View Full Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
