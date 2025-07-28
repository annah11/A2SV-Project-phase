'use client';

import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });

export default function SelectSortedBy() {
  const options = [
    { value: 'most-relevant', label: 'Most relevant' },
    { value: 'newest', label: 'Newest' },
    { value: 'highest-rated', label: 'Highest Rated' },
  ];

  return (
    <Select
      options={options}
      className="h-10 m-1 text-sm outline-none w-52"
    />
  );
}
