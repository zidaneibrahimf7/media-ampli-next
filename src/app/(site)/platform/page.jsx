'use client'

import React, {useState, useEffect}from 'react'

import Loading from '@/components/utilities/Loading'

import { useSession } from 'next-auth/react'

import TablePlatform from '@/components/platformPage/TablePlatform'

export default function PlatformPage() {
  
  const [platforms, setPlatforms] = useState({})
  const [done, setDone] = useState(false)

  const { data: session, status} = useSession()

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
    setDone(true)

    if(code === 0 && content.results) {
      setPlatforms(content)
      // setCountPlatform(content.count)
    }
  }

  useEffect(() => {
    getPlatform()
  }, [])


  return (
    <>
    <main>
    {
      status === 'authenticated' ?
      <section className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
      <h1 className='text-2xl font-semibold my-5 mx-3'>Platforms</h1>
        {
          done ?
          <>
            <div>
              <span className='mx-1 px-2 py-5'>Total: {platforms.count > 1 ? <span>{platforms.count} devices</span> :  <span>{platforms.count} device</span> }</span>
            </div>
            <div>
              <TablePlatform data={platforms} />
            </div>
          </>
          :
          (
            platforms.count === 0 ?
              <div className='flex justify-center'>Data is not available</div>
            :
              <div className='flex justify-center'><Loading /></div>
          )
        }
      </section>
      :
      <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'><span className='loader'></span></div>
    }
    </main>
    </>
  )
}
