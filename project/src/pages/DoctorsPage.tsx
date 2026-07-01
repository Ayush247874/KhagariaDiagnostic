import { useState, useEffect } from 'react';
import { supabase, Doctor } from '../lib/supabase';
import { User, Award, Briefcase, GraduationCap } from 'lucide-react';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const { data, error } = await supabase
          .from('doctors')
          .select('*')
          .eq('is_active', true)
          .order('name');

        if (error) throw error;
        setDoctors(data || []);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Doctors</h1>
          <p className="text-emerald-100 max-w-2xl">
            Meet our team of experienced pathologists and specialists dedicated to providing accurate diagnostics.
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            </div>
          ) : doctors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-64 bg-gradient-to-br from-emerald-100 to-teal-100">
                    {doctor.image_url ? (
                      <img
                        src={doctor.image_url}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="bg-emerald-200 w-32 h-32 rounded-full flex items-center justify-center">
                          <User className="w-16 h-16 text-emerald-600" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{doctor.name}</h3>
                      <p className="text-emerald-100 text-sm">{doctor.specialization}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Qualification</p>
                          <p className="font-medium text-gray-800">{doctor.qualification}</p>
                        </div>
                      </div>

                      {doctor.specialization && (
                        <div className="flex items-start gap-3">
                          <div className="bg-emerald-100 p-2 rounded-lg">
                            <Award className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Specialization</p>
                            <p className="font-medium text-gray-800">{doctor.specialization}</p>
                          </div>
                        </div>
                      )}

                      {doctor.experience_years && (
                        <div className="flex items-start gap-3">
                          <div className="bg-emerald-100 p-2 rounded-lg">
                            <Briefcase className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Experience</p>
                            <p className="font-medium text-gray-800">{doctor.experience_years}+ Years</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No doctors information available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Our Doctors Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Our Doctors?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of pathologists and technicians are committed to accuracy and patient care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Analysis',
                description: 'Our pathologists have years of experience in analyzing complex cases and providing accurate diagnoses.',
                icon: <Award className="w-8 h-8" />,
              },
              {
                title: 'Continuous Training',
                description: 'Our team regularly updates their skills with the latest diagnostic techniques and technologies.',
                icon: <GraduationCap className="w-8 h-8" />,
              },
              {
                title: 'Patient-Centric Care',
                description: 'We prioritize patient well-being and ensure clear communication about test results.',
                icon: <User className="w-8 h-8" />,
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
