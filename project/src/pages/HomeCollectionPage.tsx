import { useState, useEffect } from 'react';
import { services, Service } from '../data/services';
import { healthPackages, HealthPackage } from '../data/packages';
import { Truck, CheckCircle, User, Phone, MapPin, FileText, Calendar, Clock } from 'lucide-react';

export default function HomeCollectionPage() {
  const [allTests, setAllTests] = useState<(Service | HealthPackage)[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  const [formData, setFormData] = useState({
    patient_name: '',
    mobile_number: '',
    address: '',
    test_name: '',
    preferred_date: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
  const tests = [...services, ...healthPackages].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  setAllTests(tests);
  setLoading(false);
}, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patient_name.trim()) newErrors.patient_name = 'Patient name is required';
    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required for home collection';
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
      const booking = {
        ...formData,
        bookingId: `KDC${Date.now().toString().slice(-8)}`,
        bookingDate: new Date().toISOString(),
      };

      console.log('Booking Submitted:', booking);

      setBookingId(booking.bookingId);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setErrors({
        submit: 'Failed to submit booking.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Home Collection Booked!</h2>
          <p className="text-gray-600 mb-6">
            Our technician will visit your home at the scheduled time. You will receive a confirmation call shortly.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
            <p className="text-xl font-bold text-emerald-600">{bookingId}</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-medium text-gray-800 mb-2">What's Next?</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Keep your ID proof ready
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Follow fasting instructions if applicable
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Technician will call before arriving
              </li>
            </ul>
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
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-700/50 p-2 rounded-lg">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold">Home Sample Collection</h1>
        </div>
        <p className="text-emerald-100 max-w-2xl">
          Our trained technician will visit your home and collect samples at your convenience. No need to travel!
        </p>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: 1, title: 'Book Online', description: 'Fill the form with your details and select test' },
            { step: 2, title: 'Confirmation', description: 'Receive call confirming date and time' },
            { step: 3, title: 'Sample Collection', description: 'Technician visits and collects sample' },
            { step: 4, title: 'Get Reports', description: 'Download reports online within 24-48 hours' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Booking Form */}
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
            <h2 className="text-xl font-bold text-gray-800">Book Home Collection</h2>
            <p className="text-sm text-gray-600">Our technician will visit at your scheduled time</p>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Complete Address *
                </span>
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.address ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Enter your complete address with landmark"
                rows={3}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Select Test *
                  </span>
                </label>
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-12 rounded-lg"></div>
                ) : (
                  <select
                    value={formData.test_name}
                    onChange={(e) => setFormData({ ...formData, test_name: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.test_name ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select a test</option>
                    {allTests.map((service)=> (
                      <option key={service.id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                )}
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
                    Booking...
                  </>
                ) : (
                  <>
                    <Truck className="w-5 h-5" />
                    Book Home Collection
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-emerald-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Benefits of Home Collection</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Clock className="w-5 h-5" />, title: 'Convenient Timing', description: 'Choose your preferred time slot' },
              { icon: <Truck className="w-5 h-5" />, title: 'Free Service', description: 'No extra charges for sample collection' },
              { icon: <User className="w-5 h-5" />, title: 'Expert Technicians', description: 'Trained phlebotomists' },
              { icon: <CheckCircle className="w-5 h-5" />, title: 'Safe & Hygienic', description: 'All safety protocols followed' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">{item.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}
