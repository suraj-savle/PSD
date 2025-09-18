import { useState } from "react";
import {
  DollarSign,
  Search,
  Download,
  Eye,
  CheckCircle,
  Clock,
  Building,
  Calendar,
  CreditCard,
  ArrowUpRight
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function Disbursements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all"
  });
  const [selectedDisbursement, setSelectedDisbursement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock disbursement data
  const [disbursements, setDisbursements] = useState([
    {
      id: 1,
      studentName: "Amit Singh",
      sagApprovalId: "SAG2024003",
      amount: 20000,
      scholarshipType: "Sports Scholarship",
      bankAccount: "3456789012",
      ifscCode: "ICIC0001236",
      bankName: "ICICI Bank",
      disbursedDate: "2024-01-15",
      transactionId: "TXN001236",
      status: "completed",
      processingTime: "2 minutes"
    },
    {
      id: 2,
      studentName: "Rahul Kumar",
      sagApprovalId: "SAG2024001",
      amount: 25000,
      scholarshipType: "Merit Scholarship",
      bankAccount: "1234567890",
      ifscCode: "SBIN0001234",
      bankName: "State Bank of India",
      disbursedDate: null,
      transactionId: null,
      status: "pending",
      processingTime: null
    },
    {
      id: 3,
      studentName: "Priya Sharma",
      sagApprovalId: "SAG2024002",
      amount: 30000,
      scholarshipType: "Need-based Scholarship",
      bankAccount: "2345678901",
      ifscCode: "HDFC0001235",
      bankName: "HDFC Bank",
      disbursedDate: null,
      transactionId: null,
      status: "pending",
      processingTime: null
    }
  ]);

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
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'processing':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleDisburse = async (disbursement) => {
    try {
      // Update status to processing
      setDisbursements(prev => 
        prev.map(d => 
          d.id === disbursement.id 
            ? { ...d, status: 'processing' }
            : d
        )
      );

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update to completed
      setDisbursements(prev => 
        prev.map(d => 
          d.id === disbursement.id 
            ? { 
                ...d, 
                status: 'completed',
                disbursedDate: new Date().toISOString().split('T')[0],
                transactionId: `TXN${Date.now()}`,
                processingTime: "3 minutes"
              }
            : d
        )
      );
      
      toast.success(`${formatCurrency(disbursement.amount)} disbursed successfully!`);
      setShowModal(false);
    } catch (error) {
      toast.error('Disbursement failed. Please try again.');
      setDisbursements(prev => 
        prev.map(d => 
          d.id === disbursement.id 
            ? { ...d, status: 'failed' }
            : d
        )
      );
    }
  };

  const filteredDisbursements = disbursements.filter(disbursement => {
    const matchesSearch = disbursement.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disbursement.sagApprovalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (disbursement.transactionId && disbursement.transactionId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filters.status === "all" || disbursement.status === filters.status;
    
    return matchesSearch && matchesStatus;
  });

  const completedCount = disbursements.filter(d => d.status === 'completed').length;
  const pendingCount = disbursements.filter(d => d.status === 'pending').length;
  const totalDisbursed = disbursements.filter(d => d.status === 'completed').reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Disbursements</h1>
          <p className="text-gray-600">Manage scholarship fund disbursements</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
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
              <p className="text-gray-600 text-sm">Total Disbursed</p>
              <p className="text-2xl font-bold text-indigo-600">{formatCurrency(totalDisbursed)}</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <DollarSign size={24} className="text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Disbursements List */}
      <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Disbursement Records</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search disbursements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64 text-sm"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Disbursements Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Student Details</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Bank Details</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Transaction</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDisbursements.map((disbursement) => (
                <tr key={disbursement.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{disbursement.studentName}</div>
                      <div className="text-xs text-gray-500">SAG: {disbursement.sagApprovalId}</div>
                      <div className="text-xs text-gray-500">{disbursement.scholarshipType}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-green-600">{formatCurrency(disbursement.amount)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Building size={12} />
                        {disbursement.bankName}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">A/C: {disbursement.bankAccount}</div>
                      <div className="text-xs text-gray-500 font-mono">IFSC: {disbursement.ifscCode}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={getStatusBadge(disbursement.status)}>
                      {disbursement.status.charAt(0).toUpperCase() + disbursement.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {disbursement.transactionId ? (
                      <div>
                        <div className="text-sm font-mono text-gray-900">{disbursement.transactionId}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(disbursement.disbursedDate).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        onClick={() => {
                          setSelectedDisbursement(disbursement);
                          setShowModal(true);
                        }}
                      >
                        <Eye size={16} />
                      </button>
                      {disbursement.status === 'pending' && (
                        <button 
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                          onClick={() => handleDisburse(disbursement)}
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

          {filteredDisbursements.length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No disbursements found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Disbursement Details Modal */}
      {showModal && selectedDisbursement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Disbursement Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Student</label>
                <p className="text-gray-900">{selectedDisbursement.studentName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <p className="text-xl font-bold text-green-600">{formatCurrency(selectedDisbursement.amount)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Bank Details</label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm"><strong>Bank:</strong> {selectedDisbursement.bankName}</p>
                  <p className="text-sm"><strong>Account:</strong> {selectedDisbursement.bankAccount}</p>
                  <p className="text-sm"><strong>IFSC:</strong> {selectedDisbursement.ifscCode}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <span className={getStatusBadge(selectedDisbursement.status)}>
                    {selectedDisbursement.status.charAt(0).toUpperCase() + selectedDisbursement.status.slice(1)}
                  </span>
                </div>
              </div>

              {selectedDisbursement.transactionId && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Transaction ID</label>
                  <p className="text-gray-900 font-mono">{selectedDisbursement.transactionId}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
}