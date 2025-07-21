import { NextRequest, NextResponse } from 'next/server';
import { data } from '../../data';
import { JobPost, JobPosting } from '@/type/type';
import next from 'next';

export function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const response = data.job_postings.find((ele) => ele.id === params.id);

  if (!response) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(response);
}