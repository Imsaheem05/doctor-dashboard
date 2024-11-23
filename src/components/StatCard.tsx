import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const colorMap = {
  blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
  green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
  yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300',
  purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
};

export default function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorMap[color as keyof typeof colorMap]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-muted-foreground text-sm">{title}</h3>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}