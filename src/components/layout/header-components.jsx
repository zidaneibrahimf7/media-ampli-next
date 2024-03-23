'use client'

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

export default function HeaderComponents() {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className='flex justify-between text-primary p-3 m-1'>
        <h1 className='font-semibold mt-2 text-lg'>HOLISTIC INTELLIGENT VIRAL EDGE AMPLIFICATION</h1> 
        <div className='flex gap-3'>
          <div className='grid grid-flow-row auto-rows-max'>
            <Moment format="D MMMM YYYY HH:mm:ss" className='text-sm' suppressHydrationWarning>{currentTime}</Moment>
            <small className='mb-1'>Welcome, <span className='font-bold'>Admin</span></small>
          </div>
          <Button variant="danger" className='flex gap-1'>
            <LogOut className='text-secondary' size={19}/>
            <p className='text-md mt-0.5'>Log out</p>
          </Button>
        </div>
      </main>
    </>
  );
}
