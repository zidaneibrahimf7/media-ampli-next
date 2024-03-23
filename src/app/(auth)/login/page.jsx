'use client'
// import Image from "next/image";
import React, {useState} from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { Label } from '@/components/ui/label';

const toasterSuccess = (message) => {
  toast.success(message, {
    style: {
      border: '1px solid #55CD6C',
      padding: '12px',
      color: '#FFFAEE',
      backgroundColor: '#FFFAEE'
    },
    iconTheme: {
      primary: '#FFFAEE',
      secondary: '#55CD6C',
    },
  })
}

const toasterFailed = (message) => {
  toast.error(message, {
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

export default function Login() {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username required'),
    password: Yup.string().required('Password required')
  })
  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values, 'vall')
    }
  })
  
  return (
    <>
      <main className='flex h-screen items-center justify-center'>
        <section className='z-10 max-w-xl w-full items-center flex-col'>
          <div id="title" className='text-center text-lg'>
            <h1>HOLISTIC INTELLIGENT VIRAL EDGE AMPLIFICATION</h1>
          </div>
          <div id="user" className='text-center bg-primary rounded rounded-3xl'>
            {/* <h3 className='text-primary-foreground'>Media Ampli</h3>   */}
            <form className='flex justify-between' onSubmit={formik.handleSubmit}>
              <Input
                className="flex-1 rounded rounded-2xl bg-primary-foreground m-2 p-1"
                placeholder="enter username..."
                type="text"
                name='username'
                id='username'
                onChange={formik.handleChange}
                value={formik.values.username}
              />  
               {formik.errors.username && (
                  toasterSuccess('username tidak diinput')
                  // <Label className="text-red-500 text-xs mx-2">{formik.errors.username}<span className="text-red-500">*</span></Label>
                )}
                
              <Input
                className="flex-1 rounded rounded-2xl bg-primary-foreground m-2 p-1"
                placeholder="enter password..."
                type="password"
                name='password'
                id='password'
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && (
                  toasterFailed('password tidak diinput')
                  // <Label className="text-red-500 text-xs mx-2">{formik.errors.username}<span className="text-red-500">*</span></Label>
                )}  
              <Button variant="success" type='submit' className="mt-2 rounded rounded-2xl mx-2 ">Login</Button>
            </form>
          </div>
        </section>
      </main>
      <Toaster
      position="bottom-right"
      reverseOrder={false}
      />
    </>
  );
}
