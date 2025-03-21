import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Lock, User } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();

  // State management for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [browserNotifications, setBrowserNotifications] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      email,
      currentPassword,
      newPassword,
      emailNotifications,
      browserNotifications,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Profile Settings Section */}
        <div className="p-6 border-b">
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 text-gray-700" />
            <h2 className="ml-3 text-lg font-semibold text-gray-900">Profile Settings</h2>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Name" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        {/* Security Section */}
        <div className="p-6 border-b">
          <div className="flex items-center mb-4">
            <Lock className="h-6 w-6 text-gray-700" />
            <h2 className="ml-3 text-lg font-semibold text-gray-900">Security</h2>
          </div>
          <div className="space-y-4">
            <input type="password" placeholder="Current Password" className="w-full p-2 border rounded" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder="New Password" className="w-full p-2 border rounded" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
        </div>

        {/* Notification Section */}
        <div className="p-6 border-b">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-gray-700" />
            <h2 className="ml-3 text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
              Email Notifications
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" checked={browserNotifications} onChange={(e) => setBrowserNotifications(e.target.checked)} />
              Browser Notifications
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-6 bg-gray-50">
          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
