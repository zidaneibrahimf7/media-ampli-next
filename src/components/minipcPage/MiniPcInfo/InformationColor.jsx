'use client'

import React from 'react'

export default function InformationColor() {
  return (
    <>
     <div className='mx-3 flex gap-2'>
          <div className='flex gap-1'>
              <p className='bg-success text-success px-1 rounded-md'>P</p>
              <label>On</label>
          </div>
          <div className='flex gap-1'>
              <p className='bg-warning text-warning px-1 rounded-md'>P</p>
              <label>Warning</label>
          </div>
          <div className='flex gap-1'>
              <p className='bg-danger text-danger px-1 rounded-md'>P</p>
              <label>Unreachable</label>
          </div>
     </div>
    </>
  )
}