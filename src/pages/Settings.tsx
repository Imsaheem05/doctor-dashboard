import React from 'react';
import Header from '../components/Header';
import { User, Bell, Lock, Globe } from 'lucide-react';

const settingsSections = [
  {
    title: 'Profile Settings',
    icon: User,
    description: 'Update your personal information and preferences',
    fields: [
      { label: 'Full Name', type: 'text', value: 'Dr. John Smith' },
      { label: 'Email', type: 'email', value: 'dr.smith@example.com' },
      { label: 'Phone', type: 'tel', value: '+1 (555) 123-4567' },
      { label: 'Specialization', type: 'text', value: 'General Practice' }
    ]
  },
  // Add more sections...
];

export default function Settings() {
  return (
    <>
      <Header 
        title="Settings" 
        subtitle="Manage your account preferences" 
      />

      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <section.icon className="h-6 w-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                <p className="text-gray-600">{section.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.label} className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="col-span-2 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}