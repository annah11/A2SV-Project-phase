import React from 'react';
import { render, screen } from '@testing-library/react';
import JobCard from '@/components/JobCard/JobCard';
import { JobPost } from '@/type/type';

// Mock the Bookmark component
jest.mock('@/components/Bookmark/Bookmarks', () => {
  return function MockBookmark({ id, bookmarked }: { id: string; bookmarked: boolean }) {
    return (
      <button data-testid={`bookmark-${id}`} data-bookmarked={bookmarked}>
        Bookmark
      </button>
    );
  };
});

describe('JobCard Component', () => {
  const mockJobData: JobPost = {
    id: 'test-job-1',
    title: 'Software Developer',
    description: 'We are looking for a talented software developer to join our team.',
    location: 'Addis Ababa, Ethiopia',
    companyName: 'Tech Company',
    logoUrl: '/test-logo.png',
    type: 'Full-time',
    category: 'Technology',
    industry: 'Software',
    viewsCount: 150,
    isBookmarked: false,
  };

  it('renders job card with all required information', () => {
    render(<JobCard data={mockJobData} />);
    
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    expect(screen.getByText('Addis Ababa, Ethiopia')).toBeInTheDocument();
    expect(screen.getByText(/We are looking for a talented software developer/)).toBeInTheDocument();
    expect(screen.getByText('Tech Company')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('renders bookmark component with correct props', () => {
    render(<JobCard data={mockJobData} />);
    
    const bookmarkButton = screen.getByTestId('bookmark-test-job-1');
    expect(bookmarkButton).toBeInTheDocument();
    expect(bookmarkButton).toHaveAttribute('data-bookmarked', 'false');
  });

  it('renders bookmark component with bookmarked state', () => {
    const bookmarkedJobData = { ...mockJobData, isBookmarked: true };
    render(<JobCard data={bookmarkedJobData} />);
    
    const bookmarkButton = screen.getByTestId('bookmark-test-job-1');
    expect(bookmarkButton).toHaveAttribute('data-bookmarked', 'true');
  });

  it('renders job tags correctly', () => {
    render(<JobCard data={mockJobData} />);
    
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Software')).toBeInTheDocument();
  });

  it('renders company logo with fallback', () => {
    render(<JobCard data={mockJobData} />);
    
    const logo = screen.getByAltText('Tech Company logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/test-logo.png');
  });

  it('renders with fallback logo when logoUrl is not provided', () => {
    const jobDataWithoutLogo = { ...mockJobData, logoUrl: undefined };
    render(<JobCard data={jobDataWithoutLogo} />);
    
    const logo = screen.getByAltText('Company logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/job1.png');
  });

  it('renders job title as clickable link', () => {
    render(<JobCard data={mockJobData} />);
    
    const titleLink = screen.getByText('Software Developer').closest('a');
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', '/opportunities/test-job-1');
  });

  it('renders company logo as clickable link', () => {
    render(<JobCard data={mockJobData} />);
    
    const logoLink = screen.getByAltText('Tech Company logo').closest('a');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/opportunities/test-job-1');
  });

  it('renders without optional tags when not provided', () => {
    const jobDataWithoutTags = {
      ...mockJobData,
      type: undefined,
      category: undefined,
      industry: undefined,
    };
    render(<JobCard data={jobDataWithoutTags} />);
    
    expect(screen.queryByText('Full-time')).not.toBeInTheDocument();
    expect(screen.queryByText('Technology')).not.toBeInTheDocument();
    expect(screen.queryByText('Software')).not.toBeInTheDocument();
  });

  it('renders views count with icon', () => {
    render(<JobCard data={mockJobData} />);
    
    expect(screen.getByText('150')).toBeInTheDocument();
    // Check for the eye icon (views icon)
    const viewsContainer = screen.getByText('150').closest('div');
    expect(viewsContainer).toHaveClass('flex', 'items-center', 'text-slate-800');
  });
}); 