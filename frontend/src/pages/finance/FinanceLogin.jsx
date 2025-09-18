import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Calculator, Shield, Eye, EyeOff } from "lucide-react";

export default function FinanceLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFinanceAdmin = (email, password) => {
    const adminCredentials = [
      {
        email: import.meta.env.VITE_FINANCE_ADMIN_1_EMAIL,
        password: import.meta.env.VITE_FINANCE_ADMIN_1_PASSWORD,
        name: "Finance Admin",
        role: "Finance Administrator"
      },
      {
        email: import.meta.env.VITE_FINANCE_ADMIN_2_EMAIL,
        password: import.meta.env.VITE_FINANCE_ADMIN_2_PASSWORD,
        name: "Finance Manager",
        role: "Finance Manager"
      },
      {
        email: import.meta.env.VITE_FINANCE_ADMIN_3_EMAIL,
        password: import.meta.env.VITE_FINANCE_ADMIN_3_PASSWORD,
        name: "Accounts Head",
        role: "Accounts Head"
      }
    ];

    return adminCredentials.find(admin => 
      admin.email === email && admin.password === password
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const validAdmin = validateFinanceAdmin(formData.email, formData.password);
      
      if (validAdmin) {
        // Store finance admin session
        localStorage.setItem('financeToken', 'finance_admin_token');
        localStorage.setItem('financeAdmin', JSON.stringify({
          email: validAdmin.email,
          name: validAdmin.name,
          role: validAdmin.role
        }));
        
        toast.success(`Welcome ${validAdmin.name}! Redirecting to Finance Dashboard...`);
        setTimeout(() => {
          navigate('/finance');
        }, 1500);
      } else {
        toast.error('Invalid credentials. Access denied to Finance Dashboard.');
      }
    } catch (error) {
      console.error('Finance login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      {/* Header */}
      <div className="absolute top-8 left-8">
        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all">
          PMSSS
        </Link>
      </div>
      
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-xl w-16 h-16 mx-auto mb-4">
            <Calculator size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Finance Portal
          </h2>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Shield size={16} />
            Authorized Access Only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50/50 hover:bg-white"
              placeholder="Enter your admin email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50/50 hover:bg-white"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Authenticating...
              </div>
            ) : (
              <>🔐 Access Finance Dashboard</>
            )}
          </button>
        </form>
        
        {/* Info */}
        <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
          <p className="text-sm text-indigo-700 text-center">
            <Shield size={16} className="inline mr-1" />
            This portal is restricted to authorized finance personnel only.
          </p>
        </div>
        
        {/* Back to main site */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors">
            ← Back to Main Site
          </Link>
        </div>
      </div>
      
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#374151',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb',
            padding: '16px 20px',
            fontSize: '16px',
            fontWeight: '500'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff'
            }
          }
        }}
      />
    </div>
  );
}