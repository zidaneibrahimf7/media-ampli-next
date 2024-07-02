import React, {useState} from 'react'

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
import { Label } from "@/components/ui/label"

import { Formik, Form, Field, FieldArray } from 'formik'

import { Send, Pencil} from 'lucide-react'

import toast from 'react-hot-toast';
import Modal from '@/components/custom/Modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toastrSuccess, toastrWarning } from '@/helpers/Toaster'

export default function UpdateMiniPc({data}){
    // console.log(data, '::datass')
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = async (values) => {
    // console.log(values, '::valuesss')
        const {name, ipAddress, miniPcId, port} = values

        let params = {
        name: name,
        ipAddress: ipAddress,
        miniPcId: miniPcId,
        port: port
        }

        // console.log('params:::', params)
        mutate(params)
        // try {
        //     const response = await fetch('/api/Device?act=update-minipc', {
        //         method: 'POST',
        //         body: JSON.stringify(params),
        //         mode: 'cors',
        //         cache: 'default'
        //       })
        
        //       const data = await response.json()
        //       // console.log(data, 'adas')
        
        //       let {code, content, message} = data

        //       if(code === 0) {
        //         toast.success(message, {
        //           style: {
        //             border: '1px solid #55CD6C',
        //             padding: '12px',
        //             color: '#FFFAEE',
        //             backgroundColor: '#55CD6C'
        //           },
        //           iconTheme: {
        //             primary: '#FFFAEE',
        //             secondary: '#55CD6C',
        //           },
        //         })
        //         setTimeout(() => location.reload(), 2000)
        //       } else {
        //         toast.error(message, {
        //           style: {
        //             border: '1px solid hsl(0 100% 64%)',
        //             padding: '12px',
        //             color: '#FFFAEE',
        //             backgroundColor: 'hsl(0 100% 64%)'
        //           },
        //           iconTheme: {
        //             primary: '#FFFAEE',
        //             secondary: 'hsl(0 100% 64%)'
        //           },
        //         })
        //       }

        // } catch (error) {
        //     console.error('error message:' , error)
        // }
    }

    const client = useQueryClient()
    const {mutate} = useMutation({
      mutationFn: async (params) => {
        // console.log(params, '::mutateParams::')
        const url = '/api/Device?act=update-minipc'
        const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              mode: 'cors',
              cache: 'default',
              body: JSON.stringify(params)
        })

        const result = await response.json()

        return result

      },
      onSuccess: (data) => {
        if(data.code === 0){
          client.invalidateQueries({queryKey: ['miniPc']})
          toastrSuccess(data.message)
          setIsOpen(false)
        } else {
          toastrWarning(data.message)
        }
      }
    })

  return (
    <main>
        <Modal
          open={isOpen}
          onOpenChange={setIsOpen}
          trigger={<Button variant='' type="button" onClick={() => setIsOpen(true)}><Pencil size={20} /></Button>}
          title={'Update Mini PC'}
          content={ <Formik
                    initialValues={{
                        name: data.name,
                        ipAddress: data.ipAddress,
                        port: data.port,
                        miniPcId: data.miniPcId
                    }}
                    onSubmit={handleSubmit}
                >
                    {({errors, isSubmitting, values}) => (
                        <Form>
                            <div>
                                <Label htmlFor="name" className="">Name</Label>
                                <Field type="text" name="name" className="flex h-9 w-full rounded-md border border-1 border-black/10 border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                            </div>
                            <div>
                                <Label htmlFor="ipAddress" className="">IP Address</Label>
                                <Field type="text" name="ipAddress" className="flex h-9 w-full rounded-md border border-1 border-black/10 border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"></Field>
                            </div>
                            <div>
                                <Label htmlFor="portUpdate" className="">Port</Label>
                                <Field type="number" name="port" className="flex h-9 w-full rounded-md border border-1 border-black/10 border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"></Field>
                            </div>
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
                    )}
                </Formik>
                }
          fontSizeTitle={'20px'}
        
        />
    </main>
  )
}