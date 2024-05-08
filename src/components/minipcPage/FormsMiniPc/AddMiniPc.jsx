'use client'

import React, {useState, useEffect} from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Label } from '../../ui/label'


import { Formik, Form, Field, FieldArray } from 'formik'
import * as Yup from 'yup';

import { Send, Monitor, MonitorUp, Pencil, Trash2} from 'lucide-react'

import toast from 'react-hot-toast';

export default function AddMiniPc(){

    const handleSubmit = async (values) => {
        // console.log(values, ":::Values")
        const {name, ipAddress, port} = values

        let params = {
            name: name,
            ipAddress: ipAddress,
            port: port
        }

        // console.log(params, ':::params')

        try{
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
            console.log('error messsage:', err)
        }
    }


  return (
   <>
    <main>
        <Dialog>
            <DialogTrigger asChild><Button variant='success' className="text-lg"><MonitorUp size={22} className='mr-3' />Add PC List</Button></DialogTrigger>
            <DialogContent className="" style={{'width' : '90rem'}}>
                <DialogHeader><DialogTitle>Add PC List</DialogTitle></DialogHeader>
                <Formik
                    initialValues={{
                        name: '',
                        ipAddress: '',
                        port: ''
                    }}
                    onSubmit={handleSubmit}
                >
                    {({errors, isSubmitting, values}) => (
                        <Form>
                             <div>
                                <Label htmlFor="name" className="">Name</Label>
                                <Field type="text" name="name" placeholder="Input PC name" className="flex h-9 w-full rounded-md border border-1 border-black/10 border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                             </div>
                             <div>
                                <Label htmlFor="ipAddress" className="">IP Address</Label>
                                <Field type="text" name="ipAddress" placeholder="Input IP address" className="flex h-9 w-full rounded-md border border border-1 border-black/10 border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"></Field>
                             </div>
                             <div>
                                <Label htmlFor="ipAddress" className="">Port</Label>
                                <Field type="number" name="port" placeholder="Input port" className="flex h-9 w-full rounded-md border border border-1 border-black/10 border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"></Field>
                             </div>
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
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    </main>
   </>
  )
}