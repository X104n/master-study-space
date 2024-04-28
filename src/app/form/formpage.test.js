import React from 'react';
import { render } from '@testing-library/react';
import StudyRoomForm from './page';
import * as nextRouter from 'next/navigation';

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

describe('StudyRoomForm', () => {
  it('renders without crashing', () => {
    render(<StudyRoomForm />);
    // Add any assertions here
  });
});
