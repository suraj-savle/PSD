import { useState } from "react";

export default function Login() {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");

  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captcha) {
      setError("Invalid captcha. Please try again.");
      setCaptcha(generateCaptcha()); // reset captcha
      setCaptchaInput("");
      return;
    }
    setError("");
    alert("Login successful ✅ (captcha verified)");
    // here you would call backend API
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          PMSSS Scholarship Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username / Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username / Email
            </label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username or email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Captcha */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Captcha Verification
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 text-xl font-mono tracking-widest px-4 py-2 rounded select-none">
                {captcha}
              </div>
              <button
                type="button"
                onClick={() => setCaptcha(generateCaptcha())}
                className="text-sm text-blue-600 hover:underline"
              >
                Refresh
              </button>
            </div>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              required
              placeholder="Enter captcha"
              className="mt-2 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
