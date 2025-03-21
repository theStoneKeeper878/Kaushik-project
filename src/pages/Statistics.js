import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, CheckCircle, Clock } from 'lucide-react';

const Statistics = () => {
  const navigate = useNavigate();

  const stats = [
    { id: 1, student: 'John Doe', participation: '85%', questionsAnswered: 12, lastActive: '2025-02-26' },
    { id: 2, student: 'Jane Smith', participation: '92%', questionsAnswered: 15, lastActive: '2025-02-26' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="mr-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Statistics</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <Users className="h-6 w-6 text-indigo-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-xl font-semibold">24</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-500">Average Participation</p>
              <p className="text-xl font-semibold">88%</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <Clock className="h-6 w-6 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-500">Active Sessions</p>
              <p className="text-xl font-semibold">3</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Performance</h2>
          {stats.map((stat) => (
            <div key={stat.id} className="p-4 bg-white rounded-lg shadow mb-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{stat.student}</h3>
                  <p className="text-sm text-gray-500">Last active: {stat.lastActive}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Participation</p>
                  <p className="text-lg font-semibold text-gray-900">{stat.participation}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Questions</p>
                  <p className="text-lg font-semibold text-gray-900">{stat.questionsAnswered}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
