import { Navbar } from "@/components/Navbar";
import { MapPin } from "lucide-react";

export default function AddressesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <MapPin className="w-6 h-6 text-[#0f172a]" />
            </div>
            <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Saved Addresses</h1>
          </div>
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No saved addresses</h2>
            <p className="text-gray-500 max-w-md mx-auto">You haven't saved any shipping addresses yet. Add one during checkout to save time on your next order.</p>
          </div>
        </div>
      </div>
    </>
  );
}
