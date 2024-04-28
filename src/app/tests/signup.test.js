// Import necessary modules and libraries
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';

// Mocking Firebase auth module for signup
jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
        user: {
            email: 'newuser@example.com'
        }
    })
}));

// Initialize Firebase
const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_project_auth_domain",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_messaging_sender_id",
    appId: "your_app_id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Component: SignupPage
function SignupPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(`User created: ${userCredential.user.email}`);
        } catch (error) {
            console.error(`Error creating user: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

// Tests for the signup page
describe('SignupPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        render(<SignupPage />);
        expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    test('allows input and submits form for signup', async () => {
        render(<SignupPage />);
        await userEvent.type(screen.getByLabelText(/email:/i), 'newuser@example.com');
        await userEvent.type(screen.getByLabelText(/password:/i), 'newpassword');
        await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'newuser@example.com', 'newpassword');
    });
});
