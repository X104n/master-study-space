'use client'
import {useState} from 'react';
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}