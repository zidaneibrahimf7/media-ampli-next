import { Skeleton } from '@/components/ui/skeleton'
import Loading from '@/components/utilities/Loading'
import { useQuery } from '@tanstack/react-query'
import React, {useState, useEffect } from 'react'

export default function NotificationMiniPcDevice({id}){
    // console.log(id, ':idd')
    const [notification, setNotification] = useState({})
    const [done, setDone] = useState(false)

    // const getMiniPcNotif = async () => {
    //     let params = {
    //         miniPcId: id
    //     }

    //     // console.log(params)
    //     // try {
    //     //     const response = await fetch('/api/Device?act=getMiniPcNotif', {
    //     //         method: "POST",
    //     //         mode: 'cors',
    //     //         cache: 'default',
    //     //         // credentials: 'same-origin',
    //     //         headers: {
    //     //             'Content-Type': 'application/json'
    //     //         },
    //     //         body: JSON.stringify(params)
    //     //     })

    //     //     const data = await response.json()
    //     //     // console.log(data, 'dataa')
    //     //     setDone(true)

    //     //     const {code, content, message} = data

    //     //     if(code === 0) setNotification(content)
    //     // } catch (error) {
    //     //     console.error('error message:', error)
    //     // }
    // }

    // useEffect(() => {
    //     getMiniPcNotif()
    // }, [])

    const {data: notificationDataList, isLoading, isError, refetch} = useQuery({
        queryKey: ['notification', id],
        queryFn: async () => {
            let params = {
                miniPcId: id
            }
            const url = '/api/Device?act=getMiniPcNotif'
            const response = await fetch(url, {
                method: "POST",
                mode: 'cors',
                cache: 'default',
                 // credentials: 'same-origin',
                headers: {
                     'Content-Type': 'application/json'
                 },
                body: JSON.stringify(params)
            })

            const result = await response.json()
            // console.log(result)
            const {code, content} = result
            if(code === 0) return result
        }
    })

    useEffect(() => {
        refetch()
    }, [id])

  return (
    <>
        <main>
          <div className='m-2 h-fit max-h-80 overflow-y-auto relative'>
            <div>
                <h1 className='font-bold text-xl'>Notification</h1>
                {
                    !isError ?
                    <>
                    {
                        !isLoading ?
                        <>
                         {
                            notificationDataList.content.results.map((notif) => {
                                // console.log(notif, ':notif:')
                                return (
                                    <>
                                         <p className='text-sm bg-slate-100 rounded-full p-1 my-2'>{notif}</p>
                                    </>
                                )
                            })
                        }
                        </>
                        :
                        <>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div className='flex justify-between'>
                                <Skeleton className="h-4 w-[70%] m-2 p-2" />
                                <Skeleton className="h-4 w-[70%] m-2 p-2" />
                            </div>
                        ))}
                        </>
                    }
                    </>
                    :
                    <div className='flex justify-center'>
                        Data is not found.
                    </div>
                }
            </div>

          </div>
            {/* {
                notification.results?.length && notification.count > 0 ?
                <>
                 <div className='m-2 h-fit max-h-80 overflow-y-auto relative'>
                    <div>
                        <h1 className='font-bold text-xl'>Notification</h1>
                    </div>
                        {
                            notification.results.map((notif) => {
                                // console.log(notif, ':notif:')
                                return (
                                    <>
                                         <p className='text-sm bg-slate-100 rounded-full p-1 my-2'>{notif}</p>
                                    </>
                                )
                            })
                        }
                </div>
                </>
                :
                done ?
                <>
                    <div className='flex justify-center'>Notification is not available</div>
                </>
                :
                <div className='flex justify-center'><Loading /></div>
            } */}
        </main>
    </>
  )
}

