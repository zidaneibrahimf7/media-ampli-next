import React, {useState, useEffect} from 'react'

import { Dialog, DialogContent,DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Formik, Form, Field, FieldArray } from 'formik'
import * as Yup from 'yup';

import { FolderSync, Send } from 'lucide-react'

import Loading from '@/components/utilities/Loading'

import { toastrSuccess, toastrWarning } from '@/helpers/Toaster'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function UpdatePlatforms({data}){
    // console.log(data, '::data::')
    const [isOpen, setIsOpen] = useState(false)
    
    const handleSubmit = async (values) => {
        // console.log(values)
    
        const { platformId, activeAccountThreshold} = values
    
        let params = {
          platformId: platformId,
          activeAccountThreshold: activeAccountThreshold
        }
    
        try {
          // console.log(params, '::params::')
          mutate(params)

          // const response = await fetch('/api/Platform?act=active-threshold', {
          //   method: 'POST',
          //   body: JSON.stringify(params),
          //   mode: 'cors',
          //   cache: 'default'
          // })
    
          // const data = await response.json()
    
          // const {code, content, message} = data
    
          //  if(code === 0) {
          //   toastrSuccess(message)
          //   setTimeout(() => location.reload(), 2000)
          // } else {
          //   toastrWarning(message)
          // }
    
        } catch (err) {
          console.log('error message:', err)
        }
      };

      const validationSchema = Yup.object().shape({
        activeAccountThreshold: Yup.number().min(1, 'Nilai harus lebih besar dari 0').required('Field ini harus diisi'),
      });

      const client = useQueryClient()
      const { mutate, isPending } = useMutation({
          mutationFn: async(params) => {
              // console.log(params, '::paramsMutation')
              const url = '/api/Platform?act=active-threshold'
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
              if(code === 0) return result
          }, 
          onSuccess: (data) => {
              client.invalidateQueries({queryKey: ['platform']}),
              toastrSuccess("Set active account threshold success")
          }
      })

  return (
    <>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger onClick={() => setIsOpen(true)} asChild><Button variant="success" className="flex gap-2"><FolderSync size={20} />Update Data</Button></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" >
            <DialogHeader>
                <DialogTitle>Update Data</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanent change your data from our servers.
                    </DialogDescription>
            </DialogHeader>
            <Formik
                initialValues={{
                    platformId: data._id,
                    activeAccountThreshold: data.activeAccountThreshold
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({values, setFieldValue, errors}) => (
                    <div>
                        <Form>
                            <Label htmlFor="name" className="">Set Active Account Threshold</Label>
                            <Field type="number" name="activeAccountThreshold" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                                {
                                    errors.activeAccountThreshold && (
                                        <small className='text-danger'>{errors.activeAccountThreshold}<span className='text-red'>*</span></small>
                                    )
                                }
                            {/* <DialogFooter> */}
                              <div className='flex justify-end mt-4 gap-2'>
                                    <DialogClose asChild>
                                        <Button type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" variant="success" className="flex gap-2" onClick={() => setIsOpen(false)}><Send size={20} />Submit</Button>
                              </div>
                            {/* </DialogFooter> */}
                        </Form>
                    </div>
                )}
            </Formik>
        </DialogContent>
    </Dialog>
    </>
  )
}
