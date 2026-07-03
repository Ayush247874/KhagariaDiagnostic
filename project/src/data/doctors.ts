export interface Doctor {
  id: number;
  name: string;
  qualification: string;
  specialization: string;
  experience_years: number;
  image_url: string;
  is_active: boolean;
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    qualification: "MD Pathology",
    specialization: "Clinical Pathology",
    experience_years: 10,
    image_url: "/doctors/dr-rajesh-kumar.jpg",
    is_active: true,
  },
  {
    id: 2,
    name: "Dr. Priya Singh",
    qualification: "MBBS, DNB",
    specialization: "Radiology",
    experience_years: 8,
    image_url: "/doctors/dr-priya-singh.jpg",
    is_active: true,
  },
  {
    id: 3,
    name: "Dr. Amit Verma",
    qualification: "MD Biochemistry",
    specialization: "Biochemistry",
    experience_years: 12,
    image_url: "/doctors/dr-amit-verma.jpg",
    is_active: true,
  },
  {
    id: 4,
    name: "Dr. Sunita Devi",
    qualification: "MBBS, MD",
    specialization: "Microbiology",
    experience_years: 6,
    image_url: "/doctors/dr-sunita-devi.jpg",
    is_active: true,
  },
];