'use client'

import React, {useState, useEffect} from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import moment from 'moment'
import Pagination from '@/components/utilities/Pagination'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

import SelectSingle from '@/components/utilities/select'

import { UserRoundPlus } from 'lucide-react';
import { CaretSortIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";


import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function PreaccountPage(){
  const [preAccount, setPreAccount] = useState({})
  const [countAccount, setCountAccount] = useState(0)
  const [limit, setLimit] = useState(20)
  const [currentPage, setPage] = useState(1)
  const [deleteParams, setDeleteParams] = useState('')

  const [valueUpdate, setValueUpdate] = useState({})

  const [statusSelectInstagram, setStatusSelectInstagram] = useState(1)
  const [statusSelectFacebook, setStatusSelectFacebook] = useState(1)
  const [statusSelectTwitter, setStatusSelectTwitter] = useState(1)
  const [statusSelectTiktok, setStatusSelectTiktok] = useState(1)
  const [statusSelectDetik, setStatusSelectDetik] = useState(1)
  const [statusSelectKompas, setStatusSelectKompas] = useState(1)
  
  const getPreaccountInfo = async (page) => {
    if(!page) page = currentPage
    let offset = (page === 1) ? 0 : ((page - 1) * limit)

    let params = {
      'offset': offset,
      'limit' : limit
    }

    let response = await fetch('/api/Preaccount?act=getPreaccount', {
      method: "POST",
      mode: 'cors',
      cache: 'default',
      // credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)

    })

    const data = await response.json()
    // console.log(data, 'datasss')

    if(page !== currentPage) setPage(page)

    let { code, content } = data
    // console.log(content)

    if(code === 0 && content.results) {
      setPreAccount(content.results)
      setCountAccount(content.count)
      return content.results
    }
  }

  const dialogOpen = async(value) => {
    if(value) {
      setValueUpdate(value)
    }
  }




  const handleDelete = async(email) => {
    let params = {
      email: email
    }
    console.log(params)


  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('email required'),
    password: Yup.string().required('password required'),
    backupCode: Yup.string().required('backup code required'),
    passwordInstagram: Yup.string().required('password required'),
    passwordFacebook: Yup.string().required('password required'),
    passwordDetik: Yup.string().required('password required'),
    msisdnDetik: Yup.string().required('phone number required'),
    usernameTwitter: Yup.string().required('username required'),
  })


  const formik = useFormik({
    validationSchema,
    initialValues: {
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
      // console.log(values)

    // Memisahkan berdasarkan baris dan bergabungkan dengan koma
    const backupCodeArray = values.backupCode
    .split('\n') // Pisahkan berdasarkan newline
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

      console.log('params: ', params)
    }
  })

  const [statusSelectKompasUpdate, setStatusSelectKompasUpdate] = useState('')
  const [statusSelectTiktokUpdate, setStatusSelectTiktokUpdate] = useState('')
  const [statusSelectInstagramUpdate, setStatusSelectInstagramUpdate] = useState('')
  const [statusSelectTwitterUpdate, setStatusSelectTwittermUpdate] = useState('')
  const [statusSelectDetikUpdate, setStatusSelectDetikUpdate] = useState('')
  const [statusSelectFacebookUpdate, setStatusSelectFacebookUpdate] = useState('')

  const formikUpdate = useFormik({
    // validationSchemaUpdate,
    enableReinitialize: true,
    initialValues: {
      emailUpdate: valueUpdate.email || '',
      passwordUpdate: valueUpdate.password || '',
      backupCodeUpdate: valueUpdate.backupCode || '',
      passwordInstagramUpdate: (valueUpdate?.platformLogin?.find(v => v.platform === 'instagram') || {}).password || '',
      usernameTwitterUpdate:  (valueUpdate?.platformLogin?.find(v => v.platform === 'twitter') || {}).username || '' ,
      passwordDetikUpdate: (valueUpdate?.platformLogin?.find(v => v.platform === 'detik') || {}).password || '',
      msisdnDetikUpdate: (valueUpdate?.platformLogin?.find(v => v.platform === 'detik') || {}).msisdn || '',
      passwordFacebookUpdate: (valueUpdate?.platformLogin?.find(v => v.platform === 'facebook') || {}).password || '',
    },
    onSubmit: async(values, {setSubmitting, resetForm}) => {
      // console.log(values)
      resetForm()
      if (
        values.email !== valueUpdate.email ||
        values.password !== valueUpdate.password ||
        values.backupCode !== valueUpdate.backupCode 
        // Tambahkan kondisi untuk setiap input field lainnya
      ) {
        // Kirim data ke backend
        console.log('Data yang dikirim:', values);
        // Tambahkan logika untuk pengiriman data ke backend di sini
      } else {
        console.log('Tidak ada perubahan data');
      }

      setSubmitting(false);

    // Memisahkan berdasarkan baris dan bergabungkan dengan koma
    // const backupCodeArrayUpdate = values.backupCodeUpdate
    // .split('\n') // Pisahkan berdasarkan newline
    // .map(line => line.replace(/\s/g, '')) // Hapus spasi di setiap baris
    // .filter(Boolean); // Hapus baris kosong
  
    // console.log('Backup Code Array:', backupCodeArrayUpdate);

      let params = {
        email: values.emailUpdate,
        password: values.passwordUpdate,
        backupCode: values.backupCodeUpdate,
        platform_login: [
          {
            status: statusSelectInstagramUpdate ? +statusSelectInstagramUpdate : (valueUpdate?.platformLogin?.find(v => v.platform === 'instagram') || {}).status ,
            platform: "instagram",
            needPassword: 1,
            password: values.passwordInstagramUpdate
          },
          {
            status: statusSelectTiktokUpdate ? +statusSelectTiktokUpdate : (valueUpdate?.platformLogin?.find(v => v.platform === 'tiktok') || {}).status,
            platform: "tiktok",
            needPassword: 0
          },
          {
            status: statusSelectTwitterUpdate ? +statusSelectTwitterUpdate : (valueUpdate?.platformLogin?.find(v => v.platform === 'twitter') || {}).status,
            platform: "twitter",
            needPassword: 0,
            username: values.usernameTwitterUpdate
          },
          {
            status: statusSelectDetikUpdate ? +statusSelectDetikUpdate : (valueUpdate?.platformLogin?.find(v => v.platform === 'detik') || {}).status,
            platform: "detik",
            needPassword: 1,
            password: values.passwordDetikUpdate,
            msisdn: values.msisdnDetikUpdate
          },
          {
            status: statusSelectKompasUpdate ? +statusSelectKompasUpdate : (valueUpdate?.platformLogin?.find(v => v.platform === 'kompas') || {}).status,
            platform: "kompas",
            needPassword: 0
          },
          {
            status: statusSelectFacebookUpdate ? +statusSelectFacebookUpdate : (valueUpdate?.platformLogin?.find(v => v.platform === 'facebook') || {}).status ,
            // status: +platformSelect,
            platform: "facebook",
            needPassword: 1,
            password: values.passwordFacebookUpdate
          }
        ]
      }

      console.log('params: ', params)

      setTimeout(() => {
        window.location.reload();
      }, 2200);
      
    }
  })

  const options = [
    { value: "1", label: "Available" },
    { value: "0", label: "Not Available" }
  ]


  useEffect(() => {
    getPreaccountInfo()
    // updatePreaccount()
  }, [])
  

  return (
    <>
      <main>
        <section>
          <div className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
          <h1 className='text-2xl font-semibold my-5 mx-3'>Preaccount List</h1>
            {
              preAccount.length ?
              <>
             <div className='flex justify-between mx-1'>
                <div>
                {
                  countAccount > 1 ?
                  <span className='mx-1 px-2 py-5'>Total: {countAccount} accounts</span>
                  :
                  <span className='mx-1 px-2 py-5'>Total: {countAccount} account</span>
                }
               </div>
               {/* Create Preaccount */}
               <div className='mx-3 px-1'>
                <Dialog>
                  <DialogTrigger asChild><Button variant="success" className="text-lg flex gap-2"><UserRoundPlus size={24} />Create Preaccount</Button></DialogTrigger>
                  <DialogContent className="w-full" style={{ width: '100%', maxWidth: '65rem', height: 'auto' }}>
                    <DialogHeader>
                      <DialogTitle className='text-2xl font-bold'>Create Preaccount</DialogTitle>
                    </DialogHeader>
                    <form method='POST' onSubmit={formik.handleSubmit} className=''>
                      <section className='flex w-full'>
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
                              type='password' 
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
                          </div>
                        </div>
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
                                type='password'
                                placeholder="password..."
                                className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                id="passwordInstagram" 
                                name="passwordInstagram"
                                onChange={formik.handleChange}
                                value={formik.values.passwordInstagram}
                                /> 
                                 {
                                  formik.errors.passwordInstagram && (
                                    <Label className="text-red-500 text-xs mx-1">{formik.errors.passwordInstagram}<span className="text-red-500 mx-1">*</span></Label>
                                )
                                }
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
                                type='password'
                                placeholder="password..."
                                className="col-span-3 border border-[#D1D5DB] mt-1 pt-1 w-[9.67rem] bg-white" 
                                id="passwordFacebook" 
                                name="passwordFacebook"
                                onChange={formik.handleChange}
                                value={formik.values.passwordFacebook}
                                /> 
                                 {
                                  formik.errors.passwordFacebook && (
                                    <Label className="text-red-500 text-xs mx-1">{formik.errors.passwordFacebook}<span className="text-red-500 mx-1">*</span></Label>
                                )
                                }
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
                                 {
                                  formik.errors.usernameTwitter && (
                                    <Label className="text-red-500 text-xs mx-1">{formik.errors.usernameTwitter}<span className="text-red-500 mx-1">*</span></Label>
                                )
                                }
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
                              type='password'
                              placeholder="password..."
                              className="col-span-3 border border-[#D1D5DB] mt-1 pt-1 w-[9.33rem] bg-white"
                              id="passwordDetik" 
                              name="passwordDetik"
                              onChange={formik.handleChange}
                              value={formik.values.passwordDetik}
                              />
                               {
                                  formik.errors.passwordDetik && (
                                    <Label className="text-red-500 text-xs mx-1">{formik.errors.passwordDetik}<span className="text-red-500">*</span></Label>
                                )
                               }
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
                              {
                                  formik.errors.msisdnDetik && (
                                    <Label className="text-red-500 text-xs">{formik.errors.msisdnDetik}<span className="text-red-500">*</span></Label>
                                )
                              } 
                            </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <div className=''>
                        <Button type='submit' className="w-full">Submit</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
               </div>
              </div>
              {/* Table Preaccount */}
              <div className='rounded-md border mx-4 my-5'>
                <Table className="bg-secondary rounded-sm">
                  <TableHeader className="text-center items-center bg-primary">
                    <TableRow>
                      <TableHead className="text-secondary">Date Create</TableHead>
                      <TableHead className="text-secondary">Email</TableHead>
                      <TableHead className="text-secondary">Backup Code</TableHead>
                      <TableHead className="text-secondary">Status</TableHead>
                      <TableHead className="text-secondary">Status Activity</TableHead>
                      <TableHead className="text-secondary">Last Activity</TableHead>
                      <TableHead className="text-secondary">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      // console.log(preAccount, 'sss')
                      preAccount.map((value, index) => {
                        // console.log('getVall:', value)
                        // setDeleteParams(value.email)
                        const backupCodeList = value.backupCode.map((v, i) => {
                          // console.log(v, 'sssss')
                          return (
                          <div className='font-medium' key={i}>
                            <ul className='list-disc'>
                              <li>{v}</li>
                            </ul>
                          </div>
                          )
                        })
                        return (
                          <TableRow className="hover:bg-white">
                            <TableCell>{moment.utc(value.dateCreate).format('YYYY-MM-DD HH:mm')}</TableCell>
                            <TableCell>{value.email}</TableCell>
                            <TableCell>{backupCodeList}</TableCell>
                            <TableCell>{value.status === 1 ? <Badge variant="success">Available</Badge> : <Badge variant="danger">Not Available</Badge>}</TableCell>
                            <TableCell><div className=''>{value.statusActivity}</div></TableCell>
                            <TableCell>{moment.utc(value.lastActivity).format('YYYY-MM-DD HH:mm')}</TableCell>
                            <TableCell>
                              <div className='flex gap-1'>
                                {/* View PreAccount */}
                                <Dialog>
                                  <DialogTrigger><Button>View Preaccount</Button></DialogTrigger>
                                  <DialogContent className="w-full" style={{ width: '90%', maxWidth: '65rem' }}>
                                    <DialogHeader><DialogTitle>View Preaccounts</DialogTitle></DialogHeader>
                                    <Table className="bg-secondary rounded-sm">
                                      <TableHeader className="text-center items-center bg-primary">
                                        <TableRow>
                                          <TableHead className="text-secondary">Email</TableHead>
                                          <TableHead className="text-secondary">Status</TableHead>
                                          <TableHead className="text-secondary">Platform</TableHead>
                                          <TableHead className="text-secondary">Password</TableHead>
                                          <TableHead className="text-secondary">Username</TableHead>
                                          <TableHead className="text-secondary">Phone Number</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {value.platformLogin.map((v, i) => {
                                          // console.log(value, 'vall')
                                          return (
                                            <>
                                            <TableRow  className="hover:bg-white">
                                              <TableCell>{value.email}</TableCell>
                                              <TableCell>{v.status === 1 ? <Badge variant="success">Available</Badge> : <Badge variant="danger">Not Available</Badge>}</TableCell>
                                              <TableCell>{v.platform}</TableCell>
                                              <TableCell>{v.password ? v.password : '-'}</TableCell>
                                              <TableCell>{v.username ? v.username : '-'}</TableCell>
                                              <TableCell>{v.msisdn ? v.msisdn : '-'}</TableCell>
                                            </TableRow>
                                            </>
                                          )
                                        })}
                                      </TableBody>
                                    </Table>
                                  </DialogContent>
                                </Dialog>
                                {/* Edit PreAccount */}
                                <Dialog onOpenChange={() => {dialogOpen(value)} }>
                                  <DialogTrigger asChild><Button variant="success">Edit Preaccount</Button></DialogTrigger>
                                  <DialogContent className="w-full" style={{ width: '100%', maxWidth: '65rem', height: 'auto' }}>
                                    <DialogHeader><DialogTitle>Edit Preaccount</DialogTitle></DialogHeader>
                                    <form method='POST' onSubmit={formikUpdate.handleSubmit} className=''>
                                        <section className='flex w-full'>
                                          <div className='grow w-1 rounded-sm px-1 m-5 text-primary items-center'>
                                              <div className='my-4'>
                                                <Label htmlFor='emailUpdate' className='font-semibold'>Email</Label>
                                                <Input 
                                                  type='email' 
                                                  className="col-span-3 border border-[#D1D5DB] h-[3rem] bg-white" 
                                                  defaultValue={valueUpdate.email}
                                                  id="emailUpdate"
                                                  name="emailUpdate"
                                                  // value={formikUpdate.valuesUpdate.emailUpdate}
                                                  onChange={formikUpdate.handleChange}
                                                  onBlur={formikUpdate.handleBlur}
                                                  value={formikUpdate.values.emailUpdate}
                                                />
                                              </div>
                                              <div className='my-4'>
                                              <Label htmlFor='name' className='font-semibold'>Password</Label>
                                              <Input 
                                                type='text' 
                                                className="col-span-3 border border-[#D1D5DB] h-[3rem] bg-white" 
                                                defaultValue={valueUpdate.password}
                                                id="passwordUpdate"
                                                name="passwordUpdate"
                                                onChange={formikUpdate.handleChange}
                                                onBlur={formikUpdate.handleBlur}
                                                value={formikUpdate.values.passwordUpdate}
                                                />
                                            </div>
                                            <div className='my-4'>
                                              <Label htmlFor='name' className='font-semibold'>Backup Code</Label>
                                              <Textarea 
                                              type='text'
                                              className="col-span-3 border border-[#D1D5DB] h-[20rem] bg-white" 
                                              defaultValue={valueUpdate.backupCode}
                                              id="backupCodeUpdate"
                                              name="backupCodeUpdate"
                                              onChange={formikUpdate.handleChange}
                                              onBlur={formikUpdate.handleBlur}
                                              value={formikUpdate.values.backupCodeUpdate}
                                              />
                                            </div>
                                          </div>
                                          <div className='grow w-1 rounded-sm px-1 m-5 text-primary items-center'>
                                            <div className='grid grid-cols-2 gap-4 m-2 mx-4 px-3 my-3'>
                                              <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                                                <Label htmlFor='' className='font-semibold ml-1'>Kompas</Label>
                                                <div>
                                                  <small className='text-xs ml-1'>Set Status</small>
                                                  <SelectSingle 
                                                    options={options}
                                                      // placeholders={'Available'}
                                                    // onChange={formikUpdate.handleChange}
                                                    // onChange={(e) => {console.log(e, 'status kompasss')}}
                                                    onChange={(e) => setStatusSelectKompasUpdate(e.value)}
                                                    // id=''
                                                      // defaultValue={valueUpdate?.platformLogin?.map((v) => {
                                                      //   // let {status} = v
                                                      //   // console.log(v.platform, 'platformm')
                                                      //   if(v.platform === 'kompas') {
                                                      //     // console.log(v.status, 'kompasnya')
                                                      //     return {'value': v.status , 'label': v.status === 1 ? 'Available' : 'Not Available'}
                                                      //   }
                                                      // })}
                                                      defaultValue={{
                                                        value: valueUpdate?.platformLogin?.find(v => v.platform === 'kompas')?.status || 0,
                                                        label: valueUpdate?.platformLogin?.find(v => v.platform === 'kompas')?.status === 1 ? 'Available' : 'Not Available',
                                                        isSelected: true
                                                      }}
                                                    />
                                                </div>
                                              </div>
                                              <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                                                <Label htmlFor='' className='font-semibold ml-1'>Tiktok</Label>
                                                <div>
                                                  <small className='text-xs ml-1'>Set Status</small>
                                                  <SelectSingle 
                                                    options={options}
                                                      onChange={(e) => setStatusSelectTiktokUpdate(e.value)}
                                                      defaultValue={{
                                                        value: valueUpdate?.platformLogin?.find(v => v.platform === 'tiktok')?.status || 0,
                                                        label: valueUpdate?.platformLogin?.find(v => v.platform === 'tiktok')?.status === 1 ? 'Available' : 'Not Available',
                                                        isSelected: true
                                                      }}
                                                    />
                                                </div>
                                              </div>
                                              <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                                                <Label htmlFor='' className='font-semibold ml-1'>Instagram</Label>
                                                <div>
                                                  <small className='text-xs ml-1'>Set Status</small>
                                                  <SelectSingle 
                                                    options={options}
                                                    onChange={(e) => setStatusSelectInstagramUpdate(e.value)}
                                                    defaultValue={{
                                                      value: valueUpdate?.platformLogin?.find(v => v.platform === 'instagram')?.status || 0,
                                                      label: valueUpdate?.platformLogin?.find(v => v.platform === 'instagram')?.status === 1 ? 'Available' : 'Not Available',
                                                      isSelected: true
                                                    }}
                                                    />
                                                </div>
                                                <div>
                                                  <small className='text-xs ml-1'>Set Password</small>
                                                  <Input
                                                  type='text'
                                                  className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                                  defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'instagram') || {}).password || ''}
                                                  id="passwordInstagramUpdate"
                                                  name="passwordInstagramUpdate"
                                                  onChange={formikUpdate.handleChange}
                                                  onBlur={formikUpdate.handleBlur}
                                                  value={formikUpdate.values.passwordInstagramUpdate}
                                                  /> 
                                                </div>
                                              </div>
                                              <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                                                <Label htmlFor='' className='font-semibold ml-1'>Facebook</Label>
                                                <div>
                                                  <small className='text-xs ml-1'>Set Status</small>
                                                  <SelectSingle 
                                                    options={options}
                                                    onChange={(e) => setStatusSelectFacebookUpdate(e.value)}
                                                    defaultValue={{
                                                      value: valueUpdate?.platformLogin?.find(v => v.platform === 'facebook')?.status || 0,
                                                      label: valueUpdate?.platformLogin?.find(v => v.platform === 'facebook')?.status === 1 ? 'Available' : 'Not Available',
                                                      isSelected: true
                                                    }}
                                                    />
                                                </div>
                                                <div>
                                                  <small className='text-xs ml-1'>Set Password</small>
                                                  <Input
                                                  type='text'
                                                  className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                                  defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'facebook') || {}).password || ''}
                                                  id="passwordFacebookUpdate"
                                                  name="passwordFacebookUpdate"
                                                  onChange={formikUpdate.handleChange}
                                                  onBlur={formikUpdate.handleBlur}
                                                  value={formikUpdate.values.passwordFacebookUpdate}
                                                  /> 
                                                </div>
                                              </div>
                                              <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                                                <Label htmlFor='' className='font-semibold ml-1'>Twitter</Label>
                                                <div>
                                                  <small className='text-xs ml-1'>Set Status</small>
                                                  <SelectSingle 
                                                    options={options}
                                                    onChange={(e) => setStatusSelectTwittermUpdate(e.value)}
                                                    defaultValue={{
                                                      value: valueUpdate?.platformLogin?.find(v => v.platform === 'twitter')?.status || 0,
                                                      label: valueUpdate?.platformLogin?.find(v => v.platform === 'twitter')?.status === 1 ? 'Available' : 'Not Available'
                                                  }}
                                                    />
                                                </div>
                                                <div>
                                                  <small className='text-xs ml-1'>Set Username</small>
                                                  <Input
                                                  type='text'
                                                  className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                                  defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'twitter') || {}).username || ''}
                                                  id="usernameTwitterUpdate"
                                                  name="usernameTwitterUpdate"
                                                  onChange={formikUpdate.handleChange}
                                                  onBlur={formikUpdate.handleBlur}
                                                  value={formikUpdate.values.usernameTwitterUpdate}
                                                  /> 
                                                </div>
                                              </div>
                                              <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                                                <Label htmlFor='' className='font-semibold ml-1'>Detik</Label>
                                                <div>
                                                  <small className='text-xs ml-1'>Set Status</small>
                                                  <SelectSingle 
                                                    options={options}
                                                    onChange={(e) => setStatusSelectDetikUpdate(e.value)}
                                                    defaultValue={{
                                                      value: valueUpdate?.platformLogin?.find(v => v.platform === 'detik')?.status || 0,
                                                      label: valueUpdate?.platformLogin?.find(v => v.platform === 'detik')?.status === 1 ? 'Available' : 'Not Available'
                                                  }}
                                                    />
                                                </div>
                                                <div>
                                                  <small className='text-xs ml-1'>Set Password</small>
                                                  <Input
                                                  type='text'
                                                  // placeholder="password..."
                                                  className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                                  defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'detik') || {}).password || ''}
                                                  id="passwordDetikUpdate"
                                                  name="passwordDetikUpdate"
                                                  onChange={formikUpdate.handleChange}
                                                  onBlur={formikUpdate.handleBlur}
                                                  value={formikUpdate.values.passwordDetikUpdate}
                                                  /> 
                                                </div>
                                                <div>
                                                  <small className='text-xs ml-1'>Set Phone Number</small>
                                                  <Input
                                                  type='text'
                                                  className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                                  defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'detik') || {}).msisdn || ''}
                                                  id="msisdnDetikUpdate"
                                                  name="msisdnDetikUpdate"
                                                  onChange={formikUpdate.handleChange}
                                                  onBlur={formikUpdate.handleBlur}
                                                  value={formikUpdate.values.msisdnDetikUpdate}
                                                  /> 
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </section>
                                        <div className=''>
                                          <Button type='submit' className="w-full">Submit</Button>
                                        </div>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                                {/* Delete PreAccount */}
                                <Button variant="danger" onClick={() => handleDelete(value.email)}>Delete Preaccount</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </div>
              <div className='flex justify-end mt-4 mx-4'>
                <Pagination length={countAccount} limit={limit} page={currentPage} callback={getPreaccountInfo} />
              </div>
              </>
              :
              <div className='flex justify-center'>Data is not available</div>
            }
          </div>
        </section>
      </main>
    </>
  )
}