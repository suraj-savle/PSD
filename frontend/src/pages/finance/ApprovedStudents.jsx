import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  Building,
  Calendar,
  Award,
  CheckCircle,
  Clock
} from "lucide-react";

export default function ApprovedStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    scholarshipType: "all",
    status: "all",
    dateRange: "all"
  });

  // Mock approved students data
  const approvedStudents = [
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
      disbursementStatus: "pending",
      academicYear: "2024-25",
      course: "B.Tech Computer Science",
      institution: "IIT Delhi"
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
      disbursementStatus: "pending",
      academicYear: "2024-25",
      course: "B.Sc Mathematics",
      institution: "Delhi University"
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
      disbursementStatus: "disbursed",
      academicYear: "2024-25",
      course: "B.A Physical Education",
      institution: "Jamia Millia Islamia"
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
      disbursementStatus: "pending",
      academicYear: "2024-25",
      course: "B.Com Honours",
      institution: "Shri Ram College of Commerce"
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
                         student.sagApprovalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.scholarshipType === "all" || student.scholarshipType.toLowerCase().includes(filters.scholarshipType.toLowerCase());
    const matchesStatus = filters.status === "all" || student.disbursementStatus === filters.status;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const pendingCount = approvedStudents.filter(s => s.disbursementStatus === 'pending').length;
  const disbursedCount = approvedStudents.filter(s => s.disbursementStatus === 'disbursed').length;
  const totalAmount = approvedStudents.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">SAG Approved Students</h1>
          <p className="text-gray-600">Manage students approved by State Approval Gateway</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download size={16} />
            Export List
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Approved</p>
              <p className="text-2xl font-bold text-gray-900">{approvedStudents.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Disbursement</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Award size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Student List</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
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

        {/* Students Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-500">SAG ID: {student.sagApprovalId}</p>
                </div>
                <span className={getStatusBadge(student.disbursementStatus)}>
                  {student.disbursementStatus.charAt(0).toUpperCase() + student.disbursementStatus.slice(1)}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={14} />
                  {student.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} />
                  {student.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award size={14} />
                  {student.scholarshipType}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building size={14} />
                  {student.institution}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={14} />
                  Approved: {new Date(student.approvedDate).toLocaleDateString('en-IN')}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Scholarship Amount</p>
                  <p className="font-semibold text-green-600">{formatCurrency(student.amount)}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No students found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}