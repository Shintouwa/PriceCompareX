import React, { useState } from 'react';
import { auth, googleProvider, appleProvider, microsoftProvider } from './firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'; // We'll create this for styling

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/'); // Redirect to home after login
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAppleSignIn = async () => {
        try {
            await signInWithPopup(auth, appleProvider);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleMicrosoftSignIn = async () => {
        try {
            await signInWithPopup(auth, microsoftProvider);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signin-container">
            <div className="glass-card">
                <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                <p className="subtitle">Sign in to access live prices and history</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleEmailAuth} className="auth-form">
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="primary-btn">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <div className="social-login">
                    <button onClick={handleGoogleSignIn} className="social-btn google">
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                        <span>Continue with Google</span>
                    </button>
                    <button onClick={handleAppleSignIn} className="social-btn apple">
                        <svg viewBox="0 0 384 512" width="20" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" /></svg>
                        <span>Continue with Apple</span>
                    </button>
                    <button onClick={handleMicrosoftSignIn} className="social-btn microsoft">
                        <svg viewBox="0 0 23 23" width="20" fill="currentColor"><path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z" /></svg>
                        <span>Continue with Microsoft</span>
                    </button>
                </div>

                <p className="toggle-auth">
                    {isSignUp ? 'Already have an account?' : 'Not joined us yet?'}
                    <span onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? ' Sign In!' : ' register now!'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
