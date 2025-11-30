import React, { useState } from 'react';
import { CloseIcon } from './Icons';
import { Patient, PatientStatus } from '../types';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (patient: Patient) => void;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    diagnosis: '',
    doctor: '',
    status: PatientStatus.Stable,
    roomNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      id: `P-${Math.floor(Math.random() * 10000)}`, // Simulate ID generation
      name: formData.name,
      age: parseInt(formData.age) || 0,
      gender: formData.gender,
      admissionDate: new Date().toISOString().split('T')[0],
      diagnosis: formData.diagnosis,
      doctor: formData.doctor,
      status: formData.status as PatientStatus,
      roomNumber: formData.roomNumber
    };
    onAdd(newPatient);
    onClose();
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      diagnosis: '',
      doctor: '',
      status: PatientStatus.Stable,
      roomNumber: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 font-display">Register New Patient</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                placeholder="Ex. Amina Farah"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Age</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                placeholder="Ex. 34"
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Gender</label>
              <select 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                value={formData.gender}
                onChange={e => setFormData({...formData, gender: e.target.value})}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Room No.</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                placeholder="Ex. 302-A"
                value={formData.roomNumber}
                onChange={e => setFormData({...formData, roomNumber: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Diagnosis</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
              placeholder="Ex. Acute Bronchitis"
              value={formData.diagnosis}
              onChange={e => setFormData({...formData, diagnosis: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Attending Doctor</label>
               <input 
                required
                type="text" 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                placeholder="Dr. Name"
                value={formData.doctor}
                onChange={e => setFormData({...formData, doctor: e.target.value})}
              />
            </div>
            <div className="space-y-1">
               <label className="text-xs font-semibold text-slate-500 uppercase">Status</label>
               <select 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as PatientStatus})}
              >
                {Object.values(PatientStatus).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all">
              Add Patient Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
