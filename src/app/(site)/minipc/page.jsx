'use client'

import React, {useState, useEffect} from 'react'

import Loading from '@/components/utilities/Loading'

import InformationColor from '@/components/pages/minipcPage/MiniPcInfo/InformationColor'
import AddMiniPc from '@/components/pages/minipcPage/FormsMiniPc/AddMiniPc'
import MonitorPcList from '@/components/pages/minipcPage/MonitorPcList'
import { toastrError } from '@/helpers/Toaster'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Minipc() {
  const [miniPc, setMinipc] = useState({})
  const [countMinipc, setCountMinipc] = useState('')
  // const [done, setDone] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)

  const {data: session, status} = useSession()
  
  // const getListMiniPc = async () => {
  //   let params = {
  //     // offset: "",
  //     // limit: "",
  //     // search: "1"
  //   }

  //   try {
  //     let response = await fetch('/api/Device?act=minipc', {
  //       method: "POST",
  //       mode: 'cors',
  //       cache: 'default',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(params)
  //     })
  
  //     const data = await response.json()
  //     // console.log(data, 'da')
  //     const { code, content, message} = data
  //     setDone(true)
  
  //     if(code === 0) {
  //       setMinipc(content.results)
  //       setCountMinipc(content.count)
  //     }
  //   } catch (err) {
  //     console.log('error message:', err)
  //     toastrError('Data Fetch Error. Please contact admin!')
  //     setMinipc([])
  //     setCountMinipc(0)
  //     setDone(true)
  //   }

  // }

  // useEffect(() => {
  //   getListMiniPc()
  // }, [])

  const {data: miniPcList, isLoading, isError, isPending} = useQuery({
    queryKey: ['miniPc'],
    queryFn: async () => {
      let params = {}
      const url = '/api/Device?act=minipc'
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
      // console.log(result, '::result::')
      const {code, content} = result
      if(code === 0) return result
    }
  })

  const isLoadingAdd = (e) => {
    setLoadingAdd(e)
  }

  return (
    <>
    {
      status === 'authenticated' ?
      <main className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
        <h1 className='text-2xl font-semibold my-5 mx-3'>PC List</h1>
        {
          !isError ?
          <>
          {
            !isLoading ?
            <section>
              <InformationColor />
                <div className='flex justify-between mx-4'>
                   {!isPending ? <span className='mt-3'>Total: <span className='font-semibold'>{miniPcList?.content?.count || ''} PC</span></span> :  <Skeleton className="h-4 w-[20%] mt-3" />}
                    <AddMiniPc loadingHit={isLoadingAdd} />
                </div>
                <div className='grid grid-cols-12 p-2 gap-2 mt-1 mx-3'>
                  {
                    miniPcList.content.results.map((val, ind) => {
                      // console.log(val, ind)
                      let statusPc = ''
                       if(val.statusMiniPc === 'on' && val.deviceCount >= 40) {
                        statusPc ='success'
                      } else if(val.statusMiniPc === 'on' && val.notifCount > 0) {
                        statusPc ='warning'
                      } else if (val.statusMiniPc === 'unreachable') {
                        statusPc = 'danger'
                      } else {
                        statusPc = 'backgroundPc'
                      }
                      return (
                        <>
                          <MonitorPcList data={val} key={ind} status={statusPc} loadingAdd={loadingAdd} />
                        </>
                      )
                    })
                  }
                </div>
            </section>
            :
            <div className='flex justify-center'><Loading /></div>
          }
          </>
          :
          <div className='flex justify-center'>Data Not Found</div>
        }
      </main>
     :
      <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'><span className='loader'></span></div>
    }
    </>
  )
}