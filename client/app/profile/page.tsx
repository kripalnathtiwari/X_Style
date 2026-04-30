"use client";

import { useAuth } from "@/lib/authContext";
import { Navbar } from "@/components/Navbar";
import { 
  ShoppingBag, 
  Heart, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Smile,
  ChevronRight,
  User as UserIcon
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Logged In</h2>
          <p className="text-gray-500">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans pb-20 relative">
      <Navbar />
      
      {/* Top Dark Background Area */}
      <div className="h-72 bg-gradient-to-r from-[#17182b] to-[#25284b] w-full absolute top-0 left-0 z-0 rounded-b-[3rem]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Column: User Info Card */}
          <div className="w-full md:w-80 shrink-0">
            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 flex flex-col items-center text-center mt-4">
              
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-[1.5rem] bg-[#cc4c29] text-white flex items-center justify-center text-5xl font-medium shadow-md">
                  {user.name ? user.name.charAt(0).toLowerCase() : user.email.charAt(0).toLowerCase()}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#2563eb] w-8 h-8 rounded-full border-[3px] border-white flex items-center justify-center cursor-pointer shadow-sm transition-transform hover:scale-105">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              
              <h1 className="text-xl font-black text-[#0f172a] mb-1 capitalize tracking-tight">
                {user.name || 'User'}
              </h1>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-8">
                Premium Member Since {new Date().getFullYear()}
              </p>

              {/* User Details */}
              <div className="w-full space-y-3">
                
                {/* Email */}
                <div className="bg-gray-50/80 rounded-2xl p-3.5 flex items-center gap-3.5 transition-colors hover:bg-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email Address</p>
                    <p className="text-xs font-bold text-gray-700 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-gray-50/80 rounded-2xl p-3.5 flex items-center gap-3.5 transition-colors hover:bg-gray-100">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Phone Number</p>
                    <p className="text-xs font-bold text-gray-700">Not provided</p>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-gray-50/80 rounded-2xl p-3.5 flex items-center gap-3.5 transition-colors hover:bg-gray-100">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Default Address</p>
                    <p className="text-xs font-bold text-gray-700">No address set</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Stats and Milestones */}
          <div className="flex-1 space-y-6">
            
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* Total Orders */}
              <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col justify-between h-[140px]">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-[#0f172a] mb-1">0</h2>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Orders</p>
                </div>
              </div>

              {/* Wishlist */}
              <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col justify-between h-[140px]">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <Heart className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-[#0f172a] mb-1">0</h2>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Wishlist</p>
                </div>
              </div>

              {/* Total Spent */}
              <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col justify-between h-[140px]">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <Award className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-[#0f172a] mb-1">₹0</h2>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Spent</p>
                </div>
              </div>

            </div>

            {/* Shopper Milestone Card */}
            <div className="bg-[#15192b] rounded-[2rem] p-8 shadow-[0_20px_40px_rgb(0,0,0,0.2)] relative overflow-hidden text-white">
              
              {/* Header */}
              <div className="flex justify-between items-start mb-10">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#2a2f45] flex items-center justify-center mb-4">
                    <Award className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-1 tracking-tight">Shopper Milestone</h3>
                  <p className="text-gray-400 text-xs">Earn exclusive rewards as you shop</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-1">Progress</p>
                  <p className="text-2xl font-black text-blue-400">0%</p>
                </div>
              </div>

              {/* Progress Bar Area */}
              <div className="mb-8">
                <div className="h-2.5 w-full bg-[#1e2338] rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-blue-500 rounded-full w-[0%]"></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <p>Current: ₹0</p>
                  <p>Target: ₹3000</p>
                </div>
              </div>

              {/* Nested Reward Card */}
              <div className="bg-[#21263c] rounded-[1.5rem] p-4 flex items-center justify-between mt-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[1rem] bg-[#2563eb] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                    <Smile className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-0.5">Free XStyle T-Shirt</h4>
                    <p className="text-[11px] text-gray-400">Automatically delivered when you hit ₹3000</p>
                  </div>
                </div>
                <button className="bg-white text-[#0f172a] px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-transform hover:scale-105 active:scale-95 shrink-0">
                  SHOP NOW
                </button>
              </div>

            </div>

            {/* Account Hub */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-6 ml-2">
                <h3 className="text-xl font-bold text-[#0f172a]">Account Hub</h3>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 cursor-pointer transition-transform hover:-translate-y-1">
                   <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                     <UserIcon className="w-5 h-5 text-gray-600" />
                   </div>
                   <div className="flex-1">
                     <h4 className="font-bold text-[#0f172a] text-sm mb-0.5">Personal Info</h4>
                     <p className="text-[11px] text-gray-500">Manage your details</p>
                   </div>
                 </div>
                 
                 <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 cursor-pointer transition-transform hover:-translate-y-1">
                   <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                     <MapPin className="w-5 h-5 text-gray-600" />
                   </div>
                   <div className="flex-1">
                     <h4 className="font-bold text-[#0f172a] text-sm mb-0.5">Saved Addresses</h4>
                     <p className="text-[11px] text-gray-500">Edit delivery locations</p>
                   </div>
                 </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
