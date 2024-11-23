import React, { useState } from 'react';
import { Search, FileText, Heart, Pill, Clock, User, Activity, Weight, Ruler, Thermometer } from 'lucide-react';

interface PatientDetails {
  uhmsId: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  contact: string;
  email: string;
  address: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  medicalReports: Array<{
    date: string;
    type: string;
    result: string;
  }>;
  healthSummary: {
    height: string;
    weight: string;
    bp: string;
    sugar: string;
    temperature: string;
    pulse: string;
    bmi: string;
    allergies: string[];
  };
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
  }>;
  history: Array<{
    date: string;
    condition: string;
    treatment: string;
  }>;
}

export default function PatientTabs() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [activeSection, setActiveSection] = useState('medical');
  const [patientData, setPatientData] = useState<PatientDetails | null>(null);

  const handleSearch = () => {
    // Simulating API call with mock data
    setPatientData({
      uhmsId: "UHMS123456",
      name: "John Doe",
      age: 45,
      gender: "Male",
      bloodGroup: "O+",
      contact: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      address: "123 Medical Center Dr, Health City, HC 12345",
      emergencyContact: {
        name: "Jane Doe",
        relation: "Spouse",
        phone: "+1 (555) 987-6543"
      },
      medicalReports: [
        { date: "2024-03-15", type: "Blood Test", result: "Normal" },
        { date: "2024-02-28", type: "X-Ray", result: "Clear" },
        { date: "2024-02-15", type: "ECG", result: "Normal" }
      ],
      healthSummary: {
        height: "175 cm",
        weight: "70 kg",
        bp: "120/80",
        sugar: "98 mg/dL",
        temperature: "98.6°F",
        pulse: "72 bpm",
        bmi: "22.9",
        allergies: ["Penicillin", "Pollen"]
      },
      medications: [
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2024-01-15" },
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2024-02-01" }
      ],
      history: [
        { date: "2024-01-15", condition: "Hypertension", treatment: "Prescribed Lisinopril" },
        { date: "2023-12-10", condition: "Type 2 Diabetes", treatment: "Started on Metformin" }
      ]
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border mt-8 transition-colors duration-300">
      <div className="p-6">
        {!showSearch ? (
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            <Search className="h-4 w-4" />
            Search Patient by UHMS ID
          </button>
        ) : (
          <div className="space-y-6 fade-in">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter UHMS ID"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Search
              </button>
            </div>

            {patientData && (
              <div className="space-y-6 slide-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Basic Info Card */}
                  <div className="stat-card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="flex flex-wrap gap-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${patientData.name}&background=random`}
                        alt={patientData.name}
                        className="w-20 h-20 rounded-full"
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{patientData.name}</h2>
                        <p className="text-muted-foreground">UHMS ID: {patientData.uhmsId}</p>
                        <div className="flex gap-4 mt-2">
                          <span className="text-sm text-muted-foreground">{patientData.email}</span>
                          <span className="text-sm text-muted-foreground">{patientData.contact}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vital Stats */}
                  <div className="stat-card">
                    <Activity className="h-5 w-5 text-primary mb-2" />
                    <h3 className="text-sm text-muted-foreground">Blood Pressure</h3>
                    <p className="font-semibold text-foreground">{patientData.healthSummary.bp}</p>
                  </div>

                  <div className="stat-card">
                    <Heart className="h-5 w-5 text-primary mb-2" />
                    <h3 className="text-sm text-muted-foreground">Pulse Rate</h3>
                    <p className="font-semibold text-foreground">{patientData.healthSummary.pulse}</p>
                  </div>

                  <div className="stat-card">
                    <Weight className="h-5 w-5 text-primary mb-2" />
                    <h3 className="text-sm text-muted-foreground">BMI</h3>
                    <p className="font-semibold text-foreground">{patientData.healthSummary.bmi}</p>
                  </div>

                  <div className="stat-card">
                    <Thermometer className="h-5 w-5 text-primary mb-2" />
                    <h3 className="text-sm text-muted-foreground">Temperature</h3>
                    <p className="font-semibold text-foreground">{patientData.healthSummary.temperature}</p>
                  </div>
                </div>

                {/* Detailed Sections */}
                <div className="border-t border-border pt-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    {['medical', 'health', 'medications', 'history'].map((section) => (
                      <button
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          activeSection === section
                            ? 'bg-primary text-primary-foreground scale-105'
                            : 'text-foreground hover:bg-secondary'
                        }`}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div className="bg-secondary rounded-lg p-4 bounce-in">
                    {activeSection === 'medical' && (
                      <div className="space-y-4">
                        {patientData.medicalReports.map((report, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-card rounded-lg">
                            <div>
                              <p className="font-medium text-foreground">{report.type}</p>
                              <p className="text-sm text-muted-foreground">{report.date}</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              {report.result}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeSection === 'health' && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-card rounded-lg">
                          <p className="text-sm text-muted-foreground">Height</p>
                          <p className="font-medium text-foreground">{patientData.healthSummary.height}</p>
                        </div>
                        <div className="p-3 bg-card rounded-lg">
                          <p className="text-sm text-muted-foreground">Weight</p>
                          <p className="font-medium text-foreground">{patientData.healthSummary.weight}</p>
                        </div>
                        <div className="p-3 bg-card rounded-lg">
                          <p className="text-sm text-muted-foreground">Blood Sugar</p>
                          <p className="font-medium text-foreground">{patientData.healthSummary.sugar}</p>
                        </div>
                      </div>
                    )}

                    {activeSection === 'medications' && (
                      <div className="space-y-4">
                        {patientData.medications.map((medication, index) => (
                          <div key={index} className="p-3 bg-card rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-foreground">{medication.name}</p>
                                <p className="text-sm text-muted-foreground">{medication.dosage} - {medication.frequency}</p>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                Started: {medication.startDate}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeSection === 'history' && (
                      <div className="space-y-4">
                        {patientData.history.map((item, index) => (
                          <div key={index} className="p-3 bg-card rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-foreground">{item.condition}</p>
                                <p className="text-sm text-muted-foreground">{item.treatment}</p>
                              </div>
                              <span className="text-sm text-muted-foreground">{item.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}