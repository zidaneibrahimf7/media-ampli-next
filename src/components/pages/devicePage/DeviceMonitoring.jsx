'use client'


import Loading from '@/components/utilities/Loading'
import { toastrWarning } from '@/helpers/Toaster'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, {useState} from 'react'

export default function DeviceMonitoring({id, ip, port}){
     // console.log(id, ip, port, "::::")
     // const [messageErrorUrl, setMessageErrorUrl] = useState('')

     const {data: monitoring, isLoading, isPending, isError} = useQuery({
          queryKey: ['monitoringDevice', id, ip, port],
          queryFn: async () => {
               let params = {
                    ip: ip,
                    port: port,
                    deviceId: id
               }
               
               const url = '/api/Monitoring?act=getMonitoring'
               const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(params),
                    mode: 'cors',
                    cache: 'default'
               })
               // console.log(params, url, ':::wwww:::')
               const result = await response.json()
               // console.log(result, "::result::")
               const { code, content, message} = result

               if(code === 0) {
                    return result
               } else {
                    toastrWarning(message)
                    return
               }
          


          }
     })
     return (
          <main>
               <div className='flex justify-center items-center gap-3'>
                    <div className='relative w-[780.5px] h-[767px]'>
                         <Image   
                              // src='/images/noun-smartphone.svg' 
                              src="/images/phone-with-big-screen.svg"
                              fill
                              style={{objectFit: 'contain'}}
                              alt='Phone Image' /> 
                              {isLoading ? 
                                   // <div className='flex justify-center mt-7 pt-7' style={{paddingTop: '10rem', marginTop: '9rem'}}><Loading /></div>
                                   <div className='absolute inset-0 flex justify-center items-center bg-slate-100'>
                                        <Loading />
                                   </div>
                                   : 
                                   <>
                                        {
                                        !isError ?
                                        <>
                                        <div className='absolute top-[4.5%] left-[52.03%] transform -translate-x-1/2 bg-black rounded-b-xl' style={{ width: '336px', height: '750px' }}></div>
                                        <iframe 
                                             src={monitoring?.content?.url}
                                             // className='absolute top-[4%] left-[27.29%] w-[49.8%] h-[93.5%] border-none' 
                                              className='absolute top-[4.5%] left-[30.35%] w-[49.75%] h-[93.9%] border-none' 
                                        />
                                        </>
                                        :
                                        <iframe 
                                             // src='https://picsum.photos/800/800' 
                                             // className='absolute top-[5.5%] left-[27.3%] w-[45.5%] h-[87%] border-none' 
                                             src='https://placehold.co/1280x1280/white?text=Session+Expired&font=roboto' 
                                             className='absolute top-[5.5%] left-[27.3%] w-[45.5%] h-[100%] max-h-[40rem] border-none' 
                                        />
                                        }
                                   </>
                              }
                    </div>
               </div>
          </main>
     )
}