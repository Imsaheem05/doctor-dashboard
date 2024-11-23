import React from 'react';
import { Users, Calendar, Clock, Activity, ChevronRight, MoreVertical } from 'lucide-react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import PatientTabs from '../components/PatientTabs';

const stats = [
  { title: 'Total Patients', value: '1,234', icon: Users, color: 'blue' },
  { title: "Today's Appointments", value: '8', icon: Calendar, color: 'green' },
  { title: 'Pending Reports', value: '6', icon: Clock, color: 'yellow' },
  { title: 'Total Revenue', value: 'Rs 12,345', icon: Activity, color: 'purple' },
];

const appointments = [
  {
    name: 'Sarah Johnson',
    time: '09:00 AM',
    type: 'Follow-up',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    status: 'Confirmed'
  },
  {
    name: 'Michael Chen',
    time: '10:30 AM',
    type: 'New Patient',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    status: 'In Progress'
  },
  {
    name: 'Emma Wilson',
    time: '11:45 AM',
    type: 'Check-up',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    status: 'Scheduled'
  }
];

export default function Dashboard() {
  return (
    <>
      <Header 
        title="Welcome back, Dr. Smith" 
        subtitle="Here's your practice overview" 
      />

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
          <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.name} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-4">
                <img
                  src={appointment.image}
                  alt={appointment.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.name}</h3>
                  <p className="text-sm text-gray-600">{appointment.type}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-medium text-gray-900">{appointment.time}</p>
                  <p className="text-sm text-gray-600">{appointment.status}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PatientTabs />
    </>
  );
}