import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  DollarSign,
  Database,
  Download,
  Upload,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get current admin data
  const currentAdmin = JSON.parse(localStorage.getItem('financeAdmin') || '{}');

  const [profileData, setProfileData] = useState({
    name: currentAdmin.name || "Finance Admin",
    email: currentAdmin.email || "finance.admin@pmsss.gov.in",
    role: currentAdmin.role || "Finance Administrator",
    phone: "+91 9876543210",
    department: "Finance Department",
    employeeId: "FIN001"
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    sessionTimeout: "30"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    disbursementAlerts: true,
    systemUpdates: false,
    weeklyReports: true,
    failureAlerts: true
  });

  const [systemSettings, setSystemSettings] = useState({
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    timeZone: "Asia/Kolkata",
    language: "English",
    autoBackup: true,
    backupFrequency: "daily"
  });

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update localStorage with new profile data
      const updatedAdmin = {
        ...currentAdmin,
        name: profileData.name,
        email: profileData.email,
        role: profileData.role
      };
      localStorage.setItem('financeAdmin', JSON.stringify(updatedAdmin));
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSecurity = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Security settings updated successfully!');
      setSecurityData({
        ...securityData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      toast.error('Failed to update security settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Notification preferences saved!');
    } catch (error) {
      toast.error('Failed to save notification settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSystem = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('System settings updated!');
    } catch (error) {
      toast.error('Failed to update system settings');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "system", label: "System", icon: <SettingsIcon size={18} /> }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and system preferences</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Settings</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      value={profileData.role}
                      onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Finance Administrator">Finance Administrator</option>
                      <option value="Finance Manager">Finance Manager</option>
                      <option value="Accounts Head">Accounts Head</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                    <input
                      type="text"
                      value={profileData.employeeId}
                      onChange={(e) => setProfileData({...profileData, employeeId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={securityData.currentPassword}
                            onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          value={securityData.newPassword}
                          onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <input
                          type="password"
                          value={securityData.confirmPassword}
                          onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Security Options</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                          <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={securityData.twoFactorEnabled}
                          onChange={(e) => setSecurityData({...securityData, twoFactorEnabled: e.target.checked})}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <select
                          value={securityData.sessionTimeout}
                          onChange={(e) => setSecurityData({...securityData, sessionTimeout: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSaveSecurity}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} />
                    {isLoading ? 'Saving...' : 'Update Security'}
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'emailNotifications', label: 'General Email Notifications', desc: 'Receive general system notifications via email' },
                        { key: 'disbursementAlerts', label: 'Disbursement Alerts', desc: 'Get notified when disbursements are completed or failed' },
                        { key: 'systemUpdates', label: 'System Updates', desc: 'Receive notifications about system maintenance and updates' },
                        { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Get weekly summary reports via email' },
                        { key: 'failureAlerts', label: 'Failure Alerts', desc: 'Immediate alerts for transaction failures' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">{item.label}</label>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings[item.key]}
                            onChange={(e) => setNotificationSettings({...notificationSettings, [item.key]: e.target.checked})}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSaveNotifications}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} />
                    {isLoading ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === "system" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">System Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                        <select
                          value={systemSettings.currency}
                          onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="INR">Indian Rupee (₹)</option>
                          <option value="USD">US Dollar ($)</option>
                          <option value="EUR">Euro (€)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                        <select
                          value={systemSettings.dateFormat}
                          onChange={(e) => setSystemSettings({...systemSettings, dateFormat: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                        <select
                          value={systemSettings.timeZone}
                          onChange={(e) => setSystemSettings({...systemSettings, timeZone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">America/New_York (EST)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select
                          value={systemSettings.language}
                          onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Data Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Auto Backup</label>
                          <p className="text-xs text-gray-500">Automatically backup system data</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={systemSettings.autoBackup}
                          onChange={(e) => setSystemSettings({...systemSettings, autoBackup: e.target.checked})}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                        <select
                          value={systemSettings.backupFrequency}
                          onChange={(e) => setSystemSettings({...systemSettings, backupFrequency: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          disabled={!systemSettings.autoBackup}
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Data Export/Import</h3>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download size={16} />
                        Export Data
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Upload size={16} />
                        Import Data
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSaveSystem}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} />
                    {isLoading ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}