import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Service, HealthPackage } from '../lib/supabase';
import { Search, ArrowRight, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [packages, setPackages] = useState<HealthPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesRes, packagesRes] = await Promise.all([
          supabase.from('services').select('*').order('category').order('name'),
          supabase.from('health_packages').select('*').order('price'),
        ]);

        if (servicesRes.data) setServices(servicesRes.data);
        if (packagesRes.data) setPackages(packagesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const categories = ['all', ...new Set(services.map((s) => s.category))];

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedServices = filteredServices.reduce((acc, service) => {
    const category = service.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-emerald-100 max-w-2xl">
            Comprehensive diagnostic and pathology services with state-of-the-art equipment
            and experienced professionals.
          </p>
        </div>
      </section>

      {/* Pathology Tests Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Tests' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedServices).map(([category, categoryServices]) => (
                <div key={category} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
                    <h2 className="text-xl font-bold text-gray-800">{category}</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {categoryServices.map((service) => (
                      <div
                        key={service.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-4 mb-3 sm:mb-0">
                          <div className="bg-emerald-100 p-2 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{service.name}</h3>
                            {service.description && (
                              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 sm:flex-nowrap">
                          {service.price && (
                            <span className="text-xl font-bold text-emerald-600">
                              ₹{service.price}
                            </span>
                          )}
                          <Link
                            to={`/booking?test=${encodeURIComponent(service.name)}`}
                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors whitespace-nowrap"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredServices.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl">
                  <p className="text-gray-500">No tests found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Health Packages Section */}
      <section id="packages" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Health Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Save more with our comprehensive health checkup packages
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl overflow-hidden ${
                  pkg.is_popular
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white'
                    : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="p-6">
                  {pkg.is_popular && (
                    <div className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  {pkg.description && (
                    <p className={`text-sm mb-4 ${pkg.is_popular ? 'text-emerald-100' : 'text-gray-600'}`}>
                      {pkg.description}
                    </p>
                  )}
                  <div className="mb-4">
                    <p className={`text-sm mb-2 ${pkg.is_popular ? 'text-emerald-100' : 'text-gray-500'}`}>
                      Tests Included:
                    </p>
                    <ul className="space-y-1">
                      {pkg.tests_included.map((test, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            pkg.is_popular ? 'text-emerald-200' : 'text-emerald-600'
                          }`} />
                          <span className={pkg.is_popular ? 'text-emerald-100' : 'text-gray-700'}>
                            {test}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-3xl font-bold">₹{pkg.price}</span>
                      </div>
                      <Link
                        to={`/booking?test=${encodeURIComponent(pkg.name)}`}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          pkg.is_popular
                            ? 'bg-white text-emerald-600 hover:bg-gray-100'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Can't Find Your Test?</h2>
          <p className="text-gray-600 mb-6">
            Contact us for any specific test requirements. We offer 500+ tests.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
