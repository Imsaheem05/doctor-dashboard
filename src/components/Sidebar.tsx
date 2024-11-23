import React, { useState } from 'react';
import { Heart, Users, Calendar, User, Bell, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Dashboard', icon: Users, path: '/' },
  { name: 'Appointments', icon: Calendar, path: '/appointments' },
  { name: 'Patients', icon: User, path: '/patients' },
  { name: 'Messages', icon: Bell, path: '/messages' },
  { name: 'Settings', icon: Settings, path: '/settings' }
];

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? '5rem' : '16rem',
      }}
      className={`fixed left-0 top-0 h-full bg-card border-r border-border p-4 z-50 transition-all duration-300`}
    >
      <div className="flex items-center gap-2 mb-8">
        <Heart className="h-8 w-8 text-primary heart-beat" />
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-xl font-bold text-foreground"
            >
              MedMate
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-secondary'
            }`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <AnimatePresence initial={false}>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <ThemeToggle isCollapsed={isCollapsed} />
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
}