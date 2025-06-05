import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import Trayd from '../assets/images/Trayd.png';
import Signals from '../assets/images/signals.jpg';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setForm(prev => ({ ...prev, email: savedEmail }));
    }
    document.getElementById('email')?.focus();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.email.includes('@')) newErrors.email = 'Enter a valid email';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    setErrors({ ...errors, [id]: '' });

    // Save only email to localStorage
    if (id === "email") {
      localStorage.setItem(id, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/', {
        state: {
          success: 'You have successfully logged in to Traydly',
        },
      });
    } catch (error) {
      setErrors({ firebase: 'Invalid email or password. Please try again.' });
      setForm(prev => ({ ...prev, password: '' }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/', {
        state: {
          success: 'You have successfully logged in to Traydly',
        },
      });
    } catch (error) {
      const message = error.message.includes("popup-closed")
        ? "Login popup was closed. Please try again."
        : "Google login failed. Try again later.";
      setErrors({ firebase: message });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4 md:p-10 mt-[40px] sm:mt-[0] md:mt-0 lg:mt-0">
        <div className="w-full max-w-md">
          <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 flex justify-center items-center">
            <img src={Trayd} alt="Traydly Logo" className="w-[150px] md:w-[200px]" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Login</h2>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Don’t have an account yet? <a href="/signup" className="text-green-700">Sign up</a>
          </p>

          {errors.firebase && (
            <div className="bg-red-500 text-white text-sm md:text-base p-2 rounded mb-4">
              {errors.firebase}
            </div>
          )}

          <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                placeholder="Enter Your Email Address"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full p-2 border border-gray-300 rounded text-sm md:text-base pr-10"
                  placeholder="Enter Your Password"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-800 text-white p-2 rounded hover:bg-green-900 text-sm md:text-base cursor-pointer"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <input type="checkbox" className="mr-2" defaultChecked /> Remember me
          </form>

          <div className="text-center my-3 md:my-4 text-gray-600 text-sm md:text-base">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 p-2 rounded flex items-center justify-center hover:bg-gray-100 text-sm md:text-base"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            Continue with Google
          </button>

          <button className="w-full bg-white border border-gray-300 text-gray-700 p-2 rounded flex items-center justify-center mt-2 hover:bg-gray-100 text-sm md:text-base">
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            Continue with Facebook
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-green-900 items-center justify-center p-4 md:p-10 relative sm:flex md:flex lg:flex hidden">
        <div className="w-full max-w-md text-white">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-900 bg-opacity-10 p-4 md:p-6 rounded-lg shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Reach financial goals faster</h3>
            <p className="text-gray-200 mb-2 md:mb-4 text-sm md:text-base">
              Get top-notch trading insights without spending a fortune. Traydly’s got exciting flexible plans to hook you up with premium perks.
            </p>
            <img src={Signals} alt="" className="rounded-2xl w-full md:w-auto" />
            <button className="bg-green-800 text-white p-2 rounded hover:bg-green-900 mt-2 text-sm md:text-base">
              Learn more
            </button>
          </div>
          <div className="mt-4 md:mt-6 text-center">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Introducing AI driven features</h3>
            <p className="text-gray-200 text-sm md:text-base">
              Instant AI-driven trade alerts that identify high-probability opportunities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
