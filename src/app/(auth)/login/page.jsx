'use client'
// import Image from "next/image";
import React, {useState} from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

import { redirect } from 'next/navigation';

import { signIn } from 'next-auth/react'

import { Eye, EyeOff } from 'lucide-react'
import { toastrError, toastrSuccess } from '@/helpers/Toaster';

export default function Login() {
  const [loginUpdate, setLoginUpdate] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  // const validationSchema = Yup.object().shape({
  //   username: Yup.string().required('Username required'),
  //   password: Yup.string().required('Password required')
  // })
  const formik = useFormik({
    // validationSchema,
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values) => {
      let loggingIn = await signIn('credentials', {
        username: values.username,
        password: values.password,
        callbackUrl: '/accounts',
        redirect: false
      })
      
      setLoginUpdate(loggingIn)

      if (loggingIn.ok) {
        toastrSuccess('Login success!')
        setTimeout(() => redirect('/accounts', 'replace'), 3000)
      }

      if(!loggingIn.ok) {
        toastrError('Invalid username/Password')
      }

      // if (loggingIn.error) setHasError(true)
    
    }
    })

  
  return (
    <>
      <main className='flex h-screen items-center justify-center'>
        <section className='z-10 max-w-3xl w-full items-center flex-col'>
          <div id="title" className='text-center text-lg'>
            <h1 className='font-bold mb-3 pb-3 text-2xl'>HOLISTIC INTELLIGENT VIRAL EDGE AMPLIFICATION</h1>
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
                 <div className="relative flex-1 mx-3">
                  <Input
                    // className="flex-1 rounded rounded-2xl bg-primary-foreground m-2 p-1"
                    className="w-full bg-transparent rounded rounded-full bg-primary-foreground m-2 p-1"
                    placeholder="enter password..."
                    // type='password'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    id='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                   <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                 </div>
                {
                  formik.isSubmitting === false ?
                  <>
                  <Button variant="success" type='submit' className="mt-2 rounded rounded-2xl mx-2 ">Login</Button>
                  </>
                  :
                  <>
                  <button className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-success text-primary-foreground shadow-sm hover:bg-success-hover h-9 px-4 py-2 mt-2 rounded-2xl mx-2 disabled' disabled>Loading...<span className='loader-mini-loading text-xs mx-1'></span></button>
                  </>
                }
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
