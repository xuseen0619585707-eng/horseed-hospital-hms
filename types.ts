import React from 'react';

export enum PatientStatus {
  Stable = 'Stable',
  Critical = 'Critical',
  Recovering = 'Recovering',
  Discharged = 'Discharged'
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  admissionDate: string;
  diagnosis: string;
  doctor: string;
  status: PatientStatus;
  roomNumber: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export interface NavItem {
  label: string;
  id: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}