'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SparklesIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
import toast from 'react-hot-toast';
import ChatInput from './chatinput';
import QueryLimitPopup from './QueryLimitPopup';
import ResumeUploadPopup from './ResumeUploadPopup';
import JobSearchResults from './job-result';
import { fetchJobs } from "@/actions/chat_actions";

const QUERY_LIMIT = 5678;
const STORAGE_KEY = 'userQueryCount';

const HeroSection = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showResumePopup, setShowResumePopup] = useState(false);
  const [jobApiData, setJobApiData] = useState<any>(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

  useEffect(() => {
    const storedCount = localStorage.getItem(STORAGE_KEY);
    if (storedCount) setQueryCount(parseInt(storedCount, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, queryCount.toString());
  }, [queryCount]);

  const handleCloseResults = () => {
    setShowResults(false);
    setQuery('');
    setJobApiData(null);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseResumePopup = () => {
    setShowResumePopup(false);
  };

  const handleChatSubmit = async (inputText: string) => {
    setQuery(inputText);
    setIsApiLoading(true);
    try {
      const data = await fetchJobs(inputText);
      setJobApiData(data);
    } catch (error) {
      console.error("Error fetching job data:", error);
      toast.error("Failed to fetch job results");
    } finally {
      setIsApiLoading(false);
      setShowResults(true);
    }

    setQueryCount(prev => {
      const newCount = prev + 1;
      if (newCount >= QUERY_LIMIT) setShowPopup(true);
      return newCount;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Light Rays */}
      <div 
        className="fixed inset-0 pointer-events-none select-none"
        style={{
          '--gradient-opacity': '.85',
          '--ray-gradient': 'radial-gradient(rgb(83 255 233 / 85%) 0%, rgba(43, 166, 255, 0) 100%)',
          transition: 'opacity 0.25s linear',
        } as React.CSSProperties}
      >
        {/* Light Ray 1 */}
        <div className="absolute rounded-full" style={{
          background: 'var(--ray-gradient)',
          width: '480px',
          height: '680px',
          transform: 'rotate(80deg)',
          top: '-540px',
          left: '250px',
          filter: 'blur(110px)'
        }} />
        {/* Light Ray 2 */}
        <div className="absolute rounded-full" style={{
          background: 'var(--ray-gradient)',
          width: '110px',
          height: '400px',
          transform: 'rotate(-20deg)',
          top: '-280px',
          left: '350px',
          mixBlendMode: 'overlay',
          opacity: '0.6',
          filter: 'blur(60px)'
        }} />
        {/* Light Ray 3 */}
        <div className="absolute rounded-full" style={{
          background: 'var(--ray-gradient)',
          width: '400px',
          height: '370px',
          transform: 'rotate(95deg)',
          top: '-350px',
          left: '200px',
          mixBlendMode: 'overlay',
          opacity: '0.6',
          filter: 'blur(21px)'
        }} />
        {/* Light Ray 4 */}
        <div className="absolute rounded-full" style={{
          background: 'var(--ray-gradient)',
          width: '330px',
          height: '370px',
          transform: 'rotate(75deg)',
          top: '-330px',
          left: '50px',
          mixBlendMode: 'overlay',
          opacity: '0.5',
          filter: 'blur(21px)'
        }} />
        {/* Light Ray 5 */}
        <div className="absolute rounded-full" style={{
          background: 'var(--ray-gradient)',
          width: '110px',
          height: '400px',
          transform: 'rotate(-40deg)',
          top: '-280px',
          left: '-10px',
          mixBlendMode: 'overlay',
          opacity: '0.8',
          filter: 'blur(60px)'
        }} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center text-center mt-2 px-4">
        {!showResults || queryCount >= QUERY_LIMIT ? (
          <>
            <div className="flex justify-center mt-4 mb-[10%]">
              <Button variant="outline" className="rounded-full bg-black/50 border-gray-700 hover:bg-black/70 text-white">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Introducing Chrome Extension for Contextual AutoFilling 
              </Button>
            </div>

            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Find and apply jobs in seconds.
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-2xl">
              Jobflow is your JobGpt. Start for free today.
            </p>
          </>
        ) : (
          <div className="w-full mb-8">
            <JobSearchResults 
              query={query} 
              onClose={handleCloseResults} 
              apiData={jobApiData}
              isLoading={isApiLoading}
            />
          </div>
        )}

        {/* Chat input always visible */}
        <div className='w-[70%]'>
          <ChatInput 
            isLoggedIn={isLoggedIn} 
            onSubmit={handleChatSubmit} 
            setShowResumePopup={setShowResumePopup}
          />
        </div>

        {/* Suggestions buttons shown only when no results */}
        {(!showResults || queryCount >= QUERY_LIMIT) && (
          <div className="flex gap-4 justify-center mt-4 mb-[10%]">
            {['Recharts dashboard', 'Habit tracker', 'Real estate listings', 'Developer portfolio'].map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="rounded-full !bg-black/50 !text-gray-500 border border-gray-700 hover:!bg-black/70 hover:!text-white transition-colors duration-200"
              >
                {item}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Popups */}
      {showPopup && <QueryLimitPopup onClose={handleClosePopup} />}
      {showResumePopup && <ResumeUploadPopup onClose={handleCloseResumePopup} />}

      {/* Loading overlay */}
      {isApiLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-xl flex items-center gap-3">
            <Loader2 className="animate-spin text-[#53ffe9]" />
            <span className="text-white">Searching for jobs...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
