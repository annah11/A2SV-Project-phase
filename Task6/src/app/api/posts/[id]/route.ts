import { NextRequest, NextResponse } from 'next/server';
import { data } from '../../data';
import { JobPost, JobPosting } from '@/type/type';
import next from 'next';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const response = data.job_postings.find((ele) => ele.id === id);
  if (!response) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(response);
}