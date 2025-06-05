import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import Signals from '../assets/images/signals.jpg';
import Trayd from '../assets/images/Trayd.png';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.includes('@')) newErrors.email = 'Enter a valid email';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, { displayName: form.name });

      // Redirect with success message
      navigate('/', {
        state: {
          success: 'You have successfully registered to Traydly',
        },
      });
    } catch (error) {
      setErrors({ firebase: error.message });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard', {
        state: {
          success: 'You have successfully registered to Traydly',
        },
      });
    } catch (error) {
      setErrors({ firebase: error.message });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4 md:p-10 mt-[40px] sm:mt-[0] md:mt-0 lg:mt-0">
        <div className="w-full max-w-md">
          <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 flex justify-center items-center">
            <img src={Trayd} alt="Tradly-logo" className="w-[150px] md:w-[200px]" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Sign up</h2>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Already have an account? <a href="/login" className="text-green-700">Sign in</a>
          </p>

          {errors.firebase && (
            <div className="bg-red-500 text-white text-sm md:text-base p-2 rounded mb-4">
              {errors.firebase}
            </div>
          )}

          <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                placeholder="Enter Your Full Name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
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
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                placeholder="Create Your Password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
                placeholder="Confirm Your Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-green-800 text-white p-2 rounded hover:bg-green-900 text-sm md:text-base cursor-pointer"
            >
              Sign up
            </button>
          </form>

          <div className="text-center my-3 md:my-4 text-gray-600 text-sm md:text-base">OR</div>
          <button
            onClick={handleGoogleSignUp}
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

export default Signup;
