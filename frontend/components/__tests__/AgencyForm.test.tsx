import { render, screen, fireEvent } from '@testing-library/react';
import AgencyForm from '../AgencyForm';

describe('AgencyForm', () => {
    it('renders form fields', () => {
        render(<AgencyForm agency={null} onSuccess={jest.fn()} onCancel={jest.fn()} />);
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contact email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('calls onCancel when close button is clicked', () => {
        const onCancel = jest.fn();
        render(<AgencyForm agency={null} onSuccess={jest.fn()} onCancel={onCancel} />);
        fireEvent.click(screen.getByRole('button', { name: /×/i }));
        expect(onCancel).toHaveBeenCalled();
    });
});
