import { doctors } from "../data/doctors";
import { User, Award, Briefcase, GraduationCap } from "lucide-react";

export default function DoctorsPage() {
  const activeDoctors = doctors.filter((doctor) => doctor.is_active);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Doctors</h1>

          <p className="text-emerald-100 max-w-2xl">
            Meet our team of experienced pathologists and specialists
            dedicated to providing accurate diagnostics.
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {activeDoctors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Doctor Image */}
                  <div className="relative h-72 bg-gradient-to-br from-emerald-100 to-teal-100">
                    {doctor.image_url ? (
                      <img
                        src={doctor.image_url}
                        alt={doctor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="bg-emerald-200 w-32 h-32 rounded-full flex items-center justify-center">
                          <User className="w-16 h-16 text-emerald-600" />
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                    <div className="absolute bottom-5 left-5">
                      <h3 className="text-2xl font-bold text-white">
                        {doctor.name}
                      </h3>

                      <p className="text-emerald-200">
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>

                  {/* Doctor Details */}
                  <div className="p-6 space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-emerald-600" />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Qualification
                        </p>

                        <p className="font-semibold text-gray-800">
                          {doctor.qualification}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <Award className="w-5 h-5 text-emerald-600" />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Specialization
                        </p>

                        <p className="font-semibold text-gray-800">
                          {doctor.specialization}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <Briefcase className="w-5 h-5 text-emerald-600" />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Experience
                        </p>

                        <p className="font-semibold text-gray-800">
                          {doctor.experience_years}+ Years
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm">
              <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />

              <h3 className="text-xl font-semibold text-gray-700">
                No Doctors Available
              </h3>

              <p className="text-gray-500 mt-2">
                Doctors information will be updated soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Doctors */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-800">
              Why Choose Our Doctors?
            </h2>

            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Our highly qualified doctors and laboratory experts ensure
              accurate diagnosis and quality healthcare services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Expert Doctors
              </h3>

              <p className="text-gray-600">
                Experienced specialists providing accurate diagnosis with
                modern medical techniques.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                <GraduationCap className="w-8 h-8 text-emerald-600" />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Certified Professionals
              </h3>

              <p className="text-gray-600">
                Continuously trained professionals using the latest laboratory
                standards and technology.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                <User className="w-8 h-8 text-emerald-600" />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Patient First
              </h3>

              <p className="text-gray-600">
                We believe in patient-focused care, transparency, and timely,
                accurate diagnostic reports.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}