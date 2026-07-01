-- Services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Health packages table
CREATE TABLE health_packages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  tests_included TEXT[] NOT NULL,
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Doctors table
CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  qualification TEXT NOT NULL,
  specialization TEXT,
  experience_years INTEGER,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  address TEXT,
  test_name TEXT NOT NULL,
  preferred_date DATE,
  booking_type TEXT CHECK (booking_type IN ('center_visit', 'home_collection')) DEFAULT 'center_visit',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_id TEXT NOT NULL UNIQUE,
  mobile_number TEXT NOT NULL,
  test_name TEXT NOT NULL,
  report_date DATE,
  report_url TEXT,
  status TEXT DEFAULT 'ready',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services (public read)
CREATE POLICY "services_select" ON services FOR SELECT USING (true);
CREATE POLICY "services_insert" ON services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "services_update" ON services FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "services_delete" ON services FOR DELETE TO authenticated USING (true);

-- RLS Policies for health_packages (public read)
CREATE POLICY "packages_select" ON health_packages FOR SELECT USING (true);
CREATE POLICY "packages_insert" ON health_packages FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "packages_update" ON health_packages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "packages_delete" ON health_packages FOR DELETE TO authenticated USING (true);

-- RLS Policies for doctors (public read)
CREATE POLICY "doctors_select" ON doctors FOR SELECT USING (true);
CREATE POLICY "doctors_insert" ON doctors FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "doctors_update" ON doctors FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "doctors_delete" ON doctors FOR DELETE TO authenticated USING (true);

-- RLS Policies for bookings
CREATE POLICY "bookings_select" ON bookings FOR SELECT USING (true);
CREATE POLICY "bookings_insert" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "bookings_update" ON bookings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "bookings_delete" ON bookings FOR DELETE TO authenticated USING (true);

-- RLS Policies for reports
CREATE POLICY "reports_select" ON reports FOR SELECT USING (true);
CREATE POLICY "reports_insert" ON reports FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "reports_update" ON reports FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "reports_delete" ON reports FOR DELETE TO authenticated USING (true);

-- Insert sample services
INSERT INTO services (name, category, description, price, is_popular) VALUES
('CBC', 'Blood Tests', 'Complete Blood Count', 299, true),
('Blood Sugar', 'Blood Tests', 'Fasting Blood Glucose', 99, true),
('HbA1c', 'Blood Tests', 'Glycated Hemoglobin', 599, true),
('ESR', 'Blood Tests', 'Erythrocyte Sedimentation Rate', 199, false),
('Blood Group', 'Blood Tests', 'ABO Rh Typing', 149, false),
('T3', 'Thyroid Tests', 'Triiodothyronine', 399, false),
('T4', 'Thyroid Tests', 'Thyroxine', 349, false),
('TSH', 'Thyroid Tests', 'Thyroid Stimulating Hormone', 399, true),
('Liver Function Test (LFT)', 'Liver Tests', 'Complete Liver Panel', 599, true),
('Kidney Function Test (KFT)', 'Kidney Tests', 'Complete Kidney Panel', 599, true),
('Lipid Profile', 'Cardiac Tests', 'Cholesterol Panel', 549, true),
('Vitamin D', 'Vitamin Tests', '25-Hydroxy Vitamin D', 899, true),
('Vitamin B12', 'Vitamin Tests', 'Cobalamin Level', 699, true),
('Testosterone', 'Hormone Tests', 'Total Testosterone', 799, false),
('FSH', 'Hormone Tests', 'Follicle Stimulating Hormone', 599, false),
('LH', 'Hormone Tests', 'Luteinizing Hormone', 599, false),
('Prolactin', 'Hormone Tests', 'Prolactin Level', 599, false),
('Urine Routine', 'Urine Tests', 'Complete Urine Analysis', 149, false),
('Stool Routine', 'Stool Tests', 'Complete Stool Analysis', 149, false),
('Chest X-Ray', 'Imaging Services', 'Chest X-Ray Imaging', 399, false),
('Spine X-Ray', 'Imaging Services', 'Spine X-Ray Imaging', 499, false),
('Dental X-Ray', 'Imaging Services', 'Dental X-Ray Imaging', 199, false),
('Whole Abdomen USG', 'Imaging Services', 'Abdominal Ultrasound', 899, true),
('Pregnancy Scan', 'Imaging Services', 'Obstetric Ultrasound', 799, false),
('Pelvic Scan', 'Imaging Services', 'Pelvic Ultrasound', 699, false),
('ECG', 'Imaging Services', 'Electrocardiogram', 299, true),
('Echo', 'Imaging Services', 'Echocardiography', 1499, false),
('TMT', 'Imaging Services', 'Treadmill Test', 999, false);

-- Insert health packages
INSERT INTO health_packages (name, description, price, tests_included, is_popular) VALUES
('Basic Health Checkup', 'Essential health screening package', 999, ARRAY['CBC', 'Blood Sugar', 'Urine Routine', 'Liver Function Test (LFT)'], false),
('Diabetes Package', 'Complete diabetes monitoring', 699, ARRAY['Fasting Blood Sugar', 'Post Prandial Sugar', 'HbA1c'], true),
('Full Body Checkup', 'Comprehensive health assessment', 2499, ARRAY['CBC', 'LFT', 'KFT', 'TSH', 'Lipid Profile', 'Blood Sugar', 'Urine Routine'], true),
('Senior Citizen Package', 'Health screening for seniors', 2999, ARRAY['CBC', 'LFT', 'KFT', 'TSH', 'Lipid Profile', 'Blood Sugar', 'Urine Routine', 'ECG', 'Vitamin D', 'Vitamin B12'], true);

-- Insert doctors
INSERT INTO doctors (name, qualification, specialization, experience_years, is_active) VALUES
('Dr. Rajesh Kumar', 'MD Pathology', 'Clinical Pathology', 10, true),
('Dr. Priya Singh', 'MBBS, DNB', 'Radiology', 8, true),
('Dr. Amit Verma', 'MD Biochemistry', 'Biochemistry', 12, true),
('Dr. Sunita Devi', 'MBBS, MD', 'Microbiology', 6, true);
