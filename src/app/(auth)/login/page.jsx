// import Image from "next/image";
import React from 'react'
import { Input } from '@/components/ui/input';

export default function Login() {
  
  return (
    <>
      <main className='flex h-screen items-center justify-center'>
        <section className='z-10 max-w-xl w-full items-center flex-col'>
          <div id="title" className='text-center text-lg'>
            <h1>HOLISTIC INTELLIGENT VIRAL EDGE AMPLIFICATION</h1>
          </div>
          <div id="user" className='text-center bg-primary rounded rounded-radius'>
            {/* <h3 className='text-primary-foreground'>Media Ampli</h3>   */}
            <div className='flex justify-between'>
            <Input
              className="flex-1 rounded rounded-radius bg-primary-foreground m-2 p-1"
              placeholder="enter username..."
              type="text"

            />  
            <Input
              className="flex-1 rounded rounded-radius bg-primary-foreground m-2 p-1"
              placeholder="enter password..."
              type="password"
            />  

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
