// Import necessary modules and libraries
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';

// Mocking Firebase auth module
jest.mock("firebase/auth", () => {
    return {
        getAuth: jest.fn(),
        signInWithEmailAndPassword: jest.fn().mockResolvedValue({
            user: {
                email: 'test@example.com'
            }
        })
    };
});

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

// Component: LoginPage
function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(`User signed in: ${userCredential.user.email}`);
            // Redirect to user profile page or perform any other action upon successful login
        } catch (error) {
            console.error(`Error signing in user: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

// Test cases for the login page
describe('LoginPage', () => {
    beforeEach(() => {
        // Reset mock functions before each test
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('allows input to be typed into email and password fields', async () => {
        render(<LoginPage />);
        await userEvent.type(screen.getByLabelText(/email:/i), 'test@example.com');
        await userEvent.type(screen.getByLabelText(/password:/i), 'password123');
        expect(screen.getByLabelText(/email:/i).value).toBe('test@example.com');
        expect(screen.getByLabelText(/password:/i).value).toBe('password123');
    });

    test('submits the form', async () => {
        const user = { email: 'test@example.com', password: 'password123' };
        render(<LoginPage />);
        await userEvent.type(screen.getByLabelText(/email:/i), user.email);
        await userEvent.type(screen.getByLabelText(/password:/i), user.password);

        // Wait for the submit action to resolve
        await userEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, user.email, user.password);
    });
});
