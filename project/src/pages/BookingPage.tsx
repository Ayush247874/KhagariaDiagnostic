import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { services, Service } from '../data/services';
import { healthPackages, HealthPackage } from '../data/packages';
import { CheckCircle, Calendar, User, Phone, MapPin, FileText } from 'lucide-react';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const initialTest = searchParams.get('test') || '';

  const allTests: (Service | HealthPackage)[] = [
  ...services,
  ...healthPackages,
].sort((a, b) => a.name.localeCompare(b.name));
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  const [formData, setFormData] = useState({
    patient_name: '',
    mobile_number: '',
    age: '',
    gender: '',
    address: '',
    test_name: initialTest,
    preferred_date: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patient_name.trim()) newErrors.patient_name = 'Patient name is required';
    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = 'Enter a valid 10-digit mobile number';
    }
    if (formData.age && (parseInt(formData.age) < 0 || parseInt(formData.age) > 120)) {
      newErrors.age = 'Enter a valid age';
    }
    if (!formData.test_name) newErrors.test_name = 'Please select a test';
    if (!formData.preferred_date) newErrors.preferred_date = 'Please select a date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setBookingId(`KDC${Date.now().toString().slice(-8)}`);
        setSubmitted(true);
      } catch {
        setErrors({
          submit: 'Failed to submit booking.',
        });
      }
     finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your booking has been successfully submitted. We will contact you shortly.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
            <p className="text-xl font-bold text-emerald-600">{bookingId}</p>
          </div>
          <a
            href="/"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Book Test Online</h1>
          <p className="text-emerald-100">
            Schedule your diagnostic test at Khagaria Diagnostic Center
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
              <h2 className="text-xl font-bold text-gray-800">Patient Information</h2>
              <p className="text-sm text-gray-600">Fill in the details to book your test</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {errors.submit && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {errors.submit}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Patient Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.patient_name}
                    onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.patient_name ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Enter patient name"
                  />
                  {errors.patient_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.patient_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Mobile Number *
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile_number}
                    onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.mobile_number ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Enter 10-digit mobile number"
                  />
                  {errors.mobile_number && (
                    <p className="text-red-500 text-xs mt-1">{errors.mobile_number}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.age ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Enter age"
                    min="0"
                    max="120"
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter your address"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Select Test *
                    </span>
                  </label>
                  <select
                      value={formData.test_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          test_name: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.test_name ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select a test</option>

                      {allTests.map((service) => (
                        <option
                          key={`${service.id}-${service.name}`}
                          value={service.name}
                        >
                          {service.name}
                          {" price" in service && service.price
                            ? ` - ₹${service.price}`
                            : ""}
                        </option>
                      ))}
                    </select>
                  {errors.test_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.test_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Preferred Date *
                    </span>
                  </label>
                  <input
                    type="date"
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.preferred_date ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  {errors.preferred_date && (
                    <p className="text-red-500 text-xs mt-1">{errors.preferred_date}</p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Submit Booking
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 bg-emerald-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Bring your ID proof (Aadhaar/PAN) for verification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Fasting may be required for certain tests (8-12 hours)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Reports will be available within 24-48 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Payment can be made at the center or online</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
