'use client'
import {useState} from 'react';
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';


export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // The user has been created successfully
                console.log(`User created: ${userCredential.user}`);
            })
            .catch((error) => {
                // There was an error creating the user
                console.error(`Error creating user: ${error}`);
            });
    };

    return (
        <div className="form-container">
            <h1>Sign up</h1>
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
                    <button type="submit" className="login-button">Sign up</button>
                    <button onClick={() => router.push('/login')} className="login-button">Login</button>
                </div>
            </form>
        </div>
    );
}