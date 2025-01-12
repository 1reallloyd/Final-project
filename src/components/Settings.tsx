import React, { useState, useEffect } from 'react';
import { 
  User, 
  Camera, 
  Bell, 
  Moon, 
  Sun,
  Mail,
  Phone,
  HelpCircle,
  Clock,
  Database,
  Shield
} from 'lucide-react';

export const Settings = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [notifications, setNotifications] = useState({
    fraudAlerts: true,
    predictionUpdates: true,
    systemNotifications: false
  });
  const [systemPreferences, setSystemPreferences] = useState({
    autoRefresh: true,
    dataEncryption: true
  });

  useEffect(() => {
    // Apply theme change
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSystemPreferenceChange = (key: keyof typeof systemPreferences) => {
    setSystemPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-6">Profile Settings</h3>
          
          <div className="mb-8">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-dark transition-colors duration-200">
                  <Camera size={16} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              
              <div>
                <h4 className="text-lg font-medium">Profile Photo</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Upload a new profile photo
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>

            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200">
              Save Changes
            </button>
          </div>
        </div>

        {/* System Preferences */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">System Preferences</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Theme</h4>
                  <p className="text-sm text-gray-500">Choose your preferred theme</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </div>

              <div>
                <h4 className="font-medium mb-3">Real-Time Updates</h4>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={systemPreferences.autoRefresh}
                    onChange={() => handleSystemPreferenceChange('autoRefresh')}
                    className="form-checkbox text-primary"
                  />
                  <span>Enable automatic data refresh</span>
                </label>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">Notifications</h3>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell size={20} className="text-primary" />
                    <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key as keyof typeof notifications)}
                    className="form-checkbox text-primary"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button 
            onClick={() => alert('Settings saved successfully!')}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};