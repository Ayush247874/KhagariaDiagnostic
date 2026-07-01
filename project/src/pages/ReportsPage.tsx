import { useState } from 'react';
import { supabase, Report } from '../lib/supabase';
import { FileText, Search, Download, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function ReportsPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [patientId, setPatientId] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setReports([]);
    setSearched(false);

    if (!mobileNumber.trim() && !patientId.trim()) {
      setError('Please enter either Mobile Number or Patient ID');
      return;
    }

    setLoading(true);
    try {
      let query = supabase.from('reports').select('*');

      if (mobileNumber.trim() && patientId.trim()) {
        query = query.or(`mobile_number.eq.${mobileNumber},patient_id.eq.${patientId}`);
      } else if (mobileNumber.trim()) {
        query = query.eq('mobile_number', mobileNumber);
      } else {
        query = query.eq('patient_id', patientId);
      }

      const { data, error: fetchError } = await query.order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setReports(data || []);
      setSearched(true);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to fetch reports. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Ready
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-700/50 p-2 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold">Download Reports</h1>
          </div>
          <p className="text-emerald-100 max-w-2xl">
            Access your test reports online. Enter your Mobile Number or Patient ID to view and download.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient ID
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter patient ID"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search Reports
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          {searched && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {reports.length > 0 ? `Found ${reports.length} report(s)` : 'No reports found'}
              </h2>

              {reports.length > 0 ? (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-100 p-3 rounded-lg">
                            <FileText className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{report.test_name}</h3>
                            <p className="text-sm text-gray-600">
                              Patient: {report.patient_name}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-gray-500">
                                ID: {report.patient_id}
                              </span>
                              {report.report_date && (
                                <span className="text-xs text-gray-500">
                                  Date: {new Date(report.report_date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(report.status)}
                          {report.status === 'ready' && (
                            <button
                              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              Download PDF
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No reports found for the given credentials. Please check and try again.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Help Section */}
          <div className="mt-8 bg-emerald-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Reports are usually available within 24-48 hours after sample collection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Patient ID is provided on your receipt after booking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Contact us at +91 XXXXX XXXXX for any assistance</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
