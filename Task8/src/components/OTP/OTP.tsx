'use client';
import { useEffect, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function OTP() {
  const [value, setValue] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    const sendOTP = async () => {
      const response = await fetch(`https://akil-backend.onrender.com/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: value,
          email: email,
        }),
      });

      const res = await response.json();
      if (!res.success) {
        alert(res.message || 'Verification failed');
        return;
      } else {
        router.push('/api/auth/signin');
      }
    };

    if (value.length === 4 && email) {
      sendOTP();
    }
  }, [value, email]);

  return (
    <div className='w-full flex justify-center'>
      <InputOTP maxLength={4} value={value} onChange={(val) => setValue(val)}>
        <InputOTPGroup className='space-x-3'>
          <InputOTPSlot index={0} className='border-2 rounded-lg border-indigo-800' />
          <InputOTPSlot index={1} className='border-2 rounded-lg border-indigo-800' />
          <InputOTPSlot index={2} className='border-2 rounded-lg border-indigo-800' />
          <InputOTPSlot index={3} className='border-2 rounded-lg border-indigo-800' />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
