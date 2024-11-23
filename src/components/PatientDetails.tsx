import React, { useState } from 'react';
import { FileText, Heart, Pill, Clock, Save, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIInsights from './AIInsights';

interface PatientDetailsProps {
  patient: any;
  isNew?: boolean;
}

export default function PatientDetails({ patient, isNew = false }: PatientDetailsProps) {
  const [activeTab, setActiveTab] = useState('health');
  const [editedPatient, setEditedPatient] = useState(patient);

  const tabs = [
    { id: 'health', label: 'Health Summary', icon: Heart },
    { id: 'labs', label: 'Lab Reports', icon: FileText },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'ai', label: 'AI Insights', icon: Brain },
  ];

  const handleInputChange = (section: string, field: string, value: string) => {
    setEditedPatient((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap gap-4 mb-6">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-secondary rounded-lg p-4"
        >
          {activeTab === 'ai' ? (
            <AIInsights patientData={patient} />
          ) : activeTab === 'health' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(patient.healthSummary || {}).map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card p-4 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <p className="text-sm text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  {isNew ? (
                    <input
                      type="text"
                      value={value as string}
                      onChange={(e) => handleInputChange('healthSummary', key, e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="font-medium text-foreground mt-1">{value as string}</p>
                  )}
                </motion.div>
              ))}
            </div>
          ) : activeTab === 'labs' ? (
            <div className="space-y-4">
              {(patient.labReports || []).map((report: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card p-4 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{report.type}</h4>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      report.result === 'Normal'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {report.result}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.details}</p>
                </motion.div>
              ))}
            </div>
          ) : activeTab === 'medications' ? (
            <div className="space-y-4">
              {(patient.medications || []).map((medication: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card p-4 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="font-medium text-foreground">{medication.name}</h4>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <p className="text-muted-foreground">
                      Dosage: <span className="text-foreground">{medication.dosage}</span>
                    </p>
                    <p className="text-muted-foreground">
                      Frequency: <span className="text-foreground">{medication.frequency}</span>
                    </p>
                    <p className="text-muted-foreground">
                      Duration: <span className="text-foreground">{medication.duration}</span>
                    </p>
                    <p className="text-muted-foreground">
                      Started: <span className="text-foreground">{medication.startDate}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {(patient.history || []).map((record: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card p-4 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-foreground">{record.condition}</h4>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{record.treatment}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {isNew && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Patient
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}