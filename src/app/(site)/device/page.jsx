'use client'
import React, {useState, useEffect, useReducer} from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

import { Check, Construction, MonitorCheck } from 'lucide-react'
import moment from 'moment'
import Loading from '@/components/utilities/Loading'
import Pagination from '@/components/utilities/Pagination'

import { useSession } from 'next-auth/react'

export default function DevicesPage() {
  const [devices, setDevices] = useState({})
  const [countDevices, setCountDevices] = useState(0)
  const [limit, setLimit] = useState(20)
  const [currentPage, setPage] = useState(1)
  const [searchDevices, setSearchDevices] = useState('')

  const {data: session, status} = useSession()


  const getDevices = async(page) => {
    if(!page) page = currentPage
    let offset = (page === 1 || searchDevices) ? 0 : ((page - 1) * limit)

    let params = {
      "offset": offset,
      "limit": limit,
      "deviceId": "",
      "status": "",
      "statusActivity": "",
      "search": searchDevices ? searchDevices : ""
    }

    let response = await fetch('/api/Device?act=devices', {
      method: "POST",
      mode: 'cors',
      cache: 'default',
      // credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    // console.log(response)

    const data = await response.json()
    // console.log(data, 'sugoiii')

    let { code, content } = data

    // console.log(content, code)

    if (page !== currentPage) setPage(page)

    if(code === 0 && content.results) {
      setDevices(content.results)
      setCountDevices(content.count)
    }
  }

  

  const changeStatus = async(deviceId, isMaintenance) => {
    // console.log(deviceId, isMaintenance, 'status')

    let params = {
      deviceId: deviceId,
      maintenance: isMaintenance === 0 ? 1 : 0 
    }

    // console.log(params, 'passs')

    const response = await fetch('/api/Device?act=maintenances', {
      method: 'POST',
      body: JSON.stringify(params),
      mode: 'cors',
      cache: 'default'
    })

    const data = await response.json()
    // console.log(data)
    let { code, content, message } = data

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
  }


  useEffect(() => {
    getDevices()
  }, [searchDevices])



  return (
    <>
    <main>
      {
        status === 'authenticated' ?
        <section>
          <div className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
          <h1 className='text-2xl font-semibold my-5 mx-3'>Devices List</h1>
            <div>
                {
                  countDevices > 1 ?
                  <span className='mx-1 px-2 py-5'>Total: {countDevices} devices</span>
                  :
                  <span className='mx-1 px-2 py-5'>Total: {countDevices} device</span>
                }
            </div>
            <div className='flex justify-end mx-3'>
                  <form>
                    {/* <Label className="text-xs">Search by Device Port</Label> */}
                    <Input
                    type="text"
                    placeholder="search...."
                    onChange={(e) => {
                      e.preventDefault()
                      // console.log(e.target.value)
                      setSearchDevices(e.target.value)
                      // if (!e) {
                      //   getDevices()
                      // }
                    }}
                    // onKeyPress={(event) => {
                    //   if (event.key === 'Enter') {
                    //     event.preventDefault();
                    //     // console.log(event.key, event.target.value)
                    //     setSearchDevices(event.target.value)
                    //     // getDevices()
                    //   }
                    // }}
                    className="mr-3"
                    style={{'width': '13rem'}}
                    />
                  </form>
              </div>
              {/* Table */}
              {
              devices.length ? 
              <>
              <div className='rounded-md border mx-4 my-5'>
                <Table className="bg-secondary rounded-sm">
                  <TableHeader className="text-center items-center bg-primary">
                    <TableRow>
                      <TableHead className="text-secondary">Device ID</TableHead>
                      <TableHead className="text-secondary">IP Portt</TableHead>
                      <TableHead className="text-secondary pl-4" style={{'paddingLeft' : '2rem'}}>Status</TableHead>
                      <TableHead className="text-secondary">Status Activity</TableHead>
                      <TableHead className="text-secondary">Last Activity</TableHead>
                      <TableHead className="text-secondary">Action</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        devices.map((v, i) => {
                          // console.log(v, i)
                          return (
                            <TableRow className="hover:bg-white">
                              <TableCell>{v._id}</TableCell>
                              <TableCell>{v.deviceIpPort}</TableCell>
                              <TableCell>{v.isMaintenance === 0 ? <Badge variant="success" className="ml-3" style={{'marginLeft' : '1.4rem'}}>Active</Badge> : <Badge variant="warning">Maintenance</Badge>}</TableCell>
                              <TableCell><div className='mx-3 px-3'>{v.statusActivity}</div></TableCell>
                              <TableCell>{moment.utc(v.lastActivity).format('YYYY-MM-DD HH:mm')}</TableCell>
                              <TableCell>
                                <Button
                                  onClick={() => changeStatus(v._id, v.isMaintenance)}
                                  variant={v.isMaintenance === 0 ? 'warning' : 'success'}
                                >
                                {
                                  v.isMaintenance === 0 ?
                                  <div className='flex items-center gap-2'><Construction size={22} className="" />Set Maintenance</div>
                                  :
                                  <div className='flex items-center gap-2'><MonitorCheck size={22} className="" />Set Active</div>
                                }
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                </Table>
              </div>
              <div className='flex justify-end mx-4'>
                <Pagination length={countDevices} limit={limit} page={currentPage} callback={getDevices} />
              </div>
              </>
              :
              (
                devices.length === 0 ?
                  <div className='flex justify-center'>Data is not available</div>
                :
                  <div className='flex justify-center'><Loading /></div>
              )
            }
          </div>
        </section> 
        :
        <>
         <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'><span className='loader'></span></div>
        </>
      }

    </main>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      />
    </>
  )
}