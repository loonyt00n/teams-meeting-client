import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Mocking useACSClient hook
jest.mock('./useACSClient', () => ({
  useACSClient: jest.fn(() => ({ token: null, error: null })),
}));

describe('App Component', () => {
  test('renders loading message when token is not available', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error message for invalid meeting ID', () => {
    window.history.pushState({}, 'Test page', '/?meetingId=invalid-meeting-id');

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(/Invalid meeting ID format./i)).toBeInTheDocument();
  });

  test('renders error message for missing meeting ID', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(/Please provide a valid meeting ID in the query parameter./i)).toBeInTheDocument();
  });

  test('renders error message for long display name', () => {
    const longDisplayName = 'a'.repeat(101); // 101 characters long
    window.history.pushState({}, 'Test page', `/?meetingId=12345678-1234-1234-1234-123456789012&displayName=${longDisplayName}`);

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(/Display name is too long./i)).toBeInTheDocument();
  });
});
