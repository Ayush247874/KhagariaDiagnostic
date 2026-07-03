import { useMemo, useState } from "react";
import { services } from "../data/services";
import { healthPackages } from "../data/packages";

export default function ServicesPage() {
  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const groupedServices = useMemo(() => {
    return filteredServices.reduce((groups, service) => {
      if (!groups[service.category]) {
        groups[service.category] = [];
      }
      groups[service.category].push(service);
      return groups;
    }, {} as Record<string, typeof services>);
  }, [filteredServices]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">
            Our Diagnostic Services
          </h1>

          <p className="mt-3 text-blue-100">
            Complete pathology and imaging services under one roof.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">

        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search test..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Services */}
        {Object.entries(groupedServices).map(([category, categoryServices]) => (
          <div key={category} className="mb-10">

            <h2 className="text-2xl font-bold text-emerald-700 mb-5">
              {category}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {categoryServices.map((service) => (

                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
                >

                  <div className="flex justify-between items-start">

                    <h3 className="font-bold text-lg">
                      {service.name}
                    </h3>

                    {service.is_popular && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Popular
                      </span>
                    )}

                  </div>

                  <p className="text-gray-600 mt-3">
                    {service.description}
                  </p>

                  <div className="mt-5 flex justify-between items-center">

                    <span className="text-emerald-700 font-bold text-xl">
                      ₹{service.price}
                    </span>

                    <button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                    >
                      Book Now
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>
        ))}

        {/* Health Packages */}

        <div className="mt-20">

          <h2 className="text-3xl font-bold text-center mb-10 text-emerald-700">
            Health Packages
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {healthPackages.map((pkg) => (

              <div
                key={pkg.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >

                <div className="flex justify-between items-center">

                  <h3 className="text-xl font-bold">
                    {pkg.name}
                  </h3>

                  {pkg.is_popular && (
                    <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                      Popular
                    </span>
                  )}

                </div>

                <p className="text-gray-600 mt-3">
                  {pkg.description}
                </p>

                <ul className="mt-5 list-disc ml-5 text-gray-700">

                  {pkg.tests_included.map((test) => (
                    <li key={test}>{test}</li>
                  ))}

                </ul>

                <div className="mt-6 flex justify-between items-center">

                  <span className="text-2xl font-bold text-emerald-700">
                    ₹{pkg.price}
                  </span>

                  <button
                    className="bg-emerald-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Book Package
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
} 