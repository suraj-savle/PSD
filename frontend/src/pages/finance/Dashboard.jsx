import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  DollarSign,
  Users,
  FileText,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
  Bell,
  ChevronDown,
  Award,
  AlertCircle,
  RefreshCw,
  BarChart3,
  TrendingUp,
  PieChart,
  Calculator
} from "lucide-react";
import { useState, useEffect } from "react";

export default function FinanceDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const financeToken = localStorage.getItem("financeToken");
  const financeAdmin = localStorage.getItem("financeAdmin");

  useEffect(() => {
    // Check if user is authenticated for finance dashboard
    if (!financeToken || !financeAdmin) {
      navigate('/login');
      return;
    }

    try {
      const adminData = JSON.parse(financeAdmin);
      setAdmin({
        username: adminData.name,
        email: adminData.email,
        role: adminData.role
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error parsing admin data:', error);
      localStorage.removeItem('financeToken');
      localStorage.removeItem('financeAdmin');
      navigate('/finance/login');
    }
  }, [navigate]);

  const navItems = [
    { title: "Dashboard", icon: <Home size={20} />, path: "/finance" },
    { title: "Approved Students", icon: <Users size={20} />, path: "/finance/approved" },
    { title: "Disbursements", icon: <DollarSign size={20} />, path: "/finance/disbursements" },
    { title: "Transactions", icon: <FileText size={20} />, path: "/finance/transactions" },
    { title: "Settings", icon: <Settings size={20} />, path: "/finance/settings" },
  ];

  const notifications = [
    {
      id: 1,
      text: "New scholarship disbursement request pending approval",
      time: "1 hour ago",
      read: false,
      type: "pending"
    },
    {
      id: 2,
      text: "Monthly financial report generated successfully",
      time: "3 hours ago",
      read: true,
      type: "success"
    },
    {
      id: 3,
      text: "Budget allocation updated for Q4",
      time: "1 day ago",
      read: true,
      type: "info"
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("financeToken");
    localStorage.removeItem("financeAdmin");
    navigate("/login");
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Finance Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
              <Calculator size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                PMSSS
              </h1>
              <p className="text-xs text-gray-500">Finance Portal</p>
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

        {/* Admin profile summary */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 mb-8 border border-indigo-100/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
              {admin?.username?.charAt(0)?.toUpperCase() || "F"}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-gray-800 truncate">
                {admin?.username || "Finance Admin"}
              </p>
              <p className="text-sm text-gray-600">{admin?.role || "Finance Manager"}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 truncate" title={admin?.email}>
            {admin?.email || "finance@pmsss.gov.in"}
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
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-white/80 hover:shadow-md"
                }`}
            >
              <div className={`${location.pathname === item.path ? "text-white" : "text-gray-500 group-hover:text-indigo-600"}`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="pt-6 mt-auto space-y-3 border-t border-gray-200/50">
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
              
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Finance Dashboard</h2>
                <p className="text-sm text-gray-600">Manage scholarship disbursements and financial operations</p>
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
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100/50 last:border-0 hover:bg-gray-50/50 cursor-pointer transition-colors ${
                            !notification.read ? "bg-indigo-50/50" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success' ? 'bg-green-500' :
                              notification.type === 'pending' ? 'bg-yellow-500' :
                              'bg-indigo-500'
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
                      ))}
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
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                    {admin?.username?.charAt(0)?.toUpperCase() || "F"}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-800">
                      {admin?.username || "Finance Admin"}
                    </p>
                    <p className="text-xs text-gray-500">{admin?.role || "Finance Manager"}</p>
                  </div>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-200/50">
                      <p className="font-semibold text-gray-800">
                        {admin?.username || "Finance Admin"}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {admin?.email || "finance@pmsss.gov.in"}
                      </p>
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

        {/* Page content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 min-h-[calc(100vh-12rem)]">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-lg border-t border-white/20 py-4 px-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} PMSSS Finance Portal. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}