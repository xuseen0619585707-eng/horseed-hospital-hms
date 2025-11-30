import { Patient, PatientStatus } from './types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P-1001',
    name: 'Amina Farah',
    age: 34,
    gender: 'Female',
    admissionDate: '2024-10-24',
    diagnosis: 'Acute Bronchitis',
    doctor: 'Dr. Abdi Hassan',
    status: PatientStatus.Recovering,
    roomNumber: '302-A',
  },
  {
    id: 'P-1002',
    name: 'Mohamed Ali',
    age: 58,
    gender: 'Male',
    admissionDate: '2024-10-25',
    diagnosis: 'Hypertension Crisis',
    doctor: 'Dr. Sarah Egal',
    status: PatientStatus.Stable,
    roomNumber: '205-B',
  },
  {
    id: 'P-1003',
    name: 'Khadija Omar',
    age: 72,
    gender: 'Female',
    admissionDate: '2024-10-26',
    diagnosis: 'Post-Op Hip Replacement',
    doctor: 'Dr. James Smith',
    status: PatientStatus.Critical,
    roomNumber: 'ICU-04',
  },
  {
    id: 'P-1004',
    name: 'Yusuf Ibrahim',
    age: 22,
    gender: 'Male',
    admissionDate: '2024-10-26',
    diagnosis: 'Fractured Tibia',
    doctor: 'Dr. Abdi Hassan',
    status: PatientStatus.Stable,
    roomNumber: '104-C',
  },
  {
    id: 'P-1005',
    name: 'Leyla Warsame',
    age: 45,
    gender: 'Female',
    admissionDate: '2024-10-23',
    diagnosis: 'Migraine / Neurology',
    doctor: 'Dr. Sarah Egal',
    status: PatientStatus.Discharged,
    roomNumber: '-',
  }
];

export const CHART_DATA = [
  { name: 'Mon', patients: 120 },
  { name: 'Tue', patients: 145 },
  { name: 'Wed', patients: 132 },
  { name: 'Thu', patients: 156 },
  { name: 'Fri', patients: 189 },
  { name: 'Sat', patients: 98 },
  { name: 'Sun', patients: 85 },
];