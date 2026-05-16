import React from 'react';
import { X, Apple } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
  onLogin: (name: string) => void;
}

const AuthModal = ({ isOpen, onClose, type, onLogin }: AuthModalProps) => {
  const isLogin = type === 'login';

  if (!isOpen) return null;

  const handleSocialLogin = (provider: string) => {
    // Simulate successful auth with provider name
    onLogin(`${provider} User`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glass-card p-8 m-4 shadow-2xl shadow-primary-500/10 animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Login to access your saved playlists.' : 'Sign up to build your music library.'}
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => handleSocialLogin('Google')}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-bold py-3 rounded-lg transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9c2.11 0 4.05.74 5.58 2l-3.32 3.32c-.65-.45-1.45-.73-2.26-.73-2.54 0-4.6 2.06-4.6 4.6s2.06 4.6 4.6 4.6c1.89 0 3.42-1.14 4.09-2.73h-4.09v-4.27h8.4c.11.49.17.99.17 1.51 0 5.03-3.37 8.6-8.6 8.6z"/>
            </svg>
            Continue with Google
          </button>

          <button 
            onClick={() => handleSocialLogin('Apple')}
            className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] border border-white/10"
          >
            <Apple size={20} fill="white" />
            Continue with Apple
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-500">
          By continuing, you agree to PulseBeat's <br/>
          <span className="text-gray-400 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-gray-400 hover:underline cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
