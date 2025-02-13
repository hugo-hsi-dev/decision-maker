import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { z } from 'zod';

export default function RoomCodeForm() {
  const [value, setValue] = useState('');
  const isValidCode = z.string().nanoid().safeParse(value).success;
  return (
    <div className='flex flex-col gap-2 m-24'>
      <Input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        disabled={!isValidCode}
        asChild
      >
        <Link
          to='.'
          from='/app'
          search={{ roomId: value }}
        >
          Enter
        </Link>
      </Button>
    </div>
  );
}
