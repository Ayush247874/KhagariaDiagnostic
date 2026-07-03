import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      content: 'Sagarmal Chowk Opposite (Dr.Satish Kumar) Mill Road Khagaria Bihar 851205',
      subContent: 'Near Main Market',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      content: '+91 6200386449',
      subContent: 'Available 24/7 for emergencies',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'manish3002k@gmail.com',
      subContent: 'We reply within 24 hours',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      content: 'Monday - Sunday',
      subContent: '7:00 AM - 8:00 PM',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-emerald-100 max-w-2xl">
            Have questions? We're here to help. Reach out to us for any queries or bookings.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Khagaria Diagnostic Center is your trusted partner for all diagnostic needs. Visit us or reach out through any of the channels below.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                      {info.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{info.title}</h3>
                    <p className="text-gray-800">{info.content}</p>
                    <p className="text-sm text-gray-500">{info.subContent}</p>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-2">Sunday Hours</h3>
                <p className="text-gray-600">7:00 AM - 8:00 PM</p>
                <p className="text-sm text-gray-500 mt-2">
                  Emergency services available on call
                </p>
              </div>

              {/* Map placeholder */}
                 <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-10">
      <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
        📍 Visit Us
      </span>

      <h2 className="text-4xl font-bold text-gray-900 mb-3">
        Find Our Location
      </h2>

      <p className="text-gray-500 max-w-2xl mx-auto">
        Easily locate Khagaria Diagnostic Center on Google Maps.
      </p>
    </div>

    {/* Map Card */}
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 hover:shadow-emerald-200 transition-all duration-500">

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d655.2399542504287!2d86.46602657982793!3d25.50246756119778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDMwJzA4LjIiTiA4NsKwMjcnNTkuOSJF!5e0!3m2!1sen!2sin!4v1783073202253!5m2!1sen!2sin"
        className="w-full h-[500px]"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        title="Khagaria Diagnostic Center Location"
      ></iframe>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

    </div>

  </div>
</section>

            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
                  <h2 className="text-xl font-bold text-gray-800">Send us a Message</h2>
                  <p className="text-sm text-gray-600">We'll get back to you shortly</p>
                </div>

                {submitted ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. We'll respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-emerald-600 font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Need Immediate Assistance?</h2>
              <p className="text-emerald-100">
                Call us directly for urgent queries or to book an appointment.
              </p>
            </div>
            <a
              href="tel:+91XXXXXXXXXX"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now: +91 6200386449
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
