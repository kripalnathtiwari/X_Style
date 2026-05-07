"use client";

import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, Sparkles, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  // ... (rest of the logic remains the same)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        login(data.data.user, data.data.token);
        router.push("/");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        login(data.data.user, data.data.token);
        router.push("/");
      } else {
        setError(data.message || "Google login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred with Google login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px] opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.1)] border border-white/40 p-10 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
             <Sparkles className="w-5 h-5 text-blue-200" />
          </div>

          {/* Logo & Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
              <h1 className="text-3xl font-black tracking-tighter">
                <span className="text-blue-600">X</span><span className="text-[#000000]">Style</span>
              </h1>
            </Link>
            <h2 className="text-[1.75rem] font-black text-[#000000] tracking-tight leading-tight">Welcome Back</h2>
            <p className="text-gray-500 text-sm font-bold mt-2">Enter your details to access your elite curation</p>
          </div>
          
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-[13px] font-bold text-center flex items-center justify-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-5 mb-8">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-black uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-black placeholder:font-medium"
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-[10px] font-black text-black uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400 placeholder:font-medium"
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4.5 mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>SIGN IN <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <span className="relative px-4 bg-white text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Social Access</span>
          </div>

          <div className="flex justify-center mb-10 scale-105">
            <GoogleLogin 
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Login Failed")}
              theme="outline"
              shape="pill"
              size="large"
              width="100%"
            />
          </div>

          <div className="text-center">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Don't have an account? <Link href="/register" className="text-blue-600 font-black hover:text-blue-700 transition-colors ml-1">CREATE ONE</Link>
            </p>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]"
        >
          XSTYLE ELITE CURATION &copy; 2026
        </motion.p>
      </motion.div>
    </div>
  );
}

