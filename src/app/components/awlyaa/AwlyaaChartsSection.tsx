"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTimes, FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import { AwlyaaChartsApi } from "@/lib/api";
import { AwlyaaChart } from "@/lib/types";
import { apiConfig } from "@/lib/config";
import UnifiedLoader from "@/components/loading/UnifiedLoader";

export default function AwlyaaChartsSection() {
  const [charts, setCharts] = useState<AwlyaaChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<AwlyaaChart | null>(null);
  const [focusedNodeId, setFocusedNodeId] = useState<number | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<'tree' | 'focus'>('tree');

  // Fetch data from backend
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
        
        // Initialize with root nodes expanded
        const rootNodes = chartsData.filter(chart => 
          !chart.parents || chart.parents.length === 0
        );
        const rootIds = new Set(rootNodes.map(n => n.id));
        setExpandedNodes(rootIds);
      } catch (err) {
        console.error('Error fetching Awlyaa charts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load charts');
        setCharts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  // Helper functions
  const getDataById = (id: number): AwlyaaChart | undefined => {
    return charts.find(item => item.id === id);
  };

  const getStudents = (teacherId: number): AwlyaaChart[] => {
    return charts.filter(chart => 
      chart.parents && chart.parents.some(parent => parent.teacher_awlyaa_chart_id === teacherId)
    );
  };

  const getRootNodes = (): AwlyaaChart[] => {
    return charts.filter(item => !item.parents || item.parents.length === 0);
  };

  const isRootNode = (node: AwlyaaChart): boolean => {
    return !node.parents || node.parents.length === 0;
  };

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return '/placeholder-awlyaa.svg';
    return `${apiConfig.storageBaseUrl}/${imagePath}`;
  };

  // Toggle node expansion
  const toggleNode = (nodeId: number) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Focus on a specific node and show its chain
  const focusOnNode = (nodeId: number) => {
    setFocusedNodeId(nodeId);
    const node = getDataById(nodeId);
    if (node) {
      setSelectedNode(node);
      setViewMode('focus');
      
      // Expand path to this node
      const pathToRoot: number[] = [];
      let current: AwlyaaChart | undefined = node;
      while (current && current.parents && current.parents.length > 0) {
        const parentId = current.parents[0].teacher_awlyaa_chart_id;
        pathToRoot.push(parentId);
        current = getDataById(parentId);
      }
      setExpandedNodes(prev => {
        const newSet = new Set(prev);
        pathToRoot.forEach(id => newSet.add(id));
        newSet.add(nodeId);
        return newSet;
      });
    }
  };

  // Render a node with connections
  const renderNode = (node: AwlyaaChart, level: number = 0, isRootStudent: boolean = false) => {
    const students = getStudents(node.id);
    const isExpanded = expandedNodes.has(node.id);
    const isFocused = focusedNodeId === node.id;
    const isRoot = isRootNode(node);
    const teacher = node.parents && node.parents.length > 0 
      ? getDataById(node.parents[0].teacher_awlyaa_chart_id) 
      : null;

    // Only show links for:
    // 1. Root nodes themselves (isRoot = true)
    // 2. Root students (isRootStudent = true, meaning direct students of root nodes)
    // NOT for deeper levels (students of root students)
    const shouldShowLinks = isRoot || isRootStudent;

    return (
      <div key={node.id} className="relative flex flex-col items-center">
        {/* Connection line from teacher */}
        {teacher && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-t from-blue-400 to-transparent"></div>
        )}

        {/* Node Card */}
        <div 
          className={`
            relative group cursor-pointer transition-all duration-150
            ${isFocused ? 'scale-110 z-20' : 'hover:scale-105'}
            ${isRoot ? 'mb-4' : 'mb-2'}
          `}
          onClick={() => {
            setSelectedNode(node);
            focusOnNode(node.id);
          }}
        >
          {/* Avatar Circle */}
          <div
            className={`
              relative rounded-full overflow-hidden border-4 shadow-lg
              ${isFocused 
                ? 'border-amber-500 ring-4 ring-amber-200' 
                : isRoot 
                  ? 'border-amber-400' 
                  : 'border-blue-400'
              }
              ${isRoot ? 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32' : 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28'}
            `}
          >
            <div className="relative w-full h-full">
              <Image
                src={getImageUrl(node.image)}
                alt={node.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Overlay for focus */}
            {isFocused && (
              <div className="absolute inset-0 bg-amber-500/20"></div>
            )}
            
            {/* Star icon for root nodes */}
            {isRoot && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg z-10">
                <FaStar className="text-white text-xs" />
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mt-2 text-center max-w-[120px] sm:max-w-[140px] md:max-w-[160px]">
            <h3 className={`font-bold text-gray-800 truncate ${isRoot ? 'text-xs sm:text-sm md:text-base' : 'text-xs sm:text-sm'}`}>
              {node.name.split(' ').slice(0, 3).join(' ')}
            </h3>
            {node.name.split(' ').length > 3 && (
              <p className="text-xs text-gray-600 truncate">
                {node.name.split(' ').slice(3).join(' ')}
              </p>
            )}
          </div>

          {/* Expand/Collapse Button - Only show for root students */}
          {students.length > 0 && shouldShowLinks && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
              className={`
                absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center
                text-white text-xs font-bold shadow-md transition-all z-10
                ${isExpanded ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
              `}
            >
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          )}
        </div>

        {/* Students Container - Only show links for root students */}
        {isExpanded && students.length > 0 && shouldShowLinks && (
          <div className="relative mt-4">
            {/* Vertical line from teacher to children */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-blue-400"></div>
            
            {/* Horizontal line connecting all children */}
            {students.length > 1 && (
              <div 
                className="absolute top-4 left-0 right-0 h-0.5 bg-blue-400"
                style={{
                  left: `${50 - (students.length - 1) * 10}%`,
                  right: `${50 - (students.length - 1) * 10}%`,
                }}
              ></div>
            )}

            {/* Students Grid */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-4">
              {students.map((student) => {
                // Only pass isRootStudent=true if current node is root (level 0)
                // This means only root's direct students will have links
                // Their students (level 2+) will not have links (isRootStudent will be false)
                const nextIsRootStudent = isRoot && level === 0;
                return (
                  <div key={student.id} className="relative flex flex-col items-center">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-blue-400"></div>
                    {renderNode(student, level + 1, nextIsRootStudent)}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <UnifiedLoader variant="grid" count={6} className="pt-0" />;
  }

  if (error) {
    return (
      <div className="w-full py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTimes className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Charts</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const rootNodes = getRootNodes();
  const displayNodes = viewMode === 'focus' && focusedNodeId 
    ? [getDataById(focusedNodeId)!].filter(Boolean)
    : rootNodes;

  return (
    <div className="w-full py-4 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Controls */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setViewMode('tree');
                setFocusedNodeId(null);
                setSelectedNode(null);
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                viewMode === 'tree'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Full Tree
            </button>
            {focusedNodeId && (
              <button
                onClick={() => {
                  setViewMode('focus');
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  viewMode === 'focus'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Focused View
              </button>
            )}
          </div>
          {focusedNodeId && (
            <button
              onClick={() => {
                setViewMode('tree');
                setFocusedNodeId(null);
                setSelectedNode(null);
              }}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold text-sm"
            >
              Reset View
            </button>
          )}
        </div>

        {/* Scrollable Tree Container */}
        <div
          className="w-full overflow-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-12"
          style={{ 
            height: '70vh', 
            minHeight: '500px',
            direction: 'rtl'
          }}
        >
          <div className="flex justify-center min-w-max">
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
              {displayNodes.length > 0 ? (
                displayNodes.map((rootNode) => (
                  <div key={rootNode.id} className="flex flex-col items-center">
                    {renderNode(rootNode, 0, false)}
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">No root nodes found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Node Detail Modal */}
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedNode.name}</h2>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="relative w-full h-64">
                    <Image
                      src={getImageUrl(selectedNode.image)}
                      alt={selectedNode.name}
                      fill
                      className="object-cover rounded-xl shadow-lg"
                      unoptimized
                    />
                  </div>

                  {/* Information */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Unique ID</label>
                      <p className="text-gray-900">{selectedNode.uniqu_id}</p>
                    </div>
                    {selectedNode.parents && selectedNode.parents.length > 0 && (
                      <div>
                        <label className="text-sm font-semibold text-gray-600">استاد</label>
                        <button
                          onClick={() => {
                            const teacher = getDataById(selectedNode.parents![0].teacher_awlyaa_chart_id);
                            if (teacher) {
                              focusOnNode(teacher.id);
                              setSelectedNode(teacher);
                            }
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {selectedNode.parents[0].teacher_chart.name}
                        </button>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-semibold text-gray-600">شاګردان</label>
                      <p className="text-gray-900">{getStudents(selectedNode.id).length} تنه</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Created</label>
                      <p className="text-gray-900">{new Date(selectedNode.created_at).toLocaleDateString()}</p>
                    </div>
                    {isRootNode(selectedNode) && (
                      <div className="flex items-center gap-2 text-amber-600">
                        <FaStar />
                        <span className="text-sm font-semibold">Root Node (Master Teacher)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Students List - Only show for root nodes */}
                {isRootNode(selectedNode) && getStudents(selectedNode.id).length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">شاګردان</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {getStudents(selectedNode.id).map(student => (
                        <button
                          key={student.id}
                          onClick={() => {
                            setSelectedNode(student);
                            focusOnNode(student.id);
                          }}
                          className="p-3 bg-amber-50 hover:bg-amber-100 rounded-lg text-right transition-colors"
                        >
                          <p className="text-sm font-semibold text-gray-800">{student.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
