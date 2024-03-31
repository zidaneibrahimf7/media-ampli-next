'use client'

import React, {useState, useEffect}from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Dialog, DialogContent,DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import moment from 'moment'

import toast from 'react-hot-toast';

import { Formik, Form, Field, FieldArray } from 'formik'
import * as Yup from 'yup';
import Loading from '@/components/utilities/Loading'

export default function PlatformPage() {
  const [platforms, setPlatforms] = useState({})
  const [countPlatform, setCountPlatform] = useState(0)


  const getPlatform = async () => {

    let params = {}
    // if(platformId) params = {...params, platformId}

    let response = await fetch('/api/Platform?act=platforms', {
      method: "POST",
      mode: 'cors',
      cache: 'default',
      // credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    const data = await response?.json()

    const { code, content} = data

    if(code === 0 && content.results) {
      setPlatforms(content.results)
      setCountPlatform(content.count)
    }
  }

  const handleSubmit = async (values) => {
    // console.log(values)

    const { platformId, activeAccountThreshold} = values

    let params = {
      platformId: platformId,
      activeAccountThreshold: activeAccountThreshold
    }

    try {
      const response = await fetch('/api/Platform?act=active-threshold', {
        method: 'POST',
        body: JSON.stringify(params),
        mode: 'cors',
        cache: 'default'
      })

      const data = await response.json()

      let {code, content} = data

       if(code === 0) {
        toast.success('Active Threshold Changed', {
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

    } catch (err) {
      console.log('error message:', err)
    }
  };

  const validationSchema = Yup.object().shape({
    activeAccountThreshold: Yup.number().min(1, 'Nilai harus lebih besar dari 0').required('Field ini harus diisi'),
  });


  useEffect(() => {
    getPlatform()
  }, [])


  return (
    <>
    <main>
      <section className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
      <h1 className='text-2xl font-semibold my-5 mx-3'>Platforms List</h1>
        {
          platforms.length ?
          <>
          <div>
            {
              countPlatform > 1 ?
              <span className='mx-1 px-2 py-5'>Total: {countPlatform} devices</span>
              :
              <span className='mx-1 px-2 py-5'>Total: {countPlatform} device</span>
            }
          </div>
          {/* Table */}
          <div className='rounded-md border mx-4 my-5'>
            <Table className="bg-secondary rounded-sm">
              <TableHeader className="items-center bg-primary">
                <TableRow>
                  <TableHead className="text-secondary">Platform</TableHead>
                  <TableHead className="text-secondary">IP</TableHead>
                  <TableHead className="text-secondary">Port</TableHead>
                  <TableHead className="text-secondary" style={{'paddingLeft' : '8rem'}}>Active Account Threshold</TableHead>
                  <TableHead className="text-secondary">Last Activity</TableHead>
                  <TableHead className="text-secondary">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  platforms.map((v, i) => {
                    // console.log(v, i)
                    return (
                      <TableRow className="hover:bg-white">
                        <TableCell>{v._id}</TableCell>
                        <TableCell>{v.ip}</TableCell>
                        <TableCell>{v.port}</TableCell>
                        <TableCell><div className='ml-3 pl-3' style={{'paddingLeft' : '12rem'}}>{v.activeAccountThreshold}</div></TableCell>
                        <TableCell>{moment.utc(v.lastActivity).format('YYYY-MM-DD HH:mm')}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger><Button variant="success">Update Data</Button></DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Update Data</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanent change your data from our servers.
                                </DialogDescription>
                              </DialogHeader>
                              <Formik
                                initialValues={{
                                  platformId: v._id,
                                  activeAccountThreshold: v.activeAccountThreshold
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                render={({values, setFieldValue, errors}) => 
                                <div>
                                  <Form>
                                    <Label htmlFor="name" className="">Set Active Account Threshold</Label>
                                    <Field type="number" name="activeAccountThreshold" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                                    {
                                      errors.activeAccountThreshold && (
                                        <small className='text-danger'>{errors.activeAccountThreshold}<span className='text-red'>*</span></small>
                                      )
                                    }
                                    <div className='flex justify-end mt-4'>
                                      <Button type="submit">Submit</Button>
                                    </div>
                                  </Form>
                                </div>
                                }
                              >
                              </Formik>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
          </>
          :
          (
            platforms.length === 0 ?
              <div className='flex justify-center'>Data is not available</div>
            :
              <div className='flex justify-center'><Loading /></div>
          )
        }
      </section>
    </main>
    </>
  )
}
