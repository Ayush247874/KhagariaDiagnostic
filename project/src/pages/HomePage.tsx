import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { services as serviceData, Service } from "../data/services";
import { healthPackages, HealthPackage } from "../data/packages";
import {
  Heart,
  Activity,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Users,
  Award,
  Truck,
  FileText,
  Shield,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
const [packages, setPackages] = useState<HealthPackage[]>([]);
const [loading, setLoading] = useState(true);

 useEffect(() => {
  setServices(
    serviceData.filter((service) => service.is_popular).slice(0, 8)
  );

  setPackages(
    healthPackages.filter((pkg) => pkg.is_popular).slice(0, 3)
  );

  setLoading(false);
}, []);

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      title: 'Accurate Reports',
      description: 'NABL certified lab with quality assurance',
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: 'Fast Service',
      description: 'Same day reports for most tests',
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: 'Affordable Pricing',
      description: 'Competitive prices with no hidden costs',
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      title: 'Home Collection',
      description: 'Free sample collection at your doorstep',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-700/50 backdrop-blur-sm text-emerald-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Trusted Diagnostic Center in Khagaria
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Advanced Diagnostic & Pathology Services
              </h1>
              <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
                Get accurate test results with state-of-the-art equipment and experienced
                professionals. Your health, our priority.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-emerald-200">
                  <CheckCircle className="w-5 h-5" />
                  <span>Blood Tests</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-200">
                  <CheckCircle className="w-5 h-5" />
                  <span>Thyroid Tests</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-200">
                  <CheckCircle className="w-5 h-5" />
                  <span>Diabetes Tests</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 bg-white text-emerald-800 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                >
                  <Activity className="w-5 h-5" />
                  Book Test Online
                </Link>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <img
                    src="https://images.pexels.com/photos/5452296/pexels-photo-5452296.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Laboratory"
                    className="w-full h-80 object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Users className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">10,000+</p>
                      <p className="text-sm text-gray-500">Tests Conducted</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">24-48 hrs</p>
                      <p className="text-sm text-gray-500">Report Delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                  <div className="group-hover:text-white">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="About Khagaria Diagnostic Center"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Khagaria Diagnostic Center</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Khagaria Diagnostic Center is a trusted diagnostic laboratory providing accurate
                pathology and diagnostic services with modern equipment and experienced technicians.
                We are committed to delivering precise results with quick turnaround times.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Quality Assured</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Digital Reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Truck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Home Sample</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Expert Team</span>
                </div>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700"
              >
                View All Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tests Section */}
     {/* Popular Tests */}
<section className="py-20 bg-gradient-to-b from-white to-emerald-50">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-14">
      <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-[#134e4a] text-sm font-semibold mb-4">
        Most Booked Tests
      </span>

      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Popular Diagnostic Tests
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Get accurate laboratory testing with affordable pricing and quick reporting.
      </p>
    </div>

    {loading ? (
      <div className="flex justify-center py-20">
        <div className="h-14 w-14 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
      </div>
    ) : (
      <>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Top */}
              <div className="bg-gradient-to-r from-[#134e4a] to-emerald-600 p-5 text-white">

                <div className="flex justify-between items-center mb-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                    {service.category}
                  </span>

                  {service.is_popular && (
                    <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
                      ★ Popular
                    </span>
                  )}
                </div>

                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl mb-4">
                  🧪
                </div>

                <h3 className="text-xl font-bold">
                  {service.name}
                </h3>
              </div>

              {/* Body */}
              <div className="p-6">

                <p className="text-gray-600 text-sm mb-6 min-h-[48px]">
                  {service.description ||
                    "Reliable diagnostic testing with accurate and timely reports."}
                </p>

                <div className="flex items-center justify-between mb-5">

                  <div>
                    <p className="text-xs text-gray-500">
                      Starting From
                    </p>

                    <h4 className="text-2xl font-bold text-[#134e4a]">
                      ₹{service.price || "--"}
                    </h4>
                  </div>

                </div>

                <Link
                  to={`/booking?test=${encodeURIComponent(service.name)}`}
                  className="block w-full text-center bg-[#134e4a] hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  Book Test
                </Link>

              </div>
            </div>
          ))}

        </div>

        {/* Button */}
        <div className="text-center mt-14">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-[#134e4a] hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all hover:scale-105"
          >
            View All Tests
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </>
    )}
  </div>
</section>

      {/* Health Packages Section */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Health Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive health checkups at discounted prices
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
                >
                  {pkg.is_popular && (
                    <div className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-full inline-block mb-4 font-medium">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  {pkg.description && (
                    <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                  )}
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Includes:</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.tests_included.slice(0, 4).map((test, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {test}
                        </span>
                      ))}
                      {pkg.tests_included.length > 4 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          +{pkg.tests_included.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-2xl font-bold text-emerald-600">₹{pkg.price}</span>
                    <Link
                      to={`/booking?test=${encodeURIComponent(pkg.name)}`}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/services#packages"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700"
            >
              View All Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Need a Home Sample Collection?</h2>
              <p className="text-emerald-100">
                Our technician will visit your home and collect samples at your convenience.
              </p>
            </div>
            <Link
              to="/home-collection"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              <Truck className="w-5 h-5" />
              Book Home Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
