import { useState } from "react";


export default function Register() {
  const [formData, setFormData] = useState({
    role: "Student",
    name: "",
    phone: "",
    email: "",
    password: "",
    otp: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetOtp = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      alert("OTP sent to " + formData.phone);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
    alert("Signup successful!");
  };

  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full  bg-gray-50 shadow-xl rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-gradient-to-b">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Already have an account?</h2>
            <p className="">
              Sign in to access your personalized dashboard and continue your journey with us.
            </p>
          </div>
          
          <button className="bg-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 transform hover:-translate-y-1">
            LOGIN NOW
          </button>

          <div className="mt-10">
            <img
              src="\public\privacy.png"
              alt="privacy"
              className="w-100 mx-auto"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-500">Join our community and get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                <option>Student</option>
                <option>SAG</option>
                <option>Finance</option>
              </select>
            </div>

            {/* Full Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="+91 Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* OTP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={handleGetOtp}
                  disabled={isLoading || !formData.phone}
                  className={`px-5 py-3 rounded-lg font-medium ${isLoading || !formData.phone ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'} transition-colors duration-300 whitespace-nowrap`}
                >
                  {isLoading ? 'Sending...' : (otpSent ? 'Resend OTP' : 'GET OTP')}
                </button>
              </div>
              {otpSent && (
                <p className="text-sm text-green-600 mt-1">OTP sent successfully!</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-purple-600 hover:underline">Terms and Conditions</a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 mt-2"
            >
              CREATE ACCOUNT
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account? <a href="#" className="font-medium text-purple-600 hover:text-purple-500">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}