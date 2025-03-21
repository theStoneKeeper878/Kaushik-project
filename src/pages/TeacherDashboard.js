import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Users, PlayCircle, FileText, HelpCircle, Settings, LogOut, BookOpenCheck } from 'lucide-react';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: BookOpenCheck, label: 'Lectures', path: '/lectures' },
    { icon: BookOpen, label: 'Manage Materials', path: '/materials' },
    { icon: Users, label: 'Start Live Session', path: '/live' },
    { icon: PlayCircle, label: 'Manage Quizzes', path: '/quiz' },
    { icon: FileText, label: 'Statistics', path: '/statistics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Support', path: '/support' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center p-8">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6 relative">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="absolute top-6 right-6 flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-all"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center w-full p-6 bg-white shadow-md rounded-lg border-l-4 border-indigo-500 hover:border-indigo-700 hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
              >
                <Icon className="h-10 w-10 text-indigo-600 group-hover:text-indigo-800 transition-colors duration-300" />
                <h3 className="ml-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-800 transition-colors duration-300">
                  {item.label}
                </h3>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
