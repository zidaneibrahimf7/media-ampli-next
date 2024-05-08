'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

import { MoveLeft } from 'lucide-react'
import Loading from '@/components/utilities/Loading'
import OrganizationalMiniPcDevice from '@/components/minipcPage/MiniPcDevice/OrganizationalMiniPcDevice'
// import UpdateMiniPc from '@/components/minipcPage/FormsMiniPc/UpdateMiniPc'
// import DeleteMiniPc from '@/components/minipcPage/FormsMiniPc/DeleteMiniPc'

export default function MiniPcDevicePage({}){
  const pathname = usePathname()
  const pathMiniPcId = pathname.split('/')[2]
  // console.log(pathMiniPcId, ':::path')
  const router = useRouter()

  const [miniPcDevice, setMiniPcDevice] = useState({})
  const [done, setDone] = useState(false)
  

  const getMiniPcDevice = async () => {
    let params = {
      miniPcId: pathMiniPcId
    }

     // console.log(params)

    try {
      const response = await fetch('/api/Device?act=getMiniPcDevice', {
        method: 'POST',
        body: JSON.stringify(params),
        mode: 'cors',
        cache: 'default'
      })
  
      const data = await response.json()
      //  console.log('data::::', data)

      const {code, content, message} = data
      setDone(true)

      if(code === 0) setMiniPcDevice(content.results)

    } catch (error) {
      console.error('error message:', error)
    }
  }


  useEffect(() => {
    getMiniPcDevice()
  }, [])

  return (
    <>
       <main className='rounded-sm py-3 m-5 bg-white items-center shadow-xl overflow-x-scroll'>
        <h1 className='text-2xl font-semibold my-5 mx-3'>Device Mini PC</h1>
          <div className='mx-2 flex justify-between'>
            <Button variant='success' className="flex gap-2" onClick={() => router.push('/minipc') }><MoveLeft size={20} />Back to PC List page</Button>
            <div>
              {/* <UpdateMiniPc /> */}
              {/* <DeleteMiniPc /> */}
            </div>
          </div>
          {
            done ?
            <>
             {
              // console.log(miniPcDevice, 'SS')
              <OrganizationalMiniPcDevice data={miniPcDevice} />
             }
            </>
            :
            <div className='flex justify-center'><Loading /></div>
          }
       </main>
    </>
  )
}
