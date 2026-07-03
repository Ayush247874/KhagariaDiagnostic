export interface HealthPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  tests_included: string[];
  is_popular: boolean;
}

export const healthPackages: HealthPackage[] = [
  {
    id: 1,
    name: "Basic Health Checkup",
    description: "Essential health screening package",
    price: 999,
    tests_included: [
      "CBC",
      "Blood Sugar",
      "Urine Routine",
      "Liver Function Test (LFT)",
    ],
    is_popular: false,
  },
  {
    id: 2,
    name: "Diabetes Package",
    description: "Complete diabetes monitoring",
    price: 699,
    tests_included: [
      "Fasting Blood Sugar",
      "Post Prandial Sugar",
      "HbA1c",
    ],
    is_popular: true,
  },
  {
    id: 3,
    name: "Full Body Checkup",
    description: "Comprehensive health assessment",
    price: 2499,
    tests_included: [
      "CBC",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "TSH",
      "Lipid Profile",
      "Blood Sugar",
      "Urine Routine",
    ],
    is_popular: true,
  },
  {
    id: 4,
    name: "Senior Citizen Package",
    description: "Health screening for seniors",
    price: 2999,
    tests_included: [
      "CBC",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "TSH",
      "Lipid Profile",
      "Blood Sugar",
      "Urine Routine",
      "ECG",
      "Vitamin D",
      "Vitamin B12",
    ],
    is_popular: true,
  },
];