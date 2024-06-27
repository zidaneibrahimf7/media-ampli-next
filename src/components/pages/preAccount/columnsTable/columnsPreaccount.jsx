'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { firstCase } from '@/helpers/Helpers'
import moment from 'moment'
import React, { Fragment } from 'react'
import ViewPreaccount from '../ViewPreaccount'
import EditPreaccount from '../Forms/EditPreaccount'
import DeletePreaccount from '../DeletePreaccount'


export const columnsPreaccount = [
     {
          header: 'Date Create',
          accessorKey: 'dateCreate',
          cell: (item) => {
               const date = item.getValue()
               return (
                    <div>
                         {moment.utc(date).format('YYYY-MM-DD HH:mm')}
                    </div>
               )
          }
     },
     {
          header: 'Email',
          accessorKey: 'email'
     },
     {
          header: 'Backup Code',
          accessorKey: 'backupCode',
          cell: (item) => {
               const backupCode = item.getValue()
               const backupCodeList = backupCode?.map((v, i) => {
                    return (
                         <ul key={i} className='list-disc'>
                              <li>{v}</li>
                         </ul>
                    )
               })

               return backupCodeList
          }
     },
     {
          header: 'Status',
          size: 20,
          accessorFn: (item) => item,
          cell: (key) => {
               const dataKey = key.row.original
               const status = dataKey.status
               let badgeStatus
               switch(status){
                    case 1:
                         badgeStatus = <Badge variant={'success'}>Available</Badge>
                         break
                    default:
                         badgeStatus = <Badge variant={'danger'}>Not Available</Badge>
                         break;
               }

               return badgeStatus
          }
     },
     {
          header: 'Status Activity',
          size:20,
          accessorKey: 'statusActivity',
          cell: (item) => {
               const statusActivity = item.getValue()
               return <div className='text-center'>{firstCase(statusActivity)}</div>
          }
     },
     {
          header: 'Platform Active',
          accessorFn: (item) => item,
          cell: (key) => {
               const dataKey = key.row.original   
               const platformActive = dataKey.platformLogin.map((v, i) => {
                    switch(v.status){
                         case 1:
                              return <div className='relative col-span-1' style={{width: '27px', height: '27px'}} key={i}>
                                        <Image 
                                             src={`/socmed/${v.platform}.svg`}
                                             fill
                                             sizes="auto"
                                             alt={v.platform}
                                             className="rounded-full col-span-3"
                                   
                                             />
                                         </div>
                         default:
                              return ''
                    }
               })

               return (
                    <div className='grid grid-cols-6 pl-2'>
                         {platformActive}
                    </div>
               )
          }
     },
     {
          header: 'Last Activity',
          size:30,
          accessorKey: 'lastActivity',
          cell: (item) => {
               const lastActivity = item.getValue()
               return moment.utc(lastActivity).format('YYYY-MM-DD HH:mm')
          }
     },
     {
          header: 'Actions',
          accessorFn: (item) => item,
          cell: (key) => {
               const dataKey = key.row.original
               return (
                    <div className='flex gap-1'>
                         <ViewPreaccount data={dataKey} />
                         <EditPreaccount data={dataKey} />
                         <DeletePreaccount email={dataKey.email} />
                    </div>
               )
          }
     }
]