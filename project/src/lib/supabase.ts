import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Service = {
  id: number;
  name: string;
  category: string;
  description: string | null;
  price: number | null;
  is_popular: boolean;
};

export type HealthPackage = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  tests_included: string[];
  is_popular: boolean;
};

export type Doctor = {
  id: number;
  name: string;
  qualification: string;
  specialization: string | null;
  experience_years: number | null;
  image_url: string | null;
  is_active: boolean;
};

export type Booking = {
  id: number;
  patient_name: string;
  mobile_number: string;
  age: number | null;
  gender: string | null;
  address: string | null;
  test_name: string;
  preferred_date: string | null;
  booking_type: 'center_visit' | 'home_collection';
  status: string;
};

export type Report = {
  id: number;
  patient_name: string;
  patient_id: string;
  mobile_number: string;
  test_name: string;
  report_date: string | null;
  report_url: string | null;
  status: string;
};
