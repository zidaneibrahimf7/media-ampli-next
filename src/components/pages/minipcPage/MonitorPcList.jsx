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

import { Badge } from '@/components/ui/badge'
import { Monitor } from 'lucide-react'

// import { Button } from '../ui/button'

// Ini cara push lsg ke page tertentu
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';

import DeleteMiniPc from '@/components/pages/minipcPage/FormsMiniPc/DeleteMiniPc'
import UpdateMiniPc from '@/components/pages/minipcPage/FormsMiniPc/UpdateMiniPc'
import PcListInfo from '@/components/pages/minipcPage/MiniPcInfo/PcListInfo'
import TableMiniPcDeviceList from '@/components/pages/minipcPage/MiniPcDevice/TableMiniPcDeviceList'
import Loading from '../../utilities/Loading'
import OrganizationalMiniPcDevice from './MiniPcDevice/OrganizationalMiniPcDevice'
import NotificationMiniPcDevice from './MiniPcDevice/NotificationMiniPcDevice'
import { Skeleton } from '../../ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import DataTable from '@/components/custom/DataTable'
import { truncate } from '@/helpers/Helpers'
import Tooltip from '@/components/custom/Tooltip'

  export default function MonitorPcList({data, status, loadingAdd}) {
    const [miniPcDevice, setMiniPcDevice] = useState({})
    const [countMiniPcDevice, setCountMinipcDevice] = useState('')
    const [done, setDone] = useState(false)
    const [params, setParams] = useState(false)
    // const {miniPcId} = useParams()
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const handleGetMiniPcDevice = async (miniPcId) => {
        // console.log(miniPcId)
        let params = {
          miniPcId: miniPcId,
          // offset: 0,
          // limit: 10
        }
        //  console.log('params:::', params)
        setParams(params)
        setIsOpen(true)

        // try {
        //   const response = await fetch('/api/Device?act=getMiniPcDevice', {
        //     method: 'POST',
        //     body: JSON.stringify(params),
        //     mode: 'cors',
        //     cache: 'default'
        //   })
      
        //   const data = await response.json()
        //   // console.log(data, 'asdasda')
        //   setDone(true)
        //   let {code, content, message} = data
      
        //   if(code === 0) {
        //     setMiniPcDevice(content.results)
        //     setCountMinipcDevice(content.count)
        //   } 
    
        // } catch (err) {
        //   console.log('error message:::', err)
        // }
    }

    const {data: deviceMiniPc, isLoading, isError, refetch} = useQuery({ 
          queryKey: ['deviceMiniPcList', params],
          queryFn: async () => {
            // console.log(params, '::params::')
            const url = '/api/Device?act=getMiniPcDevice'
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
            // console.log(result, "::resultQuery::")
            const {code, message, content} = result

            if(code === 0) return result
          },
          enabled: !!params //got it when handleGetMiniPcDevice is clicked
        })

    const handlePushToPage = async (miniPcId) => {
      // console.log(miniPcId)
      router.push(`/minipc/${miniPcId}`)
      
    }


    return (
      <>
        <main className={`bg-${status} rounded-md p-2 text-center transition ease-in-out hover:-translate-y-1 duration-300`}>
            {/* Dialog Mode */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                      <Tooltip 
                        trigger={<button className='text-center' onClick={() => handleGetMiniPcDevice(data.miniPcId)} onAppl>
                                      <Monitor size={40} className='text-secondary ml-3' />
                                      <Badge variant={'secondary'}>{truncate(data.name, 6)}</Badge>
                                  </button>
                                }
                        content={data.name}
                      />
                </DialogTrigger>
                <DialogContent className="w-full overflow-x-scroll overflow-y-scroll" key={data.port} style={{ width: '100%', maxWidth: '80rem', height: 'auto' }}>
                    <DialogHeader>
                        <DialogTitle>
                        <section className='flex justify-between'>
                            <h3 className='text-2xl font-bold'>{data.name}</h3> 
                            <div className='mt-5 flex gap-2'>
                                <UpdateMiniPc data={data} />
                                <DeleteMiniPc data={data} closeModal={() => setIsOpen(false)} />
                            </div>
                        </section>
                        </DialogTitle>
                        <PcListInfo data={data} />
                        <div className='rounded-md border'>
                          <div className='flex gap-2'>
                              <div className='grow w-[30rem] bg-warning/70 rounded-lg'><NotificationMiniPcDevice id={data.miniPcId} /></div>
                              <div className='grow border border-2 rounded-xl'><TableMiniPcDeviceList id={data.miniPcId} data={deviceMiniPc?.content.results} count={deviceMiniPc?.content.count} isLoading={isLoading} /></div>
                          </div>
                            {/* {
                                !isLoading ? 
                                // Table
                                <div className='flex gap-2'>
                                  <div className='bg-warning/70 rounded-lg'><NotificationMiniPcDevice id={data.miniPcId} /></div>
                                  <div className='grow border border-2'><TableMiniPcDeviceList id={data.miniPcId} data={deviceMiniPc?.content.results} count={deviceMiniPc?.content.count} isLoading={isLoading} /></div>
                                </div>
                                // <OrganizationalMiniPcDevice data={miniPcDevice} namePc={data.name}/>
                                :
                                <div className='flex justify-center'><Loading /></div>
                            } */}
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            {/* Ini ke page langsung (idealnya sementara ini) */}
            {/* <button onClick={() => handlePushToPage(data.miniPcId)}>
              <Monitor size={40} className='text-secondary ml-3' />
              <Badge variant={'secondary'}>{data.name}</Badge>
            </button> */}
        </main>
      </>
    )
  }