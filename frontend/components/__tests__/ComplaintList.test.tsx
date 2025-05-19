/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import ComplaintList from '../ComplaintList';
import React from 'react';

jest.mock('../ComplaintComments', () => () => <div>Comments</div>);

describe('ComplaintList', () => {
    it('renders loading state', () => {
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [[], jest.fn()]).mockImplementationOnce(() => [true, jest.fn()]);
        render(<ComplaintList type="user" />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders complaints timeline', () => {
        const complaints = [
            {
                id: '1',
                agencyId: { name: 'Agency 1' },
                userId: { username: 'User 1' },
                title: 'Test Complaint',
                description: 'Test description',
                status: 'OPEN',
                createdAt: new Date().toISOString(),
                comments: [],
            },
        ];
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [complaints, jest.fn()]).mockImplementationOnce(() => [false, jest.fn()]);
        render(<ComplaintList type="user" />);
        expect(screen.getByText(/test complaint/i)).toBeInTheDocument();
        expect(screen.getByText(/agency 1/i)).toBeInTheDocument();
        expect(screen.getByText(/user 1/i)).toBeInTheDocument();
        expect(screen.getByText(/test description/i)).toBeInTheDocument();
    });
});
