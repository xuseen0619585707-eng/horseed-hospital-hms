import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  Activity, Users, Calendar, Brain, Search, Bell, Plus, 
  HeartPulse, Mail, Lock, Eye, EyeOff, X 
} from 'lucide-react';

// =======================
// 1. TYPES
// =======================

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  doctor: string;
  status: string;
  roomNumber: string;
}

// Chart data (Visual mock for dashboard)
const CHART_DATA = [
  { name: 'Mon', patients: 120 },
  { name: 'Tue', patients: 135 },
  { name: 'Wed', patients: 128 },
  { name: 'Thu', patients: 155 },
  { name: 'Fri', patients: 190 },
  { name: 'Sat', patients: 140 },
  { name: 'Sun', patients: 130 },
];

// =======================
// 2. HELPER COMPONENTS
// =======================

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="bg-blue-600 p-2 rounded-lg text-white">
      <Activity size={20} />
    </div>
    <div>
      <h1 className="text-xl font-bold text-slate-900 leading-none">Horseed.</h1>
      <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Medical System</p>
    </div>
  </div>
);

// --- Login Component (Vercel Ready) ---
const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // 1. Success (Status 200)
      if (res.ok) {
        onLogin();
      } 
      // 2. Wrong Password (Status 401)
      else if (res.status === 401) {
        setError('Your password and username is incorrect');
      } 
      // 3. Server Error (Status 500, 404, etc.)
      else {
        setError('The server not connected');
      }

    } catch (err) {
      // 4. Network Error (Internet down or Vercel crashed)
      setError('The server not connected');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-center">
          <div className="mx-auto bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-sm mb-4">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Horseed</h2>
          <p className="text-blue-100 mt-2">Medical Management System</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-600">Username</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input 
                  type="text" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  className="w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="admin" 
                  required 
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input 
                  type={showPass ? 'text' : 'password'} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="••••••••" 
                  required 
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-slate-400">
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button disabled={isLoading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all">
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Add Patient Modal (Vercel Ready) ---
const AddPatientModal = ({ isOpen, onClose, onRefresh }: { isOpen: boolean; onClose: () => void; onRefresh: () => void }) => {
  if (!isOpen) return null;
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', diagnosis: '', doctor: 'Dr. Warsame', status: 'Stable', room: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        // UPDATED: Use relative path for Vercel
        await fetch('/api/add_patient', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        onRefresh(); // Reload list
        onClose();
        setFormData({ name: '', age: '', gender: 'Male', diagnosis: '', doctor: 'Dr. Warsame', status: 'Stable', room: '' });
    } catch (error) {
        console.error("Failed to add patient");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Patient</h2>
          <button onClick={onClose}><X className="text-slate-400 hover:text-red-500" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded-lg w-full" required />
             <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" type="number" className="border p-2 rounded-lg w-full" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded-lg w-full">
                <option>Male</option><option>Female</option>
             </select>
             <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded-lg w-full">
                <option>Stable</option><option>Critical</option><option>Recovering</option>
             </select>
          </div>
          <input name="diagnosis" value={formData.diagnosis} onChange={handleChange} placeholder="Diagnosis" className="border p-2 rounded-lg w-full" required />
          <div className="grid grid-cols-2 gap-4">
             <input name="doctor" value={formData.doctor} onChange={handleChange} placeholder="Doctor" className="border p-2 rounded-lg w-full" />
             <input name="room" value={formData.room} onChange={handleChange} placeholder="Room Number" className="border p-2 rounded-lg w-full" />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Record</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =======================
// 3. MAIN APP COMPONENT
// =======================

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Real Data State
  const [patients, setPatients] = useState<Patient[]>([]);

  // FETCH PATIENTS FROM PYTHON (Vercel Ready)
  const fetchPatients = async () => {
    try {
      // UPDATED: Use relative path for Vercel
      const res = await fetch('/api/patients');
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchPatients();
    }
  }, [isAuthenticated]);

  // Filter Logic
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Auth Check ---
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // --- Main Dashboard ---
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      
      {/* NAVBAR */}
      <nav className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 fixed top-0 w-full z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Logo />
          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl">
            {['dashboard', 'patients', 'schedule'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab === 'dashboard' && <Activity size={16} />}
                {tab === 'patients' && <Users size={16} />}
                {tab === 'schedule' && <Calendar size={16} />}
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search records..." className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm w-64 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
          <button className="relative p-2.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-blue-600 transition-all">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-800">Dr. H. Warsame</p>
              <p className="text-[11px] font-medium text-blue-600 uppercase tracking-wide">Admin</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=H+Warsame&background=0D8ABC&color=fff" alt="Profile" />
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 mt-20 p-6 lg:p-10 max-w-[1600px] mx-auto w-full">

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Hospital Overview</h1>
                <p className="text-slate-500 mt-1">Real-time insights and patient statistics for today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Patients', val: patients.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', change: '+12%' },
                { label: 'Active Surgeries', val: '4', icon: HeartPulse, color: 'text-rose-600', bg: 'bg-rose-50', change: '+4%' },
                { label: 'Pending Appts', val: '12', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50', change: '-2%' },
                { label: 'Doctors on Duty', val: '8', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50', change: '+0%' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <h3 className="text-3xl font-bold text-slate-800 mt-2">{stat.val}</h3>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="mt-4 text-xs font-medium">
                    <span className={`px-2 py-1 rounded-md ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-slate-400 ml-2">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chart */}
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Admittance Trends</h3>
                    <p className="text-sm text-slate-500">Patient intake over the last 7 days</p>
                  </div>
                  <select className="text-sm border border-slate-200 rounded-lg p-2 bg-slate-50">
                    <option>This Week</option>
                    <option>Last Week</option>
                  </select>
                </div>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CHART_DATA}>
                      <defs>
                        <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                      <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                      <Area type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={3} fill="url(#colorPatients)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Card */}
              <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3 relative z-10">
                    <Activity className="w-6 h-6 text-blue-400" />
                    System Health
                  </h3>
                  <div className="mb-8 relative z-10">
                    <div className="flex justify-between text-sm text-slate-300 mb-2">
                      <span>Server Load</span>
                      <span className="text-emerald-400">Optimal</span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full">
                      <div className="bg-emerald-500 h-full w-[28%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>
                  </div>
                </div>
                <div className="relative z-10">
                  <h4 className="text-lg font-semibold mb-1">Horseed Assistant</h4>
                  <p className="text-slate-400 text-sm mb-4">AI module ready to assist with diagnostics & admin queries.</p>
                  <button onClick={() => setIsAiOpen(!isAiOpen)} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white flex items-center justify-center gap-2 transition-all">
                    <Brain className="w-5 h-5 text-blue-300" />
                    {isAiOpen ? 'Close Interface' : 'Open AI Interface'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PATIENTS TAB */}
        {activeTab === 'patients' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Patient Directory</h2>
                <p className="text-slate-500 text-sm">Manage patient records and statuses.</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Filter by name..." className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-full md:w-64 focus:ring-2 focus:ring-blue-100"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <button onClick={() => setIsAddPatientOpen(true)} className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700">
                  <Plus size={16} /> Add Patient
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-medium text-slate-500">ID</th>
                    <th className="px-6 py-4 font-medium text-slate-500">Patient</th>
                    <th className="px-6 py-4 font-medium text-slate-500">Diagnosis</th>
                    <th className="px-6 py-4 font-medium text-slate-500">Doctor</th>
                    <th className="px-6 py-4 font-medium text-slate-500">Status</th>
                    <th className="px-6 py-4 font-medium text-slate-500 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">{patient.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                            {patient.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{patient.name}</p>
                            <p className="text-xs text-slate-400">{patient.age} yrs • {patient.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{patient.diagnosis}</td>
                      <td className="px-6 py-4">{patient.doctor}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          patient.status === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                          patient.status === 'Recovering' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          {patient.status === 'Critical' && <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5 animate-pulse"></span>}
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Edit</button>
                      </td>
                    </tr>
                  ))}
                  {filteredPatients.length === 0 && (
                     <tr>
                        <td colSpan={6} className="text-center py-8 text-slate-400">No patients found.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SCHEDULE TAB */}
        {activeTab === 'schedule' && (
          <div className="flex items-center justify-center h-[500px] border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50">
            <div className="text-center">
              <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4">
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Schedule Module</h3>
              <p className="text-slate-500">Coming soon in next update.</p>
            </div>
          </div>
        )}
      </main>

      {/* MODALS & FLOATING ACTIONS */}
      <AddPatientModal 
        isOpen={isAddPatientOpen} 
        onClose={() => setIsAddPatientOpen(false)} 
        onRefresh={fetchPatients} 
      />
      
      {isAiOpen && (
        <div className="fixed bottom-8 right-8 w-80 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-bottom-10 fade-in">
           <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
              <h4 className="font-bold flex items-center gap-2"><Brain size={16}/> AI Chat</h4>
              <button onClick={() => setIsAiOpen(false)}><X size={16} /></button>
           </div>
           <div className="h-40 bg-slate-800/50 rounded-lg p-3 text-sm text-slate-300 mb-3 overflow-y-auto">
             Hello Dr. Warsame. How can I assist with the patient diagnosis today?
           </div>
           <input className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="Type query..." />
        </div>
      )}
    </div>
  );
};

export default App;