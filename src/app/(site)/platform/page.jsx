'use client'

import React, {useState, useEffect}from 'react'

import Loading from '@/components/utilities/Loading'

import { useSession } from 'next-auth/react'

import TablePlatform from '@/components/pages/platform/TablePlatform'
import { useQuery, QueryClient } from '@tanstack/react-query'
import DataTable from '@/components/custom/DataTable'
import { columnsPlatforms } from '@/components/pages/platform/columns/columnsPlatforms'
import { Skeleton } from '@/components/ui/skeleton'

export default function PlatformPage() {
  
  const [platforms, setPlatforms] = useState({})
  const [done, setDone] = useState(false)

  const { data: session, status} = useSession()

  // const getPlatform = async () => {

  //   let params = {}
  //   // if(platformId) params = {...params, platformId}

  //   let response = await fetch('/api/Platform?act=platforms', {
  //     method: "POST",
  //     mode: 'cors',
  //     cache: 'default',
  //     // credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(params)
  //   })

  //   const data = await response?.json()

  //   const { code, content} = data
  //   setDone(true)

  //   if(code === 0 && content.results) {
  //     setPlatforms(content)
  //     // setCountPlatform(content.count)
  //   }
  // }

  // useEffect(() => {
  //   getPlatform()
  // }, [])

  const {data: datas, isSuccess, isLoading, isError} = useQuery({
    queryKey: ['platform'],
    queryFn: async () => {
        let url = '/api/Platform?act=platforms'
        let params = {}
        const response = await fetch(url, {
          method: "POST",
          mode: 'cors',
          cache: 'default',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })
        // console.log(response, '::responseQuery::')
        const result = await response.json()
        // console.log(result, '::ResultQuery::')
        const {code, content} = result

        if(code === 0) return result

    }
  })

  return (
    <main>
    {
      status === 'authenticated' ?
        <section className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
          <h1 className='text-2xl font-semibold my-5 mx-3'>Platforms</h1>
            <div>
              {datas ? 
                <span className='mx-1 px-2 py-5'>Total: {datas?.content?.count > 1 ? <span>{datas?.content?.count} devices</span> :  <span>{datas.content?.count} device</span> }</span>
                :
                <Skeleton className="h-4 w-[30%]" />
              }
            </div>
            <DataTable 
              data={datas}
              columns={columnsPlatforms}
              className={'rounded-md mx-4 my-5'}
              classNameTableRow={'hover:bg-secondary'}
              isLoading={isLoading}
              error={isError}
           />
        </section>
      :
      <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'><span className='loader'></span></div>
    
    }
    </main>
    // <>
    // <main>
    // {
    //   status === 'authenticated' ?
    //   <section className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
    //   <h1 className='text-2xl font-semibold my-5 mx-3'>Platforms</h1>
    //     {
    //       !isLoading ?
    //       <>
    //         <div>
    //           <span className='mx-1 px-2 py-5'>Total: {platforms.count > 1 ? <span>{platforms.count} devices</span> :  <span>{platforms.count} device</span> }</span>
    //         </div>
    //         <div>
    //           <TablePlatform data={datas} />
    //         </div>
    //       </>
    //       :
    //       (
    //         platforms.count === 0 ?
    //           <div className='flex justify-center'>Data is not available</div>
    //         :
    //           <div className='flex justify-center'><Loading /></div>
    //       )
    //     }
    //   </section>
    //   :
    //   <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'><span className='loader'></span></div>
    // }
    // </main>
    // </>
  )
}
