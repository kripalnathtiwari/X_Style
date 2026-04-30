"use client";

import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        login(data.data.user, data.data.token);
        router.push("/");
      } else {
        setError(data.message || "Failed to register");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
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
        setError(data.message || "Google registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred with Google registration");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-black text-center mb-8 text-[#0f172a]">Create an Account</h2>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm font-bold text-center">{error}</div>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required 
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required 
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 mt-2 bg-[#0f172a] hover:bg-gray-800 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 font-bold uppercase text-[10px]">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <GoogleLogin 
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google Sign Up Failed")}
          />
        </div>

        <p className="text-center text-sm text-gray-500 font-medium">
          Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
