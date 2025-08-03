'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <section className="relative w-screen min-h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-indigo-200 to-indigo-500 p-6">
      
      {/* Blurry glowing background elements */}
      <motion.div
        className="absolute w-72 h-72 bg-indigo-400 rounded-full opacity-30 blur-3xl top-20 left-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-400 rounded-full opacity-20 blur-2xl bottom-10 right-20"
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Glassmorphic content card */}
      <motion.div
        className="z-10 backdrop-blur-xl bg-white/30 border border-white/40 rounded-2xl shadow-2xl p-10 max-w-xl text-center"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-5xl font-extrabold text-indigo-900 mb-6 drop-shadow">
          Welcome to <span className="text-indigo-700">Akil</span>
        </h1>
        <p className="text-lg text-gray-800 mb-8">
          Discover opportunities and unlock your potential.
        </p>
        
        {status === 'loading' ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-800"></div>
          </div>
        ) : session ? (
          // Authenticated user
          <div className="space-y-4">
            <p className="text-indigo-700 font-medium">
              Welcome back, {session.user?.name || 'User'}! 👋
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/opportunities">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-indigo-800 hover:bg-indigo-900 text-white font-semibold text-lg rounded-xl transition duration-300 shadow-md"
                >
                  Browse Opportunities
                </motion.button>
              </Link>
              <Link href="/bookmarks">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-indigo-800 border-2 border-indigo-800 font-semibold text-lg rounded-xl transition duration-300 shadow-md"
                >
                  My Bookmarks
                </motion.button>
              </Link>
            </div>
          </div>
        ) : (
          // Unauthenticated user
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              Sign in to bookmark opportunities and track your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/api/auth/signin">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-indigo-800 hover:bg-indigo-900 text-white font-semibold text-lg rounded-xl transition duration-300 shadow-md"
                  data-id="signin-btn"
                >
                  Sign In
                </motion.button>
              </Link>
              <Link href="/api/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-indigo-800 border-2 border-indigo-800 font-semibold text-lg rounded-xl transition duration-300 shadow-md"
                  data-id="signup-btn"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
            <div className="mt-4">
              <Link href="/opportunities">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-indigo-700 hover:text-indigo-900 font-medium text-sm underline"
            data-id="get-started-btn"
          >
                  Continue without signing in
          </motion.button>
        </Link>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
