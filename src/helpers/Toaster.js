import toast from 'react-hot-toast';
import { CircleAlert } from 'lucide-react';


export const toastrSuccess = (message) => {
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

export const toastrWarning = (message) => {
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


export const toastrError = (message) => {
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

