import React from 'react';
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AIInsightsProps {
  patientData: any;
}

const healthTrendData = [
  { month: 'Jan', bp: 120, weight: 70, sugar: 95 },
  { month: 'Feb', bp: 125, weight: 71, sugar: 98 },
  { month: 'Mar', bp: 118, weight: 69, sugar: 92 },
  { month: 'Apr', bp: 122, weight: 70, sugar: 94 },
];

export default function AIInsights({ patientData }: AIInsightsProps) {
  const riskFactors = [
    { condition: 'Type 2 Diabetes', probability: 0.15, severity: 'low' },
    { condition: 'Hypertension', probability: 0.25, severity: 'medium' },
    { condition: 'Heart Disease', probability: 0.08, severity: 'low' },
  ];

  const recommendations = [
    'Schedule follow-up appointment in 3 weeks',
    'Consider adjusting medication dosage',
    'Recommend lifestyle modifications',
    'Monitor blood pressure more frequently',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Health Trends */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI-Powered Health Trends</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bp" stroke="#3b82f6" name="Blood Pressure" />
              <Line type="monotone" dataKey="weight" stroke="#10b981" name="Weight" />
              <Line type="monotone" dataKey="sugar" stroke="#f59e0b" name="Blood Sugar" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Risk Analysis</h3>
          </div>
          <div className="space-y-4">
            {riskFactors.map((risk) => (
              <div key={risk.condition} className="bg-secondary p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">{risk.condition}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    risk.severity === 'low' ? 'bg-green-100 text-green-800' :
                    risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {(risk.probability * 100).toFixed(1)}% Risk
                  </span>
                </div>
                <div className="w-full bg-secondary-foreground/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      risk.severity === 'low' ? 'bg-green-500' :
                      risk.severity === 'medium' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${risk.probability * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-secondary rounded-lg"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-foreground">{recommendation}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}