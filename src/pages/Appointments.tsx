import React, { useState } from 'react';
import Header from '../components/Header';
import { Calendar as CalendarIcon, Clock, User, Phone, Plus } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';

const appointments = [
  {
    id: 1,
    title: 'Sarah Johnson - Follow-up',
    start: '2024-03-20T09:00:00',
    end: '2024-03-20T10:00:00',
    extendedProps: {
      patient: 'Sarah Johnson',
      type: 'Follow-up',
      contact: '+1 (555) 123-4567',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      status: 'Confirmed'
    }
  },
  {
    id: 2,
    title: 'Michael Chen - New Patient',
    start: '2024-03-20T11:00:00',
    end: '2024-03-20T12:00:00',
    extendedProps: {
      patient: 'Michael Chen',
      type: 'New Patient',
      contact: '+1 (555) 234-5678',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      status: 'Pending'
    }
  }
];

export default function Appointments() {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const handleEventClick = (info: any) => {
    setSelectedAppointment(info.event);
  };

  return (
    <>
      <Header 
        title="Appointments" 
        subtitle="Manage your schedule and patient visits" 
      />

      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'calendar'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'list'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            List View
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          New Appointment
        </button>
      </div>

      {view === 'calendar' ? (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={appointments}
            eventClick={handleEventClick}
            height="auto"
            slotMinTime="08:00:00"
            slotMaxTime="18:00:00"
            allDaySlot={false}
            slotDuration="00:30:00"
            expandRows={true}
            stickyHeaderDates={true}
            dayMaxEvents={true}
            eventClassNames="cursor-pointer"
          />
        </div>
      ) : (
        <div className="bg-card rounded-xl shadow-sm border border-border divide-y divide-border">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-6 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={appointment.extendedProps.image}
                    alt={appointment.extendedProps.patient}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {appointment.extendedProps.patient}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {format(new Date(appointment.start), 'MMM dd, yyyy')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {format(new Date(appointment.start), 'hh:mm a')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {appointment.extendedProps.contact}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    appointment.extendedProps.status === 'Confirmed' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {appointment.extendedProps.status}
                  </span>
                  <button className="px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Appointment Details
            </h3>
            <div className="space-y-3">
              <p className="text-foreground">
                <strong>Patient:</strong> {selectedAppointment.extendedProps.patient}
              </p>
              <p className="text-foreground">
                <strong>Type:</strong> {selectedAppointment.extendedProps.type}
              </p>
              <p className="text-foreground">
                <strong>Date:</strong> {format(new Date(selectedAppointment.start), 'PPP')}
              </p>
              <p className="text-foreground">
                <strong>Time:</strong> {format(new Date(selectedAppointment.start), 'p')} - {format(new Date(selectedAppointment.end), 'p')}
              </p>
              <p className="text-foreground">
                <strong>Contact:</strong> {selectedAppointment.extendedProps.contact}
              </p>
              <p className="text-foreground">
                <strong>Status:</strong> {selectedAppointment.extendedProps.status}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}