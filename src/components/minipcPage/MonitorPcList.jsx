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
import { useRouter } from 'next/navigation';


import DeleteMiniPc from '@/components/minipcPage/FormsMiniPc/DeleteMiniPc'
import UpdateMiniPc from '@/components/minipcPage/FormsMiniPc/UpdateMiniPc'
import PcListInfo from '@/components/minipcPage/MiniPcInfo/PcListInfo'
import TableMiniPcDeviceList from '@/components/minipcPage/MiniPcDevice/TableMiniPcDeviceList'
import Loading from '../utilities/Loading'
import OrganizationalMiniPcDevice from './MiniPcDevice/OrganizationalMiniPcDevice'
import NotificationMiniPcDevice from './MiniPcDevice/NotificationMiniPcDevice'

  export default function MonitorPcList({data, status}) {
    const [miniPcDevice, setMiniPcDevice] = useState({})
    const [countMiniPcDevice, setCountMinipcDevice] = useState('')
    const [done, setDone] = useState(false)

    const router = useRouter()

    const handleGetMiniPcDevice = async (miniPcId) => {
        // console.log(miniPcId)
    
        let params = {
          miniPcId: miniPcId,
          // offset: 0,
          // limit: 10
    
        }
        //  console.log('params:::', params)
    
        try {
          const response = await fetch('/api/Device?act=getMiniPcDevice', {
            method: 'POST',
            body: JSON.stringify(params),
            mode: 'cors',
            cache: 'default'
          })
      
          const data = await response.json()
          // console.log(data, 'asdasda')
          setDone(true)
          let {code, content, message} = data
      
          if(code === 0) {
            setMiniPcDevice(content.results)
            setCountMinipcDevice(content.count)
          } 
    
        } catch (err) {
          console.log('error message:::', err)
        }
      }

    const handlePushToPage = async (miniPcId) => {
      // console.log(miniPcId)
      router.push(`/minipc/${miniPcId}`)
      
    }


    return (
        <main className={`bg-${status} rounded-md p-2 text-center transition ease-in-out hover:-translate-y-1 duration-300`}>
            {/* Dialog Mode */}
            <Dialog>
                <DialogTrigger asChild>
                <button className='text-center' onClick={() => handleGetMiniPcDevice(data.miniPcId)}>
                    <Monitor size={40} className='text-secondary ml-3' />
                    <Badge variant={'secondary'}>{data.name}</Badge>
                </button>
                </DialogTrigger>
                <DialogContent className="w-full overflow-x-scroll overflow-y-scroll" key={data.port} style={{ width: '100%', maxWidth: '80rem', height: 'auto' }}>
                    <DialogHeader>
                        <DialogTitle>
                        <section className='flex justify-between'>
                            <h3 className='text-2xl font-bold'>{data.name}</h3> 
                            <div className='mt-5 flex gap-2'>
                                <UpdateMiniPc data={data} />
                                <DeleteMiniPc data={data} />
                            </div>
                        </section>
                        </DialogTitle>
                        <PcListInfo data={data} />
                        <div className='rounded-md border'>
                            {
                                done ? 
                                // Table
                                // <div className='flex gap-2'>
                                //   <div className='bg-warning/70 rounded-lg'><NotificationMiniPcDevice id={data.miniPcId} /></div>
                                //   <div className='grow border border-2'><TableMiniPcDeviceList id={data.miniPcId} data={miniPcDevice} count={countMiniPcDevice} /></div>
                                // </div>
                                <OrganizationalMiniPcDevice data={miniPcDevice} namePc={data.name}/>
                                :
                                <div className='flex justify-center'><Loading /></div>
                            }
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
    )
  }