import React from 'react';
import { render, screen } from '@testing-library/react';
import StudyRoomForm from './page';
import '@testing-library/jest-dom';

// Mocking the useRouter hook from next/router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      pathname: '/',
      query: '',
      asPath: '',
    };
  },
}));

// Mocking Firebase Auth and its dependencies
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn().mockReturnValue({
    currentUser: { uid: "testUser" } // Simulate that a user is logged in
  }),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({ uid: 'testUser' }); // Immediately invoke callback with user data
    return jest.fn(); // Return a mock unsubscribe function
  })
}));

describe('StudyRoomForm', () => {
  it('renders without crashing', () => {
    render(<StudyRoomForm />);
  });

  it('renders the name input field', () => {
    render(<StudyRoomForm />);
    expect(screen.getByPlaceholderText('Ola Norman')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<StudyRoomForm />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
