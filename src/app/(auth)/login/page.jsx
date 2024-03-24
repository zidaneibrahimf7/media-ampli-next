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
import ToasterSuccess from '@/components/utilities/toastr-success';
import ToasterFailed from '@/components/utilities/toastr-failed';
import ToasterWarning from '@/components/utilities/toastr-warning';

import { redirect } from 'next/navigation';

import { signIn } from 'next-auth/react'

import { Eye, EyeOff } from 'lucide-react'

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
        toast.success('Login success', {
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

        // <ToasterSuccess message={'successfully login'} />

        // setTimeout(() => window.location.replace('/account'), 2200);
        setTimeout(() => redirect('/accounts', 'replace'), 3000)
      }

      if(!loggingIn.ok) {
        toast.error('Invalid Username/Password', {
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
               {/* {formik.errors.username && (
                  // toasterSuccess('username tidak diinput')
                  <ToasterSuccess message={'username tidak diinput'} />
                  // <Label className="text-red-500 text-xs mx-2">{formik.errors.username}<span className="text-red-500">*</span></Label>
                )} */}
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

              {/* {formik.errors.password && (
                  // <ToasterFailed message={"password salah"} />
                  <ToasterWarning message={"wow easy!"} />

                  // <Label className="text-red-500 text-xs mx-2">{formik.errors.password}<span className="text-red-500">*</span></Label>
                )}   */}
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
