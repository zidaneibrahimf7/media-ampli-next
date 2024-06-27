import React, {useState, useEffect} from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useFormik } from 'formik';
import * as Yup from 'yup'

import SelectSingle from '@/components/utilities/select'

import { UserRoundPlus, Eye, EyeOff, Send } from 'lucide-react';
import { toastrSuccess } from '@/helpers/Toaster'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export default function CreatePreaccount(){
    const [isOpen, setIsOpen] = useState(false)

    const [statusSelectInstagram, setStatusSelectInstagram] = useState(1)
    const [statusSelectFacebook, setStatusSelectFacebook] = useState(1)
    const [statusSelectTwitter, setStatusSelectTwitter] = useState(1)
    const [statusSelectTiktok, setStatusSelectTiktok] = useState(1)
    const [statusSelectDetik, setStatusSelectDetik] = useState(1)
    const [statusSelectKompas, setStatusSelectKompas] = useState(1)

    const [showPassword, setShowPassword] = useState(false)

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('email required'),
        password: Yup.string().required('password required'),
        backupCode: Yup.string().required('backup code required'),
        // passwordInstagram: Yup.string().required('password required'),
        // passwordFacebook: Yup.string().required('password required'),
        // passwordDetik: Yup.string().required('password required'),
        // msisdnDetik: Yup.string().required('phone number required'),
        // usernameTwitter: Yup.string().required('username required').matches(/^@/, 'Username must add @'),
      })

    const formik = useFormik({
        validationSchema,
        initialValues:{
            email: '',
            password: '',
            backupCode: [],
            statusInstagram: '',
            passwordInstagram: "",
            statusTiktok: "",
            statusTwitter: "",
            usernameTwitter: "",
            statusDetik: "",
            passwordDetik: "",
            msisdnDetik: "",
            statusKompas: "",
            statusFacebook: "",
            passwordFacebook: "",
        },
        onSubmit: async(values) => {

            // console.log(values, '::values::')

            // Memisahkan berdasarkan baris dan bergabungkan dengan koma
            const backupCodeArray = values.backupCode
            .split(/[\s,]+/) // Pisahkan berdasarkan koma atau whitespace (termasuk newline)
            .map(line => line.replace(/\s/g, '')) // Hapus spasi di setiap baris
            .filter(Boolean); // Hapus baris kosong
        
            // console.log('Backup Code Array:', backupCodeArray);

            let params = {
                email: values.email,
                password: values.password,
                backupCode: backupCodeArray,
                platform_login: [
                  {
                    status: +statusSelectInstagram,
                    platform: "instagram",
                    needPassword: 1,
                    password: values.passwordInstagram
                  },
                  {
                    status: +statusSelectTiktok,
                    // status: +platformSelect,
                    platform: "tiktok",
                    needPassword: 0
                  },
                  {
                    status: +statusSelectTwitter,
                    // status: +platformSelect,
                    platform: "twitter",
                    needPassword: 0,
                    username: values.usernameTwitter
                  },
                  {
                    status: +statusSelectDetik,
                    // status: +platformSelect,
                    platform: "detik",
                    needPassword: 1,
                    password: values.passwordDetik,
                    msisdn: values.msisdnDetik
                  },
                  {
                    status: +statusSelectKompas,
                    // status: +platformSelect,
                    platform: "kompas",
                    needPassword: 0
                  },
                  {
                    status: +statusSelectFacebook,
                    // status: +platformSelect,
                    platform: "facebook",
                    needPassword: 1,
                    password: values.passwordFacebook
                  }
                ]
              }
        
            //   console.log('params: ', params)
              mutate(params)

            // let response = await fetch('/api/Preaccount?act=createPreaccount', {
            //     method: "POST",
            //     mode: 'cors',
            //     cache: 'default',
            //     // credentials: 'same-origin',
            //     headers: {
            //       'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(params)
            //   })
        
            //   const data = await response.json()
        
            //   const { code, content, message} = data
        
            //   // console.log(data, 'data')
        
            //   if(code === 0 && content) {
            //     toastrSuccess(message)
            //   }

            //   setTimeout(() => location.reload(), 2000)
        }
    })

    const options = [
        { value: "1", label: "Available" },
        { value: "0", label: "Not Available" }
      ]
    
      const optionsDisabled = [
        { value: "1", label: "Available", isdisabled: true },
        { value: "0", label: "Not Available",  isdisabled: true }
      ]

      const [alertMessage, setAlertMessage] = useState('Register Preaccount Success!')
      const client = useQueryClient()
      const {mutate, isPending} = useMutation({
            mutationFn: async(params) => {
                const url = '/api/Preaccount?act=createPreaccount'
                // console.log(url, params, ':YUUKK')
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(params),
                    mode: 'cors',
                    cache: 'default'
              })

              const result = await response.json()
              // console.log(result)
              const {code, content, message} = result
              // console.log(response, '::responseMutation')
              setAlertMessage(message)
              if(code === 0) return result
            },
            onSuccess: (data) => {
              client.invalidateQueries({queryKey: ['preaccount']}),
              toastrSuccess(alertMessage)
            }
      })
  return (
    <>
        <main className='mx-3 px-1'>
            <Dialog open={isOpen}>
                <DialogTrigger asChild>
                    <Button variant="success" className="text-lg flex gap-2" onClick={() => setIsOpen(true)}><UserRoundPlus size={24} />Create Preaccount</Button>
                </DialogTrigger>
                <DialogContent className="w-full overflow-y-scroll max-h-screen" style={{ width: '100%', maxWidth: '65rem' }}>
                    <DialogHeader>
                        <DialogTitle className='text-2xl font-bold'>Create Preaccount</DialogTitle>
                    </DialogHeader>
                    <form method='POST' onSubmit={formik.handleSubmit} >
                        <section className='flex w-full'>

                            {/* Email, Password, and BackupCode */}
                            <div className='grow w-1 rounded-sm px-1 m-5 text-primary items-center'>
                                <div className='my-4'>
                                    <Label htmlFor='email' className='font-semibold'>Email</Label>
                                    <Input 
                                    type='email' 
                                    className="col-span-3 border border-[#D1D5DB] h-[3rem] bg-white" 
                                    id="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                        />
                                    {
                                    formik.errors.email && (
                                        <Label className="text-red-500 text-xs mx-1">{formik.errors.email}<span className="text-red-500 mx-1">*</span></Label>
                                        )
                                    }
                                </div>
                                <div className='my-4'>
                                    <Label htmlFor='name' className='font-semibold'>Password</Label>
                                    <Input 
                                    type={showPassword ? 'text' : 'password'}
                                    className="col-span-3 border border-[#D1D5DB] h-[3rem] bg-white" 
                                    id="password" 
                                    name="password" 
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    />
                                    {
                                    formik.errors.password && (
                                        <Label className="text-red-500 text-xs mx-1">{formik.errors.password}<span className="text-red-500 mx-1">*</span></Label>
                                        )
                                    }
                                </div>
                                <div className='my-4'>
                                    <Label htmlFor='name' className='font-semibold'>Backup Code</Label>
                                    <Textarea 
                                    type='text'
                                    className="col-span-3 border border-[#D1D5DB] h-[20rem] bg-white" 
                                    id="backupCode" 
                                    name="backupCode" 
                                    onChange={formik.handleChange}
                                    value={formik.values.backupCode}
                                    />
                                    {
                                    formik.errors.backupCode && (
                                        <Label className="text-red-500 text-xs mx-1">{formik.errors.backupCode}<span className="text-red-500 mx-1">*</span></Label>
                                        )
                                    }
                                    <Button type="button" className="mt-4 flex gap-1" variant="" onClick={() => setShowPassword(!showPassword)}>{!showPassword ? <><Eye size={20} /> Show Password</>: <><EyeOff size={20} />Hide Password</>}</Button>
                                </div>
                            </div>
                            {/* Platform */}
                            <div className='grow w-1 rounded-sm py-3 m-5 text-black items-center border-primary'>
                                <div className='grid grid-cols-2 gap-4 m-2 mx-4 px-3 my-3'>
                                    <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                                        <Label htmlFor='kompas' className='font-semibold ml-1'>Kompas</Label>
                                        <div>
                                            <small className='text-xs ml-1'>Set Status</small>
                                            <SelectSingle 
                                                options={options}
                                                // placeholders={'Available'}
                                                onChange={(e) => setStatusSelectKompas(e.value)}
                                                // onChange={(e) => setPlatformSelect(e.value)}
                                                defaultValue={{value: "1", label: "Available"}}
                                            />
                                        </div>
                                    </div>
                                    <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 ml-3'>
                                        <Label htmlFor='tiktok' className='font-semibold'>Tiktok</Label>
                                        <div>
                                            <small className='text-xs'>Set Status</small>
                                            <SelectSingle 
                                                options={options}
                                                    // placeholders={'Available'}
                                                onChange={(e) => setStatusSelectTiktok(e.value)}
                                                // onChange={(e) => setPlatformSelect(e.value)}
                                                defaultValue={{value: "1", label: "Available"}}
                                            />
                                        </div>
                                    </div>
                                    <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                                        <Label htmlFor='instagram' className='font-semibold ml-1'>Instagram</Label>
                                        <div>
                                            <small className='text-xs ml-1'>Set Status</small>
                                            <SelectSingle 
                                                options={options}
                                                onChange={(e) => setStatusSelectInstagram(e.value)}
                                                defaultValue={{value: "1", label: "Available"}}
                                            />
                                        </div>
                                        <div>
                                            <small className='text-xs ml-1'>Set Password</small>
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="password..."
                                                className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                                id="passwordInstagram" 
                                                name="passwordInstagram"
                                                onChange={formik.handleChange}
                                                value={formik.values.passwordInstagram}
                                            /> 
                                            {/* {
                                                formik.errors.passwordInstagram && (
                                                    <Label className="text-red-500 text-xs mx-1">{formik.errors.passwordInstagram}<span className="text-red-500 mx-1">*</span></Label>
                                                )
                                            } */}
                                        </div>
                                    </div>
                                    <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 ml-3'>
                                        <Label htmlFor='facebook' className='font-semibold ml-1'>Facebook</Label>
                                        <div>
                                            <small className='text-xs ml-1'>Set Status</small>
                                            <SelectSingle
                                            options={options}
                                            onChange={(e) => setStatusSelectFacebook(e.value)}
                                            // onChange={(e) => setPlatformSelect(e.value)}
                                            defaultValue={options[0]}
                                            />
                                        </div>
                                        <div>
                                            <small className='text-xs ml-1'>Set Password</small>
                                                <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="password..."
                                                className="col-span-3 border border-[#D1D5DB] mt-1 pt-1 w-[9.67rem] bg-white" 
                                                id="passwordFacebook" 
                                                name="passwordFacebook"
                                                onChange={formik.handleChange}
                                                value={formik.values.passwordFacebook}
                                                /> 
                                                {/* {
                                                    formik.errors.passwordFacebook && (
                                                        <Label className="text-red-500 text-xs mx-1">{formik.errors.passwordFacebook}<span className="text-red-500 mx-1">*</span></Label>
                                                    )
                                                } */}
                                        </div>
                                    </div>
                                    <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                                        <Label htmlFor='twitter' className='font-semibold ml-1'>Twitter</Label>
                                        <div>
                                            <small className='text-xs ml-1'>Set Status</small>
                                            <SelectSingle
                                                options={options}
                                                onChange={(e) => setStatusSelectTwitter(e.value)}
                                                // onChange={(e) => setPlatformSelect(e.value)}
                                                defaultValue={options[0]}
                                            />
                                        </div>
                                        <div>
                                            <small className='text-xs ml-1'>Set Username</small>
                                            <Input
                                                type='text'
                                                placeholder="username..."
                                                className="col-span-3 border border-[#D1D5DB] mt-1 pt-1 w-[9.67rem] bg-white" 
                                                id="usernameTwitter" 
                                                name="usernameTwitter"
                                                onChange={formik.handleChange}
                                                value={formik.values.usernameTwitter}
                                                /> 
                                                {/* {
                                                    formik.errors.usernameTwitter && (
                                                        <Label className="text-red-500 text-xs mx-1">{formik.errors.usernameTwitter}<span className="text-red-500">*</span></Label>
                                                    )
                                                } */}
                                        </div>
                                    </div>
                                    <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 ml-3'>
                                        <Label htmlFor='detik' className='font-semibold'>Detik</Label>
                                        <div>
                                            <small className='text-xs ml-1'>Set Status</small>
                                            <SelectSingle
                                                options={options}
                                                onChange={(e) => setStatusSelectDetik(e.value)}
                                                // onChange={(e) => setPlatformSelect(e.value)}
                                                defaultValue={options[0]}
                                            />
                                        </div>
                                        <div>
                                            <small className='text-xs ml-1'>Set Password</small>
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="password..."
                                                className="col-span-3 border border-[#D1D5DB] mt-1 pt-1 w-[9.33rem] bg-white"
                                                id="passwordDetik" 
                                                name="passwordDetik"
                                                onChange={formik.handleChange}
                                                value={formik.values.passwordDetik}
                                            />
                                            {/* {
                                                formik.errors.passwordDetik && (
                                                    <Label className="text-red-500 text-xs mx-1">{formik.errors.passwordDetik}<span className="text-red-500">*</span></Label>
                                                )
                                            } */}
                                        </div>
                                        <div>
                                            <small className='text-xs ml-1'>Set phone number</small>
                                            <Input
                                                type='text'
                                                placeholder="set msisdn detik"
                                                className="col-span-3 border border-[#D1D5DB] mt-1 pt-1 w-[9.33rem] bg-white"
                                                id="msisdnDetik" 
                                                name="msisdnDetik"
                                                onChange={formik.handleChange}
                                                value={formik.values.msisdnDetik}
                                                />
                                            {/* {
                                                formik.errors.msisdnDetik && (
                                                    <Label className="text-red-500 text-xs">{formik.errors.msisdnDetik}<span className="text-red-500">*</span></Label>
                                                )
                                            }  */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                        <DialogFooter className={'flex gap-2'}>
                            <Button type="button" variant="outline" className="bg-white" onClick={() => setIsOpen(false)}>Close</Button>
                            <Button type='submit' variant="success" className="flex gap-2" onClick={() => setIsOpen(false)}><Send size={18} />Submit</Button>
                        </DialogFooter>
                        {/* <div className=''>
                            <Button type='submit' variant="success" className="w-full flex gap-2"><Send size={18} />Submit</Button>
                         </div> */}
                    </form>
                </DialogContent>
            </Dialog>
        </main>
    </>
  )
}