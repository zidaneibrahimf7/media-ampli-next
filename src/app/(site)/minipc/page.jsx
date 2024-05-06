'use client'

import React, {useState, useEffect} from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { Formik, Form, Field, FieldArray } from 'formik'
import * as Yup from 'yup';

import { Send, Monitor, MonitorUp, Pencil, Trash2} from 'lucide-react'
import Loading from '@/components/utilities/Loading'
import { Badge } from '@/components/ui/badge'

import toast from 'react-hot-toast';

export default function Minipc() {
  const [miniPc, setMinipc] = useState({})
  const [countMinipc, setCountMinipc] = useState('')
  const [done, setDone] = useState(false)
  const [miniPcDevice, setMiniPcDevice] = useState({})
  const [countMiniPcDevice, setCountMinipcDevice] = useState('')
  const [doneDevice, setDoneDevice] = useState(false)
  
  const getListMiniPc = async () => {
    let params = {
      // offset: "",
      // limit: "",
      // search: "1"
    }

    try {
      let response = await fetch('/api/Device?act=minipc', {
        method: "POST",
        mode: 'cors',
        cache: 'default',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
  
      const data = await response.json()
      // console.log(data, 'da')
      const { code, content, message} = data
      setDone(true)
  
      if(code === 0) {
        setMinipc(content.results)
        setCountMinipc(content.count)
      }
    } catch (err) {
      console.log('error message:::', err)
    }

  }

  const handleGetMiniPcDevice = async (miniPcId) => {
    // console.log(miniPcId)

    let params = {
      miniPcId: miniPcId,
      // offset: 0,
      // limit: 10

    }
     // console.log(params, 'asasax')

    try {
      const response = await fetch('/api/Device?act=getMiniPcDevice', {
        method: 'POST',
        body: JSON.stringify(params),
        mode: 'cors',
        cache: 'default'
      })
  
      const data = await response.json()
      // console.log(data, 'asdasda')
      setDoneDevice(true)
      let {code, content, message} = data
  
      if(code === 0) {
        setMiniPcDevice(content.results)
        setCountMinipcDevice(content.count)
      } 

    } catch (err) {
      console.log('error message:::', err)
    }
  }

  const handleSubmit = async (values) => {
    // console.log(values, 'vallss')

    const {name, ipAddress, port} = values

    let params = {
      name: name,
      ipAddress: ipAddress,
      port: port
    }

    // console.log(params)

    try {
      const response = await fetch('/api/Device?act=add-minipc', {
        method: 'POST',
        body: JSON.stringify(params),
        mode: 'cors',
        cache: 'default'
      })

      const data = await response.json()

      let {code, content, message} = data

      if(code === 0) {
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
        setTimeout(() => location.reload(), 2000)
      } else {
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


    } catch (err) {
      console.log(err)
    }

  }

  const handleSubmitUpdate = async (values) => {
    // console.log(values)
    const {nameUpdate, ipAddressUpdate, miniPcId, portUpdate} = values

    let params = {
      name: nameUpdate,
      ipAddress: ipAddressUpdate,
      miniPcId: miniPcId,
      port: portUpdate
    }

    // console.log('params:::', params)
    try {
      const response = await fetch('/api/Device?act=update-minipc', {
        method: 'POST',
        body: JSON.stringify(params),
        mode: 'cors',
        cache: 'default'
      })

      const data = await response.json()
      // console.log(data, 'adas')

      let {code, content, message} = data

      if(code === 0) {
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
        setTimeout(() => location.reload(), 2000)
      } else {
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
    } catch (err) {
      console.log('error response message::::', err)
    }
  }

  const handleDelete = async (miniPcId) => {
    // console.log('qwqwq', miniPcId)
    let params = {
      miniPcId: miniPcId
    }
    // console.log(params)
    try {
      const response = await fetch('/api/Device?act=delete-minipc', {
        method: 'POST',
        body: JSON.stringify(params),
        mode: 'cors',
        cache: 'default'
      })

      const data = await response.json()

      let {code, content, message} = data

       if(code === 0) {
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
        setTimeout(() => location.reload(), 2000)
      } 
      
      else {
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
    } catch (err) {
      console.log('error message:::', err)
    }
  }


  useEffect(() => {
    getListMiniPc()
  }, [])


  return (
    <>
     <section className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
        <h1 className='text-2xl font-semibold my-5 mx-3'>PC List</h1>
        <div className='mx-3 flex gap-2'>
          <div className='flex gap-1'>
              <p className='bg-success text-success px-1 rounded-md'>P</p>
              <label>On</label>
          </div>
          <div className='flex gap-1'>
              <p className='bg-warning text-warning px-1 rounded-md'>P</p>
              <label>Warning</label>
          </div>
          <div className='flex gap-1'>
              <p className='bg-danger text-danger px-1 rounded-md'>P</p>
              <label>Unreachable</label>
          </div>
        </div>
        {
          done ? 
          <>
           <div className='flex justify-between mx-4'>
             <span className=''>Total: {countMinipc} PC</span>
             {/* Add New PC List */}
             <Dialog>
             <DialogTrigger asChild>
                <Button variant='success' className="text-lg"><MonitorUp size={22} className='mr-3' />Add PC List</Button>
             </DialogTrigger>
             <DialogContent className="" style={{'width' : '90rem'}}>
              <DialogHeader>
                <DialogTitle>Add PC List</DialogTitle>
              </DialogHeader>
              <Formik 
                initialValues={{
                  name: '',
                  ipAddress: '',
                  port: ''
                }}
                onSubmit={handleSubmit}
              >
                  {({errors, isSubmitting, values}) => (
                  <div>
                      <Form>
                        <Label htmlFor="name" className="">Name</Label>
                        <Field type="text" name="name" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                        <Label htmlFor="ipAddress" className="">IP Address</Label>
                        <Field type="text" name="ipAddress" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"></Field>
                        <Label htmlFor="ipAddress" className="">Port</Label>
                        <Field type="number" name="port" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"></Field>
                        <div className='flex justify-end mt-4'>
                          {
                           isSubmitting === false ?
                           <>
                            <Button type="submit" variant="success" className="flex gap-2"><Send size={20} />Submit</Button>
                           </>
                           :
                           <>
                           <button className='inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-success text-primary-foreground shadow-sm hover:bg-success-hover px-4 py-2 mt-2 rounded-md disabled' disabled>Loading...<span className='loader-mini-loading text-xs mx-1'></span></button>
                           </>
                          }
                        </div>
                      </Form>
                    </div>
                  )}

              </Formik>
             </DialogContent>
             </Dialog>
          </div>
          <>
          {
            miniPc && countMinipc > 0 ?
            <>
            <div className='grid grid-cols-12 p-2 gap-2 mt-1 mx-3'>
              {
                miniPc.map((v, i) => {
                  // console.log(v, i)
                  let statusPc = ''
                  if(v.statusMiniPc === 'on' && v.deviceCount >= 40) {
                    statusPc ='success'
                  } else if(v.statusMiniPc === 'on' && v.deviceCount < 40) {
                    statusPc ='warning'
                  } else if (v.statusMiniPc === 'unreachable') {
                    statusPc = 'danger'
                  } else {
                    statusPc = 'backgroundPc'
                  }
                  return (
                    <>
                      <div className={`bg-${statusPc} rounded-md p-2 text-center transition ease-in-out hover:-translate-y-1 duration-300`}>
                        <div className=''>
                          <Dialog>
                          <DialogTrigger asChild>
                              <button className='text-center' onClick={() => handleGetMiniPcDevice(v.miniPcId)}>
                                <Monitor size={40} className='text-secondary ml-3' />
                                <Badge variant={'secondary'}>{v.name}</Badge>
                              </button>
                          </DialogTrigger>
                          <DialogContent className="" style={{'width' : '200rem'}}>
                            <DialogHeader>
                              <DialogTitle>
                                <div className='flex justify-between'>
                                    <h3 className='text-2xl font-bold'>{v.name}</h3>
                                    <div className='mt-5 flex gap-2'>
                                      {/* Update Button + Dialog */}
                                      <Dialog>
                                        <DialogTrigger>  <Button variant='' type="button"><Pencil size={20} /></Button></DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Update Mini PC</DialogTitle>
                                          </DialogHeader>
                                          <Formik
                                           initialValues={{
                                            nameUpdate: v.name,
                                            ipAddressUpdate: v.ipAddress,
                                            portUpdate: v.port,
                                            miniPcId: v.miniPcId
                                          }}
                                          onSubmit={handleSubmitUpdate}
                                          >
                                            {({errors, isSubmitting, values}) => (
                                              <div>
                                                <Form>
                                                  <Label htmlFor="nameUpdate" className="">Name</Label>
                                                  <Field type="text" name="nameUpdate" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                                                  <Label htmlFor="ipAddressUpdate" className="">IP Address</Label>
                                                  <Field type="text" name="ipAddressUpdate" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"></Field>
                                                  <Label htmlFor="ipAddressUpdate" className="">Port</Label>
                                                  <Field type="number" name="portUpdate" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"></Field>
                                                  <div className='flex justify-end mt-4'>
                                                    {
                                                      isSubmitting === false ?
                                                      <>
                                                      <Button type="submit" variant="success" className="flex gap-2"><Send size={20} />Update</Button>
                                                      </>
                                                      :
                                                      <>
                                                      <button className='inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-success text-primary-foreground shadow-sm hover:bg-success-hover px-4 py-2 mt-2 rounded-md disabled' disabled>Loading...<span className='loader-mini-loading text-xs mx-1'></span></button>
                                                      </>
                                                    }
                                                  </div>
                                                </Form>
                                              </div>
                                            )}
                                          </Formik>
                                        </DialogContent>
                                      </Dialog>
                                      {/* Delete PC */}
                                      <AlertDialog>
                                      <AlertDialogTrigger><Button type='button' variant='danger'><Trash2 /></Button></AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your PC List from servers.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                                          <Button variant="danger" onClick={() => handleDelete(v.miniPcId)}>Delete</Button>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                      </AlertDialog>
                                      {/* <Button></Button> */}
                                    </div>
                                </div>
                                </DialogTitle>
                              {/* Table after show dialog to know about PC List Info */}
                              <p>IP Address: {v.ipAddress}</p>
                              <p>Port: {v.port}</p>
                              <p>{v.deviceCount > 1 ? <>Total {v.deviceCount} devices</> : <>Total: {v.deviceCount} device</>}</p>
                              <div className='rounded-md border'>
                                {
                                  doneDevice ?
                                  <>
                                    <Table 
                                    className="bg-secondary rounded-sm" 
                                    containerClassname="h-fit max-h-80 overflow-y-auto relative"
                                    >
                                      <TableHeader className="items-center bg-primary">
                                        <TableRow>
                                          <TableHead className="w-[100px] text-secondary">Device ID</TableHead>
                                          <TableHead className="w-[100px] text-secondary">IP</TableHead>
                                          <TableHead className="w-[100px] text-secondary">Port</TableHead>
                                          <TableHead className="w-[100px] text-secondary">Status</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                      
                                          {
                                            miniPcDevice.length && countMiniPcDevice > 0 ?
                                            <>
                                            {
                                              miniPcDevice.map((v, i) => {
                                                // console.log(v, i, 'ss') 
                                                let statusDevice = ''
                                                if(v.status === 'error' || v.status === 'timeout') {
                                                  statusDevice = 'danger/50'
                                                } else if (v.status === 'maintenance') {
                                                  statusDevice = 'yellow-300/30'
                                                }
                                                return (
                                                  <>
                                                  <TableRow className={`bg-${statusDevice}`}>
                                                    <TableCell className="">{v.deviceId}</TableCell>
                                                    <TableCell>{v.ipAddress}</TableCell>
                                                    <TableCell>{v.port}</TableCell>
                                                    <TableCell>{v.status}</TableCell>
                                                    </TableRow>
                                                  </>
                                                )
                                              })
                                            }
                                            </>
                                            :
                                            <>
                                            <TableRow>
                                              <TableCell></TableCell>
                                              <TableCell className="font-medium"><div className='text-center ml-3 pl-3' style={{'width' : '10rem', 'marginLeft' : '3rem'}}>Data is not available</div></TableCell>
                                              <TableCell></TableCell>
                                              <TableCell></TableCell>
                                            </TableRow>
                                            </>
                                          }
                                      </TableBody>
                                    </Table>
                                    <div className='flex justify-end mt-3 mx-4'>
                                        {/* <Pagination length={state.totalAccount} limit={state.limit} page={state.currentPage} callback={(pageNumber) => getAccount(pageNumber, (sortKeyValueAccount ? sortKeyValueAccount : 'name'), valueSortAccount)} /> */}
                                    </div>
                                  </>
                                  :
                                  <>
                                   <div className='flex justify-center'><Loading /></div>
                                  </>
                                }
                              </div>
                            </DialogHeader>
                          </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </>
                  )
                })
              }
              </div>
            </>
            :
            <div className='flex justify-center'>Data is not available</div>
          }
          </>
          </>
          :
          <>
          <div className='flex justify-center'><Loading /></div>
          </>
        }
     </section>
    </>
  )
}