import React, { useEffect } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import type { Job } from '@/types/job';

interface JobSearchResultsProps {
  query: string;
  onClose: () => void;
  apiData: any;
  isLoading?: boolean;
}

const JobSearchResults = ({ query, onClose, apiData, isLoading = false }: JobSearchResultsProps) => {
  useEffect(() => {
    console.log("JobSearchResults mounted with apiData:", apiData);
  }, [apiData]);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-zinc-800 rounded-xl p-6 mt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Results for "{query}"</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-400">Loading job results...</p>
        </div>
      </div>
    );
  }

  if (!apiData || !apiData.jobs || apiData.jobs.length === 0) {
    console.log("No job data available");
    return (
      <div className="w-full max-w-4xl mx-auto bg-zinc-800 rounded-xl p-6 mt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Results for "{query}"</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-400">No job listings found. Try a different search.</p>
        </div>
      </div>
    );
  }

  console.log("Rendering job results:", apiData.jobs);

  return (
    <div className="w-full max-w-4xl mx-auto overflow-scroll h-screen bg-zinc-800 rounded-xl p-6 mt-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Results for "{query}"</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        {apiData.jobs.map((job: Job) => (
          <div key={job.id} className="bg-zinc-700 rounded-lg p-4 hover:bg-zinc-600 transition-colors">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium text-white">{job.title}</h3>
              <span className="text-[#53ffe9] font-medium">{job.job_salary}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm mt-1">
              <div className="flex items-center">
                {job.company.company_logo && (
                  <img 
                    src={job.company.company_logo} 
                    alt={`${job.company.company_name} logo`}
                    className="w-6 h-6 rounded-full object-cover mr-2"
                  />
                )}
                <span>{job.company.company_name}</span>
              </div>
              <span className="mx-2">•</span>
              <span>{job.job_location}</span>
              {job.job_type && <span className="ml-2 px-2 py-0.5 bg-zinc-600 rounded text-xs">{job.job_type}</span>}
            </div>
            
            <p className="text-gray-400 text-sm mt-2 line-clamp-2">{job.job_description}</p>

            {/* Match Analysis Section */}
            {job.match_analysis && typeof job.match_analysis.match_percentage === 'number' ? (
              <div className="mt-4 bg-zinc-800/50 rounded-lg p-4 ">
                {/* Match Score Circle */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          className="text-zinc-700"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - job.match_analysis.match_percentage / 100)}`}
                          className="text-[#53ffe9]"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-[#53ffe9]">
                          {job.match_analysis.match_percentage}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Match Score</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-400 mr-2">Experience Match</span>
                        {job.match_analysis.experience_match ? 
                          <CheckCircle className="text-green-500" size={16} /> : 
                          <XCircle className="text-red-500" size={16} />
                        }
                      </div>
                    </div>
                  </div>
                </div>
                {/* Skills Analysis */}
                <div className="space-y-3">
                  <div className="bg-zinc-700/50 rounded-lg p-3">
                    <h5 className="text-sm font-medium text-white mb-2">Skills Match</h5>
                    <div className="flex flex-wrap gap-2">
                      {job.match_analysis.matched_skills.map((skill: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center"
                        >
                          <CheckCircle size={12} className="mr-1" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-zinc-700/50 rounded-lg p-3">
                    <h5 className="text-sm font-medium text-white mb-2">Missing Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {job.match_analysis.missing_skills.map((skill: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs flex items-center"
                        >
                          <XCircle size={12} className="mr-1" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-zinc-700/50 rounded-lg p-3">
                    <h5 className="text-sm font-medium text-white mb-2">Analysis</h5>
                    <p className="text-sm text-gray-400">{job.match_analysis.analysis}</p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex justify-end items-center mt-3">
              <a 
                href={job.job_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 cursor-pointer bg-[#53ffe9] text-zinc-900 rounded-lg text-sm font-medium hover:bg-[#3dffb3] transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearchResults;