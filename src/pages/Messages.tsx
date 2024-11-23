import React from 'react';
import Header from '../components/Header';
import { Clock } from 'lucide-react';

const messages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    message: 'Hi Dr. Smith, I need to reschedule my appointment for next week.',
    time: '10:30 AM',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    unread: true
  },
  // Add more messages...
];

export default function Messages() {
  return (
    <>
      <Header 
        title="Messages" 
        subtitle="Manage patient communications" 
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Recent Messages</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`p-6 hover:bg-gray-50 transition-colors ${
                message.unread ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={message.image}
                  alt={message.sender}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{message.sender}</h3>
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {message.time}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{message.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}