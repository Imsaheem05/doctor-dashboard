import React, { useState } from 'react';
import Header from '../components/Header';
import { Search, FileText, Heart, Pill, Clock, User, Activity, Weight, Ruler, Thermometer, Plus, ChevronRight } from 'lucide-react';
import PatientDetails from '../components/PatientDetails';
import NewPrescription from '../components/NewPrescription';

const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    bloodGroup: "A+",
    contact: "+1 (555) 123-4567",
    email: "sarah.j@example.com",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    healthSummary: {
      height: "165 cm",
      weight: "60 kg",
      bmi: "22.0",
      bloodPressure: "120/80",
      temperature: "98.6°F",
      pulse: "72 bpm",
      allergies: ["Penicillin"]
    },
    labReports: [
      {
        date: "2024-03-15",
        type: "Blood Test",
        result: "Normal",
        details: "All parameters within normal range"
      },
      {
        date: "2024-02-28",
        type: "X-Ray",
        result: "Normal",
        details: "Chest X-ray shows clear lungs"
      }
    ],
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "3 months",
        startDate: "2024-02-01"
      }
    ],
    history: [
      {
        date: "2024-02-01",
        condition: "Hypertension",
        treatment: "Started on Lisinopril"
      }
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    contact: "+1 (555) 234-5678",
    email: "m.chen@example.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    healthSummary: {
      height: "175 cm",
      weight: "70 kg",
      bmi: "22.9",
      bloodPressure: "130/85",
      temperature: "98.4°F",
      pulse: "68 bpm",
      allergies: ["None"]
    },
    labReports: [
      {
        date: "2024-03-10",
        type: "Blood Sugar",
        result: "Elevated",
        details: "Fasting blood sugar: 126 mg/dL"
      }
    ],
    medications: [
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "6 months",
        startDate: "2024-03-10"
      }
    ],
    history: [
      {
        date: "2024-03-10",
        condition: "Type 2 Diabetes",
        treatment: "Started on Metformin"
      }
    ]
  },
  {
    id: 3,
    name: "Emma Wilson",
    age: 28,
    gender: "Female",
    bloodGroup: "B-",
    contact: "+1 (555) 345-6789",
    email: "emma.w@example.com",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    healthSummary: {
      height: "170 cm",
      weight: "65 kg",
      bmi: "22.5",
      bloodPressure: "118/75",
      temperature: "98.5°F",
      pulse: "70 bpm",
      allergies: ["Pollen", "Dust"]
    },
    labReports: [
      {
        date: "2024-03-01",
        type: "Allergy Panel",
        result: "Positive",
        details: "Positive for seasonal allergies"
      }
    ],
    medications: [
      {
        name: "Cetirizine",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "As needed",
        startDate: "2024-03-01"
      }
    ],
    history: [
      {
        date: "2024-03-01",
        condition: "Seasonal Allergies",
        treatment: "Prescribed antihistamines"
      }
    ]
  }
];

export default function Patients() {
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null);
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewPatient = () => {
    setSelectedPatient({
      id: patients.length + 1,
      name: '',
      age: 0,
      gender: '',
      bloodGroup: '',
      contact: '',
      email: '',
      healthSummary: {
        height: '',
        weight: '',
        bmi: '',
        bloodPressure: '',
        temperature: '',
        pulse: '',
        allergies: []
      },
      labReports: [],
      medications: [],
      history: []
    });
  };

  return (
    <>
      <Header 
        title="Patients" 
        subtitle="Manage your patient records" 
      />

      <div className="mb-6 flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-card text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-[300px]"
          />
        </div>
        <button 
          onClick={handleNewPatient}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Patient
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl shadow-sm border border-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Patient List</h2>
            </div>
            <div className="divide-y divide-border">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className="w-full p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors text-left"
                >
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-foreground">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">{patient.email}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <div className="space-y-6">
              <div className="bg-card rounded-xl shadow-sm border border-border p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedPatient.image || `https://ui-avatars.com/api/?name=${selectedPatient.name || 'New Patient'}&background=random`}
                      alt={selectedPatient.name || 'New Patient'}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {selectedPatient.name || 'New Patient'}
                      </h2>
                      {selectedPatient.name && (
                        <p className="text-muted-foreground">
                          {selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.bloodGroup}
                        </p>
                      )}
                    </div>
                  </div>
                  {selectedPatient.name && (
                    <button
                      onClick={() => setShowNewPrescription(true)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      New Prescription
                    </button>
                  )}
                </div>

                <PatientDetails patient={selectedPatient} isNew={!selectedPatient.name} />
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-xl shadow-sm border border-border p-6 text-center text-muted-foreground">
              Select a patient to view their details
            </div>
          )}
        </div>
      </div>

      {showNewPrescription && selectedPatient && (
        <NewPrescription 
          patient={selectedPatient}
          onClose={() => setShowNewPrescription(false)}
        />
      )}
    </>
  );
}