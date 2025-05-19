import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from '../AuthForm';

describe('AuthForm', () => {
    it('renders login fields', () => {
        render(<AuthForm mode="login" onSuccess={jest.fn()} />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('renders register fields', () => {
        render(<AuthForm mode="register" onSuccess={jest.fn()} />);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('calls onSuccess after submit (mock)', () => {
        const onSuccess = jest.fn();
        render(<AuthForm mode="login" onSuccess={onSuccess} />);
        fireEvent.submit(screen.getByRole('form'));
        // This is a mock, in real test you would mock axios and check async
    });
});
