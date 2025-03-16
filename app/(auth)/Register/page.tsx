/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";

import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
// import { Navbar } from "@/components/Navbar";
import ToastMessage from "@/components/ui/ToastMessage"; // Import your ToastMessage component

// import Footer from "@/components/Footer";

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const Page: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [nextId, setNextId] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const addToast = (message: string, type: 'success' | 'error') => {
    const newToast = { id: nextId, message, type };
    setToasts((prev) => [...prev, newToast]);
    setNextId((prev) => prev + 1);

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      removeToast(newToast.id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const onSignup = async () => {
    try {
      setLoading(true);
    //   await axios.post("/api/users/signup", user);
      addToast("Sign up successful! An email has been sent to verify your account.", 'success');
      
      const login_user = async () => {
        try {
        //   const response = await axios.post("/api/users/login", user);
        //   console.log(response);
          router.push('/verifyemail');
        } catch (error: any) {
          console.log("Login Failed ", error.message);
          addToast(error.message, 'error');
        }
      };
      setTimeout(login_user, 3000); // Delay login after signup success
    } catch (error: any) {
      console.log("Sign Up failed ", error.message);
      addToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 py-8 shadow-2xl">
        {/* <Navbar /> */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 flex min-h-screen w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-gray-900 bg-opacity-70 px-4 py-6 shadow-2xl backdrop-blur-xl sm:px-8"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl"
          >
            Create Account
          </motion.h2>
          <div className="w-full p-4 sm:p-8">
            <form onSubmit={(e) => { e.preventDefault(); onSignup(); }}>
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label 
                  htmlFor="username" 
                  className={`flex items-center text-white transition-all duration-300 ${focusedField === 'username' ? 'text-blue-400' : ''}`}
                  onClick={() => document.getElementById('username')?.focus()}
                >
                  <FaUser className={`mr-2 transition-all duration-300 ${focusedField === 'username' ? 'text-blue-400' : ''}`} />
                  Username
                </label>
                <div className={`mt-2 overflow-hidden rounded-lg transition-all duration-300 ${focusedField === 'username' ? 'shadow-[0_0_10px_2px_rgba(56,189,248,0.6)]' : 'shadow-md'}`}>
                  <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                    className="w-full bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none"
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </motion.div>
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label 
                  htmlFor="email" 
                  className={`flex items-center text-white transition-all duration-300 ${focusedField === 'email' ? 'text-purple-400' : ''}`}
                  onClick={() => document.getElementById('email')?.focus()}
                >
                  <FaEnvelope className={`mr-2 transition-all duration-300 ${focusedField === 'email' ? 'text-purple-400' : ''}`} />
                  Email
                </label>
                <div className={`mt-2 overflow-hidden rounded-lg transition-all duration-300 ${focusedField === 'email' ? 'shadow-[0_0_10px_2px_rgba(167,139,250,0.6)]' : 'shadow-md'}`}>
                  <input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </motion.div>
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <label 
                  htmlFor="password" 
                  className={`flex items-center text-white transition-all duration-300 ${focusedField === 'password' ? 'text-red-400' : ''}`}
                  onClick={() => document.getElementById('password')?.focus()}
                >
                  <FaLock className={`mr-2 transition-all duration-300 ${focusedField === 'password' ? 'text-red-400' : ''}`} />
                  Password
                </label>
                <div className={`mt-2 overflow-hidden rounded-lg transition-all duration-300 ${focusedField === 'password' ? 'shadow-[0_0_10px_2px_rgba(248,113,113,0.6)]' : 'shadow-md'}`}>
                  <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none"
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <PasswordStrengthMeter password={user.password} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <motion.button
                  className={`relative mt-6 w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-bold text-white shadow-lg 
                    transition duration-300 hover:from-blue-700 hover:to-purple-700 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 
                    focus:ring-offset-2 focus:ring-offset-gray-900 ${buttonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                  onClick={onSignup}
                  disabled={buttonDisabled || loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10">
                    {loading ? <FaSpinner className="mx-auto animate-spin" size={24} /> : "Sign Up"}
                  </span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 opacity-0 transition-opacity duration-300"
                    whileHover={{ opacity: 0.6 }}
                  />
                </motion.button>
              </motion.div>
            </form>
            {/* Add terms and conditions text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 text-center text-sm text-gray-400"
            >
              By signing up, you agree with our{" "}
              <Link href="/Terms-And-Conditions" target="_blank" className="text-blue-400 transition-colors duration-300 hover:text-purple-400 hover:underline">
                terms and conditions
              </Link>.
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-4 flex w-full justify-center bg-gray-900 bg-opacity-70 px-8 py-4"
          >
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href={'/login'} className='relative text-blue-400 transition-all duration-300 hover:text-purple-400 hover:underline'>
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
      {/* <Footer /> */}
      <div className="fixed right-0 top-0 z-50 p-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <ToastMessage message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Page;