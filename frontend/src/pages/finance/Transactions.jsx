import { useState } from "react";
import {
  Receipt,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from "lucide-react";

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    dateRange: "all"
  });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      transactionId: "TXN001236",
      studentName: "Amit Singh",
      sagApprovalId: "SAG2024003",
      amount: 20000,
      type: "disbursement",
      status: "success",
      date: "2024-01-15T10:30:00",
      bankAccount: "3456789012",
      bankName: "ICICI Bank",
      ifscCode: "ICIC0001236",
      scholarshipType: "Sports Scholarship",
      processingTime: "2 minutes",
      fees: 0,
      netAmount: 20000
    },
    {
      id: 2,
      transactionId: "TXN001240",
      studentName: "Vikash Yadav",
      sagApprovalId: "SAG2024005",
      amount: 28000,
      type: "disbursement",
      status: "success",
      date: "2024-01-14T14:20:00",
      bankAccount: "5678901234",
      bankName: "Punjab National Bank",
      ifscCode: "PUNB0001238",
      scholarshipType: "Minority Scholarship",
      processingTime: "1 minute",
      fees: 0,
      netAmount: 28000
    },
    {
      id: 3,
      transactionId: "TXN001241",
      studentName: "Anita Kumari",
      sagApprovalId: "SAG2024006",
      amount: 35000,
      type: "disbursement",
      status: "pending",
      date: "2024-01-16T09:15:00",
      bankAccount: "6789012345",
      bankName: "Bank of Baroda",
      ifscCode: "BARB0001239",
      scholarshipType: "Merit Scholarship",
      processingTime: null,
      fees: 0,
      netAmount: 35000
    },
    {
      id: 4,
      transactionId: "TXN001242",
      studentName: "Rohit Sharma",
      sagApprovalId: "SAG2024007",
      amount: 22000,
      type: "disbursement",
      status: "failed",
      date: "2024-01-16T11:45:00",
      bankAccount: "7890123456",
      bankName: "Canara Bank",
      ifscCode: "CNRB0001240",
      scholarshipType: "Need-based Scholarship",
      processingTime: null,
      fees: 0,
      netAmount: 22000,
      failureReason: "Invalid bank account details"
    },
    {
      id: 5,
      transactionId: "REF001001",
      studentName: "System Refund",
      sagApprovalId: "N/A",
      amount: 5000,
      type: "refund",
      status: "success",
      date: "2024-01-13T16:30:00",
      bankAccount: "System",
      bankName: "System Account",
      ifscCode: "N/A",
      scholarshipType: "Refund",
      processingTime: "Instant",
      fees: 0,
      netAmount: 5000
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'failed':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'disbursement':
        return <ArrowUpRight size={16} className="text-green-500" />;
      case 'refund':
        return <ArrowDownRight size={16} className="text-blue-500" />;
      default:
        return <DollarSign size={16} className="text-gray-500" />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.sagApprovalId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === "all" || transaction.status === filters.status;
    const matchesType = filters.type === "all" || transaction.type === filters.type;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const successCount = transactions.filter(t => t.status === 'success').length;
  const pendingCount = transactions.filter(t => t.status === 'pending').length;
  const failedCount = transactions.filter(t => t.status === 'failed').length;
  const totalAmount = transactions.filter(t => t.status === 'success').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">View all financial transactions and fund transfers</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download size={16} />
            Export Transactions
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Successful</p>
              <p className="text-2xl font-bold text-green-600">{successCount}</p>
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
              <p className="text-gray-600 text-sm">Failed</p>
              <p className="text-2xl font-bold text-red-600">{failedCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Processed</p>
              <p className="text-2xl font-bold text-indigo-600">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <DollarSign size={24} className="text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64 text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="all">All Types</option>
                <option value="disbursement">Disbursement</option>
                <option value="refund">Refund</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Transaction</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Student</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900 text-sm font-mono">{transaction.transactionId}</div>
                      <div className="text-xs text-gray-500">{transaction.scholarshipType}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{transaction.studentName}</div>
                      <div className="text-xs text-gray-500">SAG: {transaction.sagApprovalId}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900">{formatCurrency(transaction.amount)}</div>
                    {transaction.fees > 0 && (
                      <div className="text-xs text-gray-500">Fees: {formatCurrency(transaction.fees)}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(transaction.type)}
                      <span className="text-sm capitalize">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transaction.status)}
                      <span className={getStatusBadge(transaction.status)}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-sm text-gray-900">
                        {new Date(transaction.date).toLocaleDateString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleTimeString('en-IN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setShowModal(true);
                      }}
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No transactions found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Details Modal */}
      {showModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Transaction ID</label>
                <p className="text-gray-900 font-mono">{selectedTransaction.transactionId}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Student</label>
                <p className="text-gray-900">{selectedTransaction.studentName}</p>
                <p className="text-xs text-gray-500">SAG ID: {selectedTransaction.sagApprovalId}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <p className="text-xl font-bold text-green-600">{formatCurrency(selectedTransaction.amount)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Type & Status</label>
                <div className="flex items-center gap-2 mt-1">
                  {getTypeIcon(selectedTransaction.type)}
                  <span className="capitalize">{selectedTransaction.type}</span>
                  <span className={getStatusBadge(selectedTransaction.status)}>
                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Date & Time</label>
                <p className="text-gray-900">
                  {new Date(selectedTransaction.date).toLocaleString('en-IN')}
                </p>
              </div>

              {selectedTransaction.bankName !== 'System Account' && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Bank Details</label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm"><strong>Bank:</strong> {selectedTransaction.bankName}</p>
                    <p className="text-sm"><strong>Account:</strong> {selectedTransaction.bankAccount}</p>
                    <p className="text-sm"><strong>IFSC:</strong> {selectedTransaction.ifscCode}</p>
                  </div>
                </div>
              )}

              {selectedTransaction.processingTime && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Processing Time</label>
                  <p className="text-gray-900">{selectedTransaction.processingTime}</p>
                </div>
              )}

              {selectedTransaction.failureReason && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Failure Reason</label>
                  <p className="text-red-600">{selectedTransaction.failureReason}</p>
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
    </div>
  );
}