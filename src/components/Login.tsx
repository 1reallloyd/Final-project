import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { AuthForm } from './auth/AuthForm';
import { validatePassword } from '../utils/validation';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      if (!isLogin) {
        const validation = validatePassword(password);
        if (!validation.isValid) {
          throw new Error(validation.error || 'Invalid password');
        }
        await signUp(email, password);
      }
      
      await signIn(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-[#1a237e] p-3 rounded-lg">
            <Shield className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Insurance Claims Analytics
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm
            email={email}
            password={password}
            error={error}
            isLogin={isLogin}
            loading={loading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
            onToggleMode={() => setIsLogin(!isLogin)}
          />
        </div>
      </div>
    </div>
  );
};