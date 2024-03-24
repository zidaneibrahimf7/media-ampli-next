'use client'

import React from 'react' 
import toast from 'react-hot-toast';

export default function ToasterFailed({message}) {
    toast.error(message, {
        style: {
          border: '1px solid hsl(0 100% 64%)',
          padding: '12px',
          color: '#FFFAEE',
          backgroundColor: 'hsl(0 100% 64%)'
        },
        iconTheme: {
          primary: '#FFFAEE',
          secondary: 'hsl(0 100% 64%)'
        },
      })
}