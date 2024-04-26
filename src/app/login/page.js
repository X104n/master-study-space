'use client'
import {useState} from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebaseConfig';
import "./temp.css";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // User is signed in
            console.log(`User signed in: ${userCredential.user}`);
            router.push('/bruker'); // Redirect to user profile page
        } catch (error) {
            // There was an error signing in the user
            console.error(`Error signing in user: ${error}`);
        }
    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', paddingTop: "20px"}}>
                <div className="form-row">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="login-button">Login</button>
                    <button onClick={() => router.push('/signup')} className="login-button">Sign up</button>
                </div>
            </form>
        </div>
    );
}