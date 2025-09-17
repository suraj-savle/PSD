import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FilePlus,
  CheckCircle,
  Receipt,
  User,
  LogOut,
  Home,
  Menu,
  X,
  Bell,
  ChevronDown,
  Award,
  AlertCircle,
  RefreshCw,
  Search,
  Settings,
  BookOpen,
  Calendar,
  BarChart3,
  HelpCircle,
  Mail,
  Shield
} from "lucide-react";
import { useState, useEffect } from "react";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Skip backend call for now, use mock data
    setIsLoading(true);
    setTimeout(() => {
      setStudent({
        username: "Student User",
        email: "student@example.com"
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const navItems = [
    { title: "Dashboard", icon: <Home size={20} />, path: "/student" },
    {
      title: "Apply Scheme",
      icon: <FilePlus size={20} />,
      path: "/student/apply",
    },
    {
      title: "Check Status",
      icon: <CheckCircle size={20} />,
      path: "/student/status",
    },
    {
      title: "Transactions",
      icon: <Receipt size={20} />,
      path: "/student/transactions",
    },
    { title: "My Courses", icon: <BookOpen size={20} />, path: "/student/courses" },
    { title: "Schedule", icon: <Calendar size={20} />, path: "/student/schedule" },
    { title: "Profile", icon: <User size={20} />, path: "/student/profile" },
    { title: "Settings", icon: <Settings size={20} />, path: "/student/settings" },
  ];

  const notifications = [
    {
      id: 1,
      text: "Your scholarship application is under review",
      time: "2 hours ago",
      read: false,
      type: "info"
    },
    {
      id: 2,
      text: "New scholarship scheme announced for Engineering students",
      time: "1 day ago",
      read: true,
      type: "announcement"
    },
    {
      id: 3,
      text: "Document verification completed successfully",
      time: "3 days ago",
      read: true,
      type: "success"
    },
    {
      id: 4,
      text: "Payment processed for October stipend",
      time: "5 days ago",
      read: true,
      type: "payment"
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    setError("");
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setUserDropdownOpen(false);
      setNotificationsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-white/20">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Connection Error
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-30 w-80 bg-white/90 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col p-6 border-r border-white/20
      `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
              <Award size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PMSSS
              </h1>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          </div>
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100/50 transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* User profile summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 mb-8 border border-blue-100/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
              {student?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-gray-800 truncate">
                {student?.username || "User"}
              </p>
              <p className="text-sm text-gray-600">Student</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 truncate" title={student?.email}>
            {student?.email || "No email available"}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
            >
              <span className="transition-colors">{item.icon}</span>
              <span className="font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 mt-4"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-white/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100/50 transition-colors"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu size={20} className="text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
              <h2 className="text-3xl font-bold mb-2">Welcome back, {student?.username}!</h2>
              <p className="text-blue-100">Here's your scholarship dashboard overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Applications</p>
                    <p className="text-2xl font-bold text-gray-800">3</p>
                  </div>
                  <FilePlus className="text-blue-600" size={24} />
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Approved</p>
                    <p className="text-2xl font-bold text-green-600">2</p>
                  </div>
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Amount</p>
                    <p className="text-2xl font-bold text-indigo-600">₹50,000</p>
                  </div>
                  <Receipt className="text-indigo-600" size={24} />
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Profile</p>
                    <p className="text-2xl font-bold text-purple-600">85%</p>
                  </div>
                  <User className="text-purple-600" size={24} />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <CheckCircle className="text-green-600" size={20} />
                  <div>
                    <p className="font-medium text-gray-800">Application Approved</p>
                    <p className="text-sm text-gray-600">Your PMSSS application has been approved</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl">
                  <AlertCircle className="text-yellow-600" size={20} />
                  <div>
                    <p className="font-medium text-gray-800">Document Verification</p>
                    <p className="text-sm text-gray-600">Please upload your latest marksheet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}ocation.pathname === item.path
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-white/80 hover:shadow-md"
                }`}
            >
              <div className={`${location.pathname === item.path ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Support & Logout */}
        <div className="pt-6 mt-auto space-y-3 border-t border-gray-200/50">
          <Link
            to="/student/support"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100/50 rounded-xl transition-colors"
          >
            <HelpCircle size={20} />
            <span className="font-medium">Help & Support</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50/50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-0 min-h-screen overflow-hidden">
        {/* Top header bar */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm z-10 sticky top-0">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100/50 transition-colors"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu size={24} className="text-gray-600" />
              </button>
              
              {/* Search Bar */}
              <div className="relative hidden md:block">
               
              </div>
            </div>

            <div className="flex items-center gap-5">
              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2.5 rounded-xl hover:bg-gray-100/50 relative transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationsOpen(!notificationsOpen);
                    setUserDropdownOpen(false);
                  }}
                  aria-label="Notifications"
                >
                  <Bell size={22} className="text-gray-600" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-200/50">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100/50 last:border-0 hover:bg-gray-50/50 cursor-pointer transition-colors ${
                              !notification.read ? "bg-blue-50/50" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'payment' ? 'bg-green-500' :
                                'bg-blue-500'
                              }`}></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  {notification.text}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">No notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200/50 bg-gray-50/50">
                      <Link
                        to="/student/notifications"
                        className="block text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100/50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserDropdownOpen(!userDropdownOpen);
                    setNotificationsOpen(false);
                  }}
                  aria-label="User menu"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                    {student?.username?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-800">
                      {student?.username || "User"}
                    </p>
                    <p className="text-xs text-gray-500">Student</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-200/50">
                      <p className="font-semibold text-gray-800">
                        {student?.username || "User"}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {student?.email || "user@example.com"}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/student/profile"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100/50 transition-colors text-sm"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <User size={18} className="text-gray-500" />
                        Your Profile
                      </Link>
                      <Link
                        to="/student/settings"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100/50 transition-colors text-sm"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Settings size={18} className="text-gray-500" />
                        Settings
                      </Link>
                    </div>
                    <div className="p-2 border-t border-gray-200/50">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-red-50/50 transition-colors text-sm text-red-600"
                      >
                        <LogOut size={18} />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Error banner */}
        {error && (
          <div className="mx-6 mt-6 bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 p-4 rounded-xl shadow-sm">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <button
                onClick={handleRetry}
                className="ml-3 p-1.5 text-red-700 hover:text-red-900 rounded-lg hover:bg-red-100/50 transition-colors"
                aria-label="Retry"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Page content */}
        <div className="flex-1 overflow-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 min-h-[calc(100vh-12rem)]">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-lg border-t border-white/20 py-4 px-6 text-center text-sm text-gray-600">
          <div className="max-w-6xl mx-auto">
            <p>© {new Date().getFullYear()} PMSSS Portal. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-2">
              <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}