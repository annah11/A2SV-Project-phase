import Image from 'next/image';
import React from 'react';
import Button from '../Buttons/Buttons';
import { JobPost } from '@/type/type';

function JobCard({ data }: { data: JobPost }) {
  return (
    <div className='flex py-4 px-8 border-2 rounded-[30px] space-x-2 my-3'>
      <div className='w-[50px] h-[50px] flex-shrink-0 my-1'>
        <Image
          src={`/assets${data.image}`}
          alt='company logo'
          width={50}
          height={50}
          className='block object-cover'
        />
      </div>
      <div className='max-w-2xl mx-2 space-y-1'>
        <h1 className=''>{data.title}</h1>
        <h3 className='text-xs text-slate-500 font-epilogue'>{data.about.location}</h3>
        <p className='py-1 text-sm font-medium text-justify text-slate-700 font-epilogue'>
          {data.description}
        </p>
        <div className='flex items-center align-middle'>
          <div className='mr-2 border-r-2 '>
            <Button
              background={'bg-green-100'}
              border={''}
              text={'text-green-400'}
              value={'In Person'}
            />
          </div>
          <Button
            background={'bg-slate-50'}
            border={'border border-amber-400'}
            text={'text-yellow-500'}
            value={'Education'}
          />
          <Button
            background={'bg-slate-50'}
            border={'border border-indigo-800'}
            text={'text-indigo-700'}
            value={'IT'}
          />
        </div>
      </div>
    </div>
  );
}

export default JobCard;