import React, { useState } from 'react';
import { X, Mail, Lock, User, LogIn, AlertCircle, Loader } from 'lucide-react';
import { loginWithEmail, registerWithEmail, loginWithGoogle } from '../services/authService';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (isRegister) {
        if (!name.trim()) {
          setError('សូមបញ្ចូលឈ្មោះរបស់អ្នក (Please enter your name)');
          setLoading(false);
          return;
        }
        res = await registerWithEmail(email, password, name);
      } else {
        res = await loginWithEmail(email, password);
      }

      if (res.success) {
        onAuthSuccess(res.user, isRegister ? 'registered' : 'logged_in');
        onClose();
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError(err.message || 'មានបញ្ហាក្នុងការដំណើរការ');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await loginWithGoogle();
      if (res.success) {
        onAuthSuccess(res.user, 'google_logged_in');
        onClose();
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError(err.message || 'បញ្ហាក្នុងការភ្ជាប់ Google Sign-in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'var(--card-bg, #1e1e24)',
          border: '1px solid var(--border-light, rgba(255, 255, 255, 0.12))',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '440px',
          padding: '28px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          position: 'relative',
          color: 'var(--text-primary, #fff)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'inherit'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #ff5e36, #ff9900)',
            fontSize: '1.8rem',
            marginBottom: '10px'
          }}>
            👟
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 6px 0' }}>
            {isRegister ? 'បង្កើតគណនីថ្មី' : 'ចូលគណនី StepUp'}
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary, #9ca3af)', margin: 0 }}>
            {isRegister ? 'Create your StepUp account' : 'Welcome back! Sign in to continue'}
          </p>
        </div>

        {/* Tab switch */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '10px',
          padding: '4px',
          marginBottom: '20px'
        }}>
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(''); }}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              background: !isRegister ? 'var(--accent-primary, #ff5e36)' : 'transparent',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            ចូលគណនី (Sign In)
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(''); }}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              background: isRegister ? 'var(--accent-primary, #ff5e36)' : 'transparent',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            ចុះឈ្មោះ (Sign Up)
          </button>
        </div>

        {/* Google Sign-in Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '11px',
            borderRadius: '10px',
            border: '1px solid var(--border-light, rgba(255,255,255,0.15))',
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            fontSize: '0.92rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '16px',
            transition: 'background 0.2s'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.55 10.79l7.98-6.2z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span>ចូលដោយប្រើ Google</span>
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          margin: '16px 0',
          color: 'var(--text-muted, #6b7280)',
          fontSize: '0.8rem'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span>ឬប្រើអ៊ីមែល (or with email)</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '0.83rem',
            marginBottom: '14px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '6px', fontWeight: 600 }}>
                ឈ្មោះពេញ (Full Name)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="ឧ. វ៉ាន់ សុខា"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-light, rgba(255,255,255,0.15))',
                    color: 'inherit',
                    fontSize: '0.88rem'
                  }}
                  required={isRegister}
                />
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '6px', fontWeight: 600 }}>
              អ៊ីមែល (Email Address)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="yourname@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-light, rgba(255,255,255,0.15))',
                  color: 'inherit',
                  fontSize: '0.88rem'
                }}
                required
              />
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '6px', fontWeight: 600 }}>
              លេខសម្ងាត់ (Password)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="យ៉ាងតិច ៦ តួអក្សរ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-light, rgba(255,255,255,0.15))',
                  color: 'inherit',
                  fontSize: '0.88rem'
                }}
                required
                minLength={6}
              />
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #ff5e36, #ff9900)',
              color: '#fff',
              fontSize: '0.94rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(255, 94, 54, 0.4)'
            }}
          >
            {loading ? <Loader size={18} className="spin" /> : <LogIn size={18} />}
            <span>{isRegister ? 'ចុះឈ្មោះឥឡូវនេះ (Sign Up)' : 'ចូលគណនី (Sign In)'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

