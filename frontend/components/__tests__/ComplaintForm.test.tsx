import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ComplaintForm from '../ComplaintForm';

describe('ComplaintForm', () => {
    it('renders complaint form fields', () => {
        render(<ComplaintForm onSuccess={jest.fn()} />);
        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/agency/i)).toBeInTheDocument();
    });
});
