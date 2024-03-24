'use client'

import React from 'react' 
import toast from 'react-hot-toast';
import { CircleAlert } from 'lucide-react';

export default function ToasterWarning({message}) {
    toast(message, {
        icon: <CircleAlert size={23} />,
        style: {
          border: '1px solid hsl(42.07 78.63% 54.12%)',
          padding: '12px',
          color: '#FFFAEE',
          backgroundColor: 'hsl(42.07 78.63% 54.12%)'
        },
        iconTheme: {
          primary: '#FFFAEE',
          secondary: 'hsl(0 100% 64%)'
        },
      })
}