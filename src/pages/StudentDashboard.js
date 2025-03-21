import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, PlayCircle, Settings, HelpCircle, LogOut, BookOpenCheck } from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: BookOpenCheck, label: 'Lectures', path: '/lectures' },
    { icon: BookOpen, label: 'Materials', path: '/materials' },
    { icon: Users, label: 'Live Session', path: '/live-session' },
    { icon: PlayCircle, label: 'Quiz', path: '/quiz' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Support', path: '/support' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="bg-white flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border border-gray-200 hover:bg-indigo-50"
              >
                <Icon className="h-6 w-6 text-indigo-600" />
                <span className="ml-3 text-lg font-semibold text-gray-800">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
