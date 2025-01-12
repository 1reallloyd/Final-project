import React from 'react';
import { Loader2 } from 'lucide-react';

interface AuthFormProps {
  email: string;
  password: string;
  error?: string;
  isLogin: boolean;
  loading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  email,
  password,
  error,
  isLogin,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onToggleMode,
}) => (
  <form className="space-y-6" onSubmit={onSubmit}>
    {error && (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        {error}
      </div>
    )}
    
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        disabled={loading}
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1a237e] focus:ring-[#1a237e] disabled:opacity-50"
      />
    </div>

    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        id="password"
        type="password"
        required
        minLength={6}
        disabled={loading}
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1a237e] focus:ring-[#1a237e] disabled:opacity-50"
      />
      {!isLogin && (
        <p className="mt-1 text-sm text-gray-500">
          Password must be at least 6 characters long
        </p>
      )}
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a237e] hover:bg-[#283593] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a237e] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        isLogin ? 'Sign in' : 'Sign up'
      )}
    </button>

    <div className="text-center">
      <button
        type="button"
        disabled={loading}
        onClick={onToggleMode}
        className="text-sm text-[#1a237e] hover:text-[#283593] disabled:opacity-50"
      >
        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
      </button>
    </div>
  </form>
);