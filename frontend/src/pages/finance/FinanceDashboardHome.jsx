import { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  CreditCard,
  Building,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function FinanceDashboardHome() {
  const [filters, setFilters] = useState({
    scholarshipType: "all",
    academicYear: "2024-25",
    status: "all"
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock approved students from SAG (State Approval Gateway)
  const [approvedStudents, setApprovedStudents] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul.kumar@email.com",
      phone: "+91 9876543210",
      scholarshipType: "Merit Scholarship",
      amount: 25000,
      bankAccount: "1234567890",
      ifscCode: "SBIN0001234",
      bankName: "State Bank of India",
      approvedDate: "2024-01-10",
      sagApprovalId: "SAG2024001",
      disbursementStatus: "pending"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 9876543211",
      scholarshipType: "Need-based Scholarship",
      amount: 30000,
      bankAccount: "2345678901",
      ifscCode: "HDFC0001235",
      bankName: "HDFC Bank",
      approvedDate: "2024-01-12",
      sagApprovalId: "SAG2024002",
      disbursementStatus: "pending"
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit.singh@email.com",
      phone: "+91 9876543212",
      scholarshipType: "Sports Scholarship",
      amount: 20000,
      bankAccount: "3456789012",
      ifscCode: "ICIC0001236",
      bankName: "ICICI Bank",
      approvedDate: "2024-01-08",
      sagApprovalId: "SAG2024003",
      disbursementStatus: "disbursed"
    },
    {
      id: 4,
      name: "Sneha Patel",
      email: "sneha.patel@email.com",
      phone: "+91 9876543213",
      scholarshipType: "Minority Scholarship",
      amount: 28000,
      bankAccount: "4567890123",
      ifscCode: "AXIS0001237",
      bankName: "Axis Bank",
      approvedDate: "2024-01-14",
      sagApprovalId: "SAG2024004",
      disbursementStatus: "pending"
    }
  ]);

  // Calculate stats from approved students
  const pendingStudents = approvedStudents.filter(s => s.disbursementStatus === 'pending');
  const disbursedStudents = approvedStudents.filter(s => s.disbursementStatus === 'disbursed');
  const totalPendingAmount = pendingStudents.reduce((sum, s) => sum + s.amount, 0);
  const totalDisbursedAmount = disbursedStudents.reduce((sum, s) => sum + s.amount, 0);

  const stats = {
    totalFunds: 50000000,
    disbursed: totalDisbursedAmount,
    pending: totalPendingAmount,
    activeScholars: approvedStudents.length
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDisburse = async (student) => {
    setIsProcessing(true);
    try {
      // Simulate API call for disbursement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update student status
      setApprovedStudents(prev => 
        prev.map(s => 
          s.id === student.id 
            ? { ...s, disbursementStatus: 'disbursed' }
            : s
        )
      );
      
      toast.success(`${formatCurrency(student.amount)} disbursed to ${student.name} successfully!`);
      setShowDisbursementModal(false);
      setSelectedStudent(null);
    } catch (error) {
      toast.error('Disbursement failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'disbursed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const filteredStudents = approvedStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.sagApprovalId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.scholarshipType === "all" || student.scholarshipType.toLowerCase().includes(filters.scholarshipType.toLowerCase());
    const matchesStatus = filters.status === "all" || student.disbursementStatus === filters.status;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Finance Dashboard</h1>
          <p className="text-gray-600">Manage SAG approved students and scholarship disbursements</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Total Funds Available</p>
              <p className="text-xl lg:text-2xl font-bold">{formatCurrency(stats.totalFunds)}</p>
            </div>
            <div className="bg-white/20 p-2 lg:p-3 rounded-lg">
              <DollarSign size={20} className="lg:w-6 lg:h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 lg:mt-4 text-indigo-100">
            <TrendingUp size={14} className="lg:w-4 lg:h-4" />
            <span className="text-xs lg:text-sm">Budget allocated</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Funds Disbursed</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{formatCurrency(stats.disbursed)}</p>
            </div>
            <div className="bg-green-100 p-2 lg:p-3 rounded-lg">
              <ArrowUpRight size={20} className="lg:w-6 lg:h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 lg:mt-4 text-green-600">
            <CheckCircle size={14} className="lg:w-4 lg:h-4" />
            <span className="text-xs lg:text-sm">{disbursedStudents.length} students paid</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Disbursements</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{formatCurrency(stats.pending)}</p>
            </div>
            <div className="bg-yellow-100 p-2 lg:p-3 rounded-lg">
              <Clock size={20} className="lg:w-6 lg:h-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 lg:mt-4 text-yellow-600">
            <AlertCircle size={14} className="lg:w-4 lg:h-4" />
            <span className="text-xs lg:text-sm">{pendingStudents.length} awaiting payment</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">SAG Approved Students</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{stats.activeScholars}</p>
            </div>
            <div className="bg-blue-100 p-2 lg:p-3 rounded-lg">
              <Users size={20} className="lg:w-6 lg:h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 lg:mt-4 text-blue-600">
            <TrendingUp size={14} className="lg:w-4 lg:h-4" />
            <span className="text-xs lg:text-sm">Ready for disbursement</span>
          </div>
        </div>
      </div>

      {/* Approved Students Section */}
      <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">SAG Approved Students</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or SAG ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64 text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={filters.scholarshipType}
                onChange={(e) => setFilters({...filters, scholarshipType: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="all">All Types</option>
                <option value="merit">Merit</option>
                <option value="need">Need-based</option>
                <option value="sports">Sports</option>
                <option value="minority">Minority</option>
              </select>

              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="disbursed">Disbursed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-700 text-sm">Student Details</th>
                <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-700 text-sm">Scholarship Info</th>
                <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-700 text-sm">Bank Details</th>
                <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-700 text-sm">Status</th>
                <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 lg:px-4">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{student.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Mail size={12} />
                        {student.email}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone size={12} />
                        {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 lg:px-4">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{student.scholarshipType}</div>
                      <div className="text-sm font-semibold text-green-600">{formatCurrency(student.amount)}</div>
                      <div className="text-xs text-gray-500">SAG ID: {student.sagApprovalId}</div>
                    </div>
                  </td>
                  <td className="py-3 px-2 lg:px-4">
                    <div>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Building size={12} />
                        {student.bankName}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">A/C: {student.bankAccount}</div>
                      <div className="text-xs text-gray-500 font-mono">IFSC: {student.ifscCode}</div>
                    </div>
                  </td>
                  <td className="py-3 px-2 lg:px-4">
                    <span className={getStatusBadge(student.disbursementStatus)}>
                      {student.disbursementStatus.charAt(0).toUpperCase() + student.disbursementStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-2 lg:px-4">
                    <div className="flex gap-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowDisbursementModal(true);
                        }}
                      >
                        <Eye size={16} />
                      </button>
                      {student.disbursementStatus === 'pending' && (
                        <button 
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowDisbursementModal(true);
                          }}
                        >
                          Disburse
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No students found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Disbursement Modal */}
      {showDisbursementModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Confirm Disbursement</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Student Name</label>
                <p className="text-gray-900">{selectedStudent.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Scholarship Amount</label>
                <p className="text-xl font-bold text-green-600">{formatCurrency(selectedStudent.amount)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Bank Details</label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm"><strong>Bank:</strong> {selectedStudent.bankName}</p>
                  <p className="text-sm"><strong>Account:</strong> {selectedStudent.bankAccount}</p>
                  <p className="text-sm"><strong>IFSC:</strong> {selectedStudent.ifscCode}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDisbursementModal(false);
                  setSelectedStudent(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDisburse(selectedStudent)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </div>
                ) : (
                  'Confirm Disbursement'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
}