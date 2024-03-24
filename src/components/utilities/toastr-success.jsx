'use client'

import React from 'react' 
import toast from 'react-hot-toast';

export default function ToasterSuccess({message}) {
    toast.success(message, {
        style: {
          border: '1px solid #55CD6C',
          padding: '12px',
          color: '#FFFAEE',
          backgroundColor: '#55CD6C'
        },
        iconTheme: {
          primary: '#FFFAEE',
          secondary: '#55CD6C',
        },
      })
}