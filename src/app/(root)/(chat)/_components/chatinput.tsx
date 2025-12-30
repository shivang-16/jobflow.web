import React, { useState, useRef, useEffect } from 'react';
import TypewriterPlaceholder from './typewriter';
import { Upload, Stars, Loader2, MoveUp } from 'lucide-react';
import { getUser } from '@/actions/user_actions';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { userData } from '@/redux/slices/userSlice';
import toast from 'react-hot-toast';

const ChatInput = ({ isLoggedIn, onSubmit, setShowResumePopup }: { 
  isLoggedIn: boolean;
  onSubmit?: (query: string) => void;
  setShowResumePopup?: any; // New prop for first signup callback
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const QUERY_LIMIT = 2;
  const STORAGE_KEY = 'userQueryCount';

  const placeholders = [
    "Let me Help you with your job search!",
    "Remote full-stack developer jobs.",
    "AI/ML engineer openings worldwide.",
    "Blockchain developer roles hiring now.",
    "Cybersecurity analyst job listings.",
    "Cloud engineer positions available today.",
    "Type something amazing..."
  ];

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
        setIsLoading(true);
        try {
          const res = await axios.post(
            "/api/google/auth",
            {
              access_token: credentialResponse.access_token,
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          if (res.status === 200) {
            dispatch(userData(res.data.user));
            toast.success("Login success");
            
            console.log(res, "here is ther eponse ")
            // Check if this is a first-time signup
            const isNewUser = res.data.newUser || false;
            console.log(isNewUser, "herer")
            
            // If this is a first-time signup and the callback exists, trigger it
            if (isNewUser && setShowResumePopup) {
              // Small delay to ensure the login success message is seen first
              setTimeout(() => {
                setShowResumePopup(true);
              }, 1000);
            }
          } else {
            toast.error("Error: Login Failed");
          }
        } catch (error: any) {
          console.error("Axios error:", error);
          toast.error("Google login failed!");
        } finally {
          setIsLoading(false);
        }
      },
      onError: (error: any) => {
        console.error("Google login error:", error);
        toast.error("Google login failed!");
      },
  });

  // Fixed handleKeyDown to properly handle contentEditable div
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  // Add a more reliable way to track input content
  useEffect(() => {
    // Initialize the ref with the current input value if needed
    if (inputRef.current && inputValue) {
      inputRef.current.textContent = inputValue;
    }
  }, []);

  // Simplified input handling with textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsTyping(newValue.length > 0);
    console.log("Input updated with textarea:", newValue);
  };

  // Function to handle both Enter key and button click
  const handleSubmit = () => {
    console.log("Submit function called");
    
    if (isLoading) {
      return;
    }
    
    if (!isLoggedIn) {
      setIsLoading(true);
      login();
    } else {
      // Get input text directly from state
      const inputText = inputValue.trim();
      
      console.log("Input text from state:", inputValue);
      console.log("Final input text:", inputText);
      
      if (onSubmit && inputText) {
        console.log("Calling onSubmit with:", inputText);
        onSubmit(inputText);
        
        // Clear input after submission
        setInputValue('');
        setIsTyping(false);
      } else {
        if (!onSubmit) console.log("onSubmit function is not provided");
        if (!inputText) console.log("Input text is empty");
      }
    }
  };

  // Handle form submission - make sure this is properly preventing default
  const handleFormSubmit = (e: React.FormEvent) => {
    console.log("Form submit event triggered");
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="flex flex-col items-center justify-center text-white p-4 overflow-hidden">
      <div className="w-full mx-auto z-10 px-4 animate-fade-in">
        {/* Form Container */}
        <form onSubmit={handleFormSubmit} className="w-full">
          <div className="relative shadow-sm bg-[hsla(0,0%,60%,0.12)] backdrop-blur rounded-[20px] p-4 transition-all duration-300">
            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
              <svg className="absolute bottom-0 rounded-[20px] right-0 w-full h-full">
                <defs>
                  <linearGradient id="line-gradient" x1="50%" y1="70%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#53ffe9d9" stopOpacity="0%" />
                    <stop offset="40%" stopColor="#53ffe9d9" stopOpacity="60%" />
                    <stop offset="50%" stopColor="#53ffe9d9" stopOpacity="80%" />
                    <stop offset="100%" stopColor="#53ffe9d9" stopOpacity="0%" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="transparent" stroke="url(#line-gradient)" strokeWidth="1" rx="8" />
              </svg>
            </div>

            {/* Combined input and placeholder container */}
            <div className="relative min-h-[40px]">
              {/* Only show placeholder when not typing */}
              {!isTyping && !inputValue && (
                <div className="absolute inset-0 py-2 pointer-events-none">
                  <TypewriterPlaceholder 
                    placeholders={placeholders}
                    className="text-md sm:text-lg"
                    cursorClassName="bg-[#53ffe9d9]"
                  />
                </div>
              )}
              
              {/* Textarea input instead of contentEditable div */}
              <textarea 
                className="min-h-[40px] py-2 text-md sm:text-lg outline-none w-full bg-transparent resize-none overflow-hidden"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(inputValue.length > 0)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                style={{ caretColor: "#53ffe9d9" }}
                placeholder=""
                rows={1}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between text-sm pt-2">
              <div className="flex gap-2 items-center">
              </div>
              <button
                className="px-4 py-1 text-gray-700 font-medium rounded-md hover:bg-[#53ffe9] transition-colors"
                type="button"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <MoveUp className="w-6 h-6"/>}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Background gradient */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-[#53ffe930] rounded-full filter blur-[100px] opacity-30"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-[#53ffe930] rounded-full filter blur-[100px] opacity-20"></div>
      </div>
    </div>
  );
};

export default ChatInput;