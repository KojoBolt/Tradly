import React, { useState, useEffect } from 'react';
import { FaGoogle, FaGithub, FaFacebook, FaArrowLeft, FaArrowRight, FaEye, FaEyeSlash } from 'https://esm.sh/react-icons/fa';
import { FiCode } from 'https://esm.sh/react-icons/fi';
import { 
    getAuth,
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    GithubAuthProvider, 
    FacebookAuthProvider,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence
} from 'firebase/auth';

// A simple star SVG component for the decorative element
const Starburst = () => (
  <svg viewBox="0 0 100 100" className="absolute -bottom-10 -right-10 w-72 h-72 text-blue-500/30" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="starburst-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{ stopColor: 'rgba(120, 80, 228, 0.5)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'rgba(120, 80, 228, 0)', stopOpacity: 1 }} />
      </radialGradient>
    </defs>
    <g transform="translate(50,50)">
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="0"
          x2="50"
          y2="0"
          stroke="url(#starburst-gradient)"
          strokeWidth="3"
          transform={`rotate(${i * 30})`}
        />
      ))}
    </g>
  </svg>
);


// Component for the social login buttons
const SocialButton = ({ icon, label, onClick }) => {
  const Icon = icon;
  return (
    <button type="button" onClick={onClick} aria-label={label} className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
      <Icon size={24} />
    </button>
  );
};


// The main component that clones the UI
const Login = () => {
  const auth = getAuth(); // Initialize Firebase Auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize providers
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Load saved login preferences on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedKeepLoggedIn = localStorage.getItem('keepLoggedIn') === 'true';
    
    if (savedEmail) {
      setEmail(savedEmail);
    }
    if (savedKeepLoggedIn) {
      setKeepLoggedIn(savedKeepLoggedIn);
    }
  }, []);

  // Save login preferences to localStorage
  const saveLoginPreferences = (userEmail, keepLogin) => {
    if (keepLogin) {
      localStorage.setItem('savedEmail', userEmail);
      localStorage.setItem('keepLoggedIn', 'true');
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('keepLoggedIn');
    }
  };

  // Email and Password Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Set persistence based on "Keep me logged in" checkbox
      await setPersistence(auth, keepLoggedIn ? browserLocalPersistence : browserSessionPersistence);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Save login preferences
      saveLoginPreferences(email, keepLoggedIn);
      
      // Handle successful login
      console.log('Login successful:', userCredential.user);
      alert(`Welcome back, ${userCredential.user.displayName || userCredential.user.email}!`);
    } catch (err) {
      // Handle errors
      const errorCode = err.code;
      if (errorCode === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (errorCode === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (errorCode === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (errorCode === 'auth/user-disabled') {
        setError('This account has been disabled.');
      } else {
        setError(err.message);
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Social Sign-in Handler
  const handleSocialSignIn = async (provider) => {
    setLoading(true);
    setError('');
    try {
      // Set persistence based on "Keep me logged in" checkbox
      await setPersistence(auth, keepLoggedIn ? browserLocalPersistence : browserSessionPersistence);
      
      const result = await signInWithPopup(auth, provider);
      
      // Save login preferences
      saveLoginPreferences(result.user.email, keepLoggedIn);
      
      // Handle successful sign-in
      console.log('Social sign-in successful:', result.user);
      alert(`Welcome back, ${result.user.displayName}!`);
    } catch (err) {
      // Handle errors
      setError(err.message);
      console.error('Social sign-in error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1e012f] via-[#2c003f] to-[#3a014a] p-4 text-white font-sans">
      <main className="w-full max-w-6xl flex flex-col lg:flex-row bg-black/20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10">

        {/* Left Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <FiCode size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-400 mb-8">Please Enter your Account details</p>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 rounded-full border border-transparent focus:border-gray-500 px-5 py-3 text-white outline-none transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 rounded-full border border-transparent focus:border-gray-500 px-5 py-3 text-white outline-none transition-all pr-12"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                {/* Interactive checkbox for "Keep me logged in" */}
                <div className="relative">
                  <input 
                    type="checkbox"
                    id="keep-logged-in"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="sr-only"
                  />
                  <div 
                    onClick={() => setKeepLoggedIn(!keepLoggedIn)}
                    className={`w-4 h-4 rounded-sm border-2 cursor-pointer transition-all ${
                      keepLoggedIn 
                        ? 'bg-pink-500 border-pink-500' 
                        : 'bg-gray-600 border-gray-500 hover:border-gray-400'
                    }`}
                  >
                    {keepLoggedIn && (
                      <svg className="w-3 h-3 text-white absolute top-0 left-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <label htmlFor="keep-logged-in" className="text-gray-300 cursor-pointer" onClick={() => setKeepLoggedIn(!keepLoggedIn)}>Keep me logged in</label>
              </div>
              <a href="#" className="font-medium text-gray-300 hover:text-white transition-colors">Forgot Password</a>
            </div>

            <button type="button" onClick={handleLogin} disabled={loading} className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <SocialButton icon={FaGoogle} label="Sign in with Google" onClick={() => handleSocialSignIn(googleProvider)} />
            <SocialButton icon={FaGithub} label="Sign in with GitHub" onClick={() => handleSocialSignIn(githubProvider)} />
            <SocialButton icon={FaFacebook} label="Sign in with Facebook" onClick={() => handleSocialSignIn(facebookProvider)} />
          </div>
        </div>


        {/* Right Side: Testimonial Section */}
        <div className="clip-custom relative w-full lg:w-1/2 p-8 sm:p-12 bg-black/30 lg:flex flex-col justify-center items-start hidden">
          <Starburst />

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">What's our Jobseekers Said.</h2>
            <div className="text-7xl font-serif text-white/20 absolute -top-8 left-0">"</div>
            <p className="text-gray-300 leading-relaxed text-lg">
              "Search and find your dream job is now easier than ever. Just browse a job and apply if you need to."
            </p>
            <div className="mt-8">
              <p className="font-semibold text-lg">Mas Parjono</p>
              <p className="text-gray-400">UI Designer at Google</p>
            </div>
            <div className="flex gap-4 mt-8">
              <button className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaArrowLeft />
              </button>
              <button className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="absolute -bottom-5 right-12 z-10 w-80 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">
            <h3 className="font-semibold mb-2">Get your right job and right place apply now</h3>
            <p className="text-sm text-gray-300 mb-4">Be among the first founders to experience the easiest way to start run a business.</p>
            <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-[#1e012f]" src="https://i.pravatar.cc/40?img=1" alt="User 1" />
                <img className="w-10 h-10 rounded-full border-2 border-[#1e012f]" src="https://i.pravatar.cc/40?img=2" alt="User 2" />
                <img className="w-10 h-10 rounded-full border-2 border-[#1e012f]" src="https://i.pravatar.cc/40?img=3" alt="User 3" />
                <img className="w-10 h-10 rounded-full border-2 border-[#1e012f]" src="https://i.pravatar.cc/40?img=4" alt="User 4" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Login;