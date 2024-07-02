import React, {useState, useEffect} from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import SelectSingle from '@/components/utilities/select'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from '../../../ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { UserRoundPlus, Eye, EyeOff, Send } from 'lucide-react';
import { toastrSuccess } from '@/helpers/Toaster'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export default function UpdatePreaccount({data}){
  // console.log(data, '::editData::')
  const valueUpdate = data

  const [isOpen, setIsOpen] = useState(false)

  const [statusSelectKompasUpdate, setStatusSelectKompasUpdate] = useState('')
  const [statusSelectTiktokUpdate, setStatusSelectTiktokUpdate] = useState('')
  const [statusSelectInstagramUpdate, setStatusSelectInstagramUpdate] = useState('')
  const [statusSelectTwitterUpdate, setStatusSelectTwittermUpdate] = useState('')
  const [statusSelectDetikUpdate, setStatusSelectDetikUpdate] = useState('')
  const [statusSelectFacebookUpdate, setStatusSelectFacebookUpdate] = useState('')

  const [showPassword, setShowPassword] = useState(false)


  const formik = useFormik({
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
      setSubmitting(false);

    // Memisahkan berdasarkan baris dan bergabungkan dengan koma
    const backupCodeArrayUpdate = values.backupCodeUpdate
      .split(/[\s,]+/) // Pisahkan berdasarkan newline
      .map(line => line.replace(/\s/g, '')) // Hapus spasi di setiap baris
      .filter(Boolean); // Hapus baris kosong

      let params = {
        email: values.emailUpdate,
        password: values.passwordUpdate,
        backupCode: backupCodeArrayUpdate,
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
      

      // console.log('params: ', params)
      mutate(params)

      // let response = await fetch('/api/Preaccount?act=updatePreaccount', {
      //   method: "POST",
      //   mode: 'cors',
      //   cache: 'default',
      //   // credentials: 'same-origin',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(params)
      // })

      // const data = await response.json()
      // // console.log(data, 'data')

      // const { code, content, message} = data

      // if(code === 0 && content) {
      //   toastrSuccess(message)
      // }

      // setTimeout(() => location.reload(), 2000)
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

  const [alertMessage, setAlertMessage] = useState('Update Preaccount Success!')
  const client = useQueryClient()
  const {mutate} = useMutation({
    mutationFn: async (params) => {
      const url = '/api/Preaccount?act=updatePreaccount'
      const response = await fetch(url, {
            method: "POST",
            mode: 'cors',
            cache: 'default',
            // credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
      })
      const result = await response.json()

      const {code, content, message} = result

      setAlertMessage(message)

      if(code === 0) return result
    },
    onSuccess: (data) => {
      client.invalidateQueries({queryKey: ['preaccount']})
      toastrSuccess(alertMessage)
    }
  })

  return (
    <>
        <main>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="success" onClick={() => setIsOpen(true)}>Edit Preaccount</Button>
          </DialogTrigger>
          <DialogContent className="w-full" style={{ width: '100%', maxWidth: '65rem', height: 'auto' }}>
            <DialogHeader>
              <DialogTitle>Edit Preaccount</DialogTitle>
              <form method='POST' onSubmit={formik.handleSubmit}>
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
                          // value={formik.valuesUpdate.emailUpdate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.emailUpdate}
                          disabled={true}
                        />
                    </div>
                    <div className='my-4'>
                      <Label htmlFor='passwordUpdate' className='font-semibold'>Password</Label>
                      <Input 
                          type={showPassword ? 'text' : 'password'} 
                          className="col-span-3 border border-[#D1D5DB] h-[3rem] bg-white" 
                          defaultValue={valueUpdate.password}
                          id="passwordUpdate"
                          name="passwordUpdate"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.passwordUpdate}
                      />
                    </div>
                    <div className='my-4'>
                      <Label htmlFor='backupCodeUpdate' className='font-semibold'>Backup Code</Label>
                      <Textarea 
                        type={showPassword ? 'text' : 'password'}
                        className="col-span-3 border border-[#D1D5DB] h-[20rem] bg-white" 
                        defaultValue={valueUpdate.backupCode}
                        id="backupCodeUpdate"
                        name="backupCodeUpdate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.backupCodeUpdate}
                      />
                        <Button type="button" className="mt-4 flex gap-1" variant="" onClick={() => setShowPassword(!showPassword)}>{!showPassword ? <><Eye size={20} /> Show Password</>: <><EyeOff size={20} />Hide Password</>}</Button>
                     </div>
                  </div>
                  <div className='grow w-1 rounded-sm px-1 m-5 text-primary items-center'>
                    <div className='grid grid-cols-2 gap-4 m-2 mx-4 px-3 my-3'>
                      {/* Kompas */}
                      <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                        <Label htmlFor='' className='font-semibold ml-1'>Kompas</Label>
                        <div>
                          <small className='text-xs ml-1'>Set Status</small>
                            {
                              valueUpdate.platformLogin?.find && valueUpdate.platformLogin.find(v => v.lastActivity) ? (
                                <SelectSingle 
                                  options={optionsDisabled}
                                  isOptionDisabled={(option) => option.isdisabled}
                                  onChange={(e) => setStatusSelectKompasUpdate(e.value)}
                                  defaultValue={{
                                      value: valueUpdate?.platformLogin?.find(v => v.platform === 'kompas')?.status || 0,
                                      label: valueUpdate?.platformLogin?.find(v => v.platform === 'kompas')?.status === 1 ? 'Available' : 'Not Available',
                                      isSelected: true
                                    }}
                                />
                                ) : (
                                <SelectSingle 
                                  options={options}
                                  onChange={(e) => setStatusSelectKompasUpdate(e.value)}
                                  defaultValue={{
                                      value: valueUpdate?.platformLogin?.find(v => v.platform === 'kompas')?.status || 0,
                                      label: valueUpdate?.platformLogin?.find(v => v.platform === 'kompas')?.status === 1 ? 'Available' : 'Not Available',
                                      isSelected: true
                                    }}
                                  />
                                )
                              }
                        </div>
                      </div>
                      {/* Tiktok */}
                      <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                        <Label htmlFor='' className='font-semibold ml-1'>Tiktok</Label>
                        <div>
                        <small className='text-xs ml-1'>Set Status</small>
                          {
                            valueUpdate.platformLogin?.find && valueUpdate.platformLogin.find(v => v.lastActivity) ?
                              (
                                <SelectSingle 
                                  options={optionsDisabled}
                                  isOptionDisabled={(option) => option.isdisabled}
                                  onChange={(e) => setStatusSelectTiktokUpdate(e.value)}
                                  defaultValue={{
                                      value: valueUpdate?.platformLogin?.find(v => v.platform === 'tiktok')?.status || 0,
                                      label: valueUpdate?.platformLogin?.find(v => v.platform === 'tiktok')?.status === 1 ? 'Available' : 'Not Available',
                                      isSelected: true
                                  }}
                                />
                              )
                                :
                              (
                                <SelectSingle 
                                  options={options}
                                  onChange={(e) => setStatusSelectTiktokUpdate(e.value)}
                                  defaultValue={{
                                    value: valueUpdate?.platformLogin?.find(v => v.platform === 'tiktok')?.status || 0,
                                    label: valueUpdate?.platformLogin?.find(v => v.platform === 'tiktok')?.status === 1 ? 'Available' : 'Not Available',
                                    isSelected: true
                                  }}
                                />
                                )
                           }
                        </div>
                      </div>
                      {/* Instagram */}
                      <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                        <Label htmlFor='' className='font-semibold ml-1'>Instagram</Label>
                        <div>
                          <small className='text-xs ml-1'>Set Status</small>
                            {
                              valueUpdate.platformLogin?.find && valueUpdate.platformLogin.find(v => v.lastActivity) ?
                              (
                                <SelectSingle 
                                  options={optionsDisabled}
                                  isOptionDisabled={(option) => option.isdisabled}
                                  onChange={(e) => setStatusSelectInstagramUpdate(e.value)}
                                  defaultValue={{
                                    value: valueUpdate?.platformLogin?.find(v => v.platform === 'instagram')?.status || 0,
                                    label: valueUpdate?.platformLogin?.find(v => v.platform === 'instagram')?.status === 1 ? 'Available' : 'Not Available',
                                    isSelected: true
                                  }}
                                />
                                ) 
                                  :
                                (
                                  <SelectSingle 
                                    options={options}
                                    onChange={(e) => setStatusSelectInstagramUpdate(e.value)}
                                    defaultValue={{
                                      value: valueUpdate?.platformLogin?.find(v => v.platform === 'instagram')?.status || 0,
                                      label: valueUpdate?.platformLogin?.find(v => v.platform === 'instagram')?.status === 1 ? 'Available' : 'Not Available',
                                      isSelected: true
                                    }}
                                  />
                              )
                            }
                        </div>
                        <div>
                          <small className='text-xs ml-1'>Set Password</small>
                            {
                              valueUpdate?.platformLogin?.find(v => v.platform === 'instagram')?.status === 0 ?
                                <>
                                  <Input
                                    type={showPassword ? 'text' : 'password'}
                                    className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                    defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'instagram') || {}).password || ''}
                                    id="passwordInstagramUpdate"
                                    name="passwordInstagramUpdate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.passwordInstagramUpdate}
                                    disabled={true}
                                  /> 
                                </>
                                :
                                <>
                                  <Input
                                    type={showPassword ? 'text' : 'password'}
                                    className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                    defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'instagram') || {}).password || ''}
                                    id="passwordInstagramUpdate"
                                    name="passwordInstagramUpdate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.passwordInstagramUpdate}
                                  /> 
                                </>
                            }
                        </div>
                      </div>
                      {/* Facebook */}
                      <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                        <Label htmlFor='' className='font-semibold ml-1'>Facebook</Label>
                        <div>
                          <small className='text-xs ml-1'>Set Status</small>
                          {
                             valueUpdate.platformLogin?.find && valueUpdate.platformLogin.find(v => v.lastActivity) ?
                              (
                                <SelectSingle 
                                  options={optionsDisabled}
                                  isOptionDisabled={(option) => option.isdisabled}
                                  onChange={(e) => setStatusSelectFacebookUpdate(e.value)}
                                  defaultValue={{
                                    value: valueUpdate?.platformLogin?.find(v => v.platform === 'facebook')?.status || 0,
                                    label: valueUpdate?.platformLogin?.find(v => v.platform === 'facebook')?.status === 1 ? 'Available' : 'Not Available',
                                    isSelected: true
                                  }}
                                />
                              )
                              :
                              (
                                <SelectSingle 
                                  options={options}
                                  onChange={(e) => setStatusSelectFacebookUpdate(e.value)}
                                    defaultValue={{
                                      value: valueUpdate?.platformLogin?.find(v => v.platform === 'facebook')?.status || 0,
                                      label: valueUpdate?.platformLogin?.find(v => v.platform === 'facebook')?.status === 1 ? 'Available' : 'Not Available',
                                      isSelected: true
                                  }}
                                />
                              )
                          }
                        </div>
                        <div>
                          <small className='text-xs ml-1'>Set Password</small>
                            {
                              valueUpdate?.platformLogin?.find(v => v.platform === 'facebook')?.status === 0 ||  valueUpdate.platformLogin?.find && valueUpdate.platformLogin.find(v => v.lastActivity) ?
                                <>
                                  <Input
                                    type={showPassword ? 'text' : 'password'}
                                    className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                    defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'facebook') || {}).password || ''}
                                    id="passwordFacebookUpdate"
                                    name="passwordFacebookUpdate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.passwordFacebookUpdate}
                                    disabled={true}
                                  /> 
                                </>
                                :
                                <>
                                  <Input
                                    type={showPassword ? 'text' : 'password'}
                                    className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                    defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'facebook') || {}).password || ''}
                                    id="passwordFacebookUpdate"
                                    name="passwordFacebookUpdate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.passwordFacebookUpdate}
                                    /> 
                                </>
                            }
                        </div>
                      </div>
                      {/* Twitter */}
                      <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                        <Label htmlFor='' className='font-semibold ml-1'>Twitter</Label>
                        <div>
                          <small className='text-xs ml-1'>Set Status</small>
                          {
                            valueUpdate.platformLogin?.find && valueUpdate.platformLogin.find(v => v.lastActivity) ?
                              (
                                <SelectSingle 
                                  options={optionsDisabled}
                                  isOptionDisabled={(option) => option.isdisabled}
                                  onChange={(e) => setStatusSelectTwittermUpdate(e.value)}
                                  defaultValue={{
                                    value: valueUpdate?.platformLogin?.find(v => v.platform === 'twitter')?.status || 0,
                                    label: valueUpdate?.platformLogin?.find(v => v.platform === 'twitter')?.status === 1 ? 'Available' : 'Not Available'
                                    }}
                                />
                              )
                              :
                              (
                                <SelectSingle 
                                  options={options}
                                  onChange={(e) => setStatusSelectTwittermUpdate(e.value)}
                                  defaultValue={{
                                    value: valueUpdate?.platformLogin?.find(v => v.platform === 'twitter')?.status || 0,
                                    label: valueUpdate?.platformLogin?.find(v => v.platform === 'twitter')?.status === 1 ? 'Available' : 'Not Available'
                                  }}
                                />
                              )
                          }
                        </div>
                        <div>
                          <small className='text-xs ml-1'>Set Username</small> 
                            {
                              valueUpdate.platformLogin?.find && valueUpdate.platformLogin.find(v => v.lastActivity) ?
                              <>
                                <Input
                                  type='text'
                                  className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                  defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'twitter') || {}).username || ''}
                                  id="usernameTwitterUpdate"
                                  name="usernameTwitterUpdate"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.usernameTwitterUpdate}
                                  disabled={true}
                                />              
                              </>
                              :
                              <>
                                <Input
                                  type='text'
                                  className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                  defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'twitter') || {}).username || ''}
                                  id="usernameTwitterUpdate"
                                  name="usernameTwitterUpdate"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.usernameTwitterUpdate}
                                /> 
                              </>
                            }
                        </div>
                      </div>
                      {/* Detik */}
                      <div className='shadow shadow-lg p-3 bg-backgroundCell/30 rounded-xl my-1 mr-3'>
                        <Label htmlFor='' className='font-semibold ml-1'>Detik</Label>
                        <div>
                        {
                          valueUpdate.platformLogin?.find && valueUpdate.platformLogin.find(v => v.lastActivity) ?
                            (
                              <SelectSingle 
                                options={optionsDisabled}
                                isOptionDisabled={(option) => option.isdisabled}
                                onChange={(e) => setStatusSelectDetikUpdate(e.value)}
                                defaultValue={{
                                    value: valueUpdate?.platformLogin?.find(v => v.platform === 'detik')?.status || 0,
                                    label: valueUpdate?.platformLogin?.find(v => v.platform === 'detik')?.status === 1 ? 'Available' : 'Not Available'
                                  }}
                              />
                            )
                            :
                            (
                              <SelectSingle 
                                options={options}
                                onChange={(e) => setStatusSelectDetikUpdate(e.value)}
                                defaultValue={{
                                    value: valueUpdate?.platformLogin?.find(v => v.platform === 'detik')?.status || 0,
                                    label: valueUpdate?.platformLogin?.find(v => v.platform === 'detik')?.status === 1 ? 'Available' : 'Not Available'
                                  }}
                              />
                            )
                          }
                        </div>
                        <div>
                          <small className='text-xs ml-1'>Set Password</small>
                          {
                            valueUpdate?.platformLogin?.find(v => v.platform === 'detik')?.status === 0 ||  valueUpdate.platformLogin?.find && valueUpdate.platformLogin.find(v => v.lastActivity) ?
                            <>
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                // placeholder="password..."
                                className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'detik') || {}).password || ''}
                                id="passwordDetikUpdate"
                                name="passwordDetikUpdate"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordDetikUpdate}
                                disabled={true}
                              /> 
                            </>
                            :
                            <>
                                <Input
                                  type={showPassword ? 'text' : 'password'}
                                  // placeholder="password..."
                                  className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                  defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'detik') || {}).password || ''}
                                  id="passwordDetikUpdate"
                                  name="passwordDetikUpdate"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.passwordDetikUpdate}
                                /> 
                             </>
                          }
                        </div>
                        <div>
                          <small className='text-xs ml-1'>Set Phone Number</small>
                          {
                            valueUpdate.platformLogin?.find && valueUpdate.platformLogin.find(v => v.lastActivity) ?
                            <>
                              <Input
                                type='text'
                                className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'detik') || {}).msisdn || ''}
                                id="msisdnDetikUpdate"
                                name="msisdnDetikUpdate"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.msisdnDetikUpdate}
                                disabled={true}
                              /> 
                            </>
                            :
                            <>
                              <Input
                                type='text'
                                className="col-span-3 border-[#D1D5DB] w-[9.67rem] bg-white" 
                                defaultValue={(valueUpdate?.platformLogin?.find(v => v.platform === 'detik') || {}).msisdn || ''}
                                id="msisdnDetikUpdate"
                                name="msisdnDetikUpdate"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.msisdnDetikUpdate}
                              /> 
                            </>
                          }
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
                  <Button type='submit' variant="success" className="w-full">Submit</Button>
                </div> */}
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        </main>
    </>
  )
}