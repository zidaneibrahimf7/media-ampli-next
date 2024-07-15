'use client'

import moment from 'moment'
import React from 'react'
import UpdatePlatforms from '../UpdatePlatforms'
import Image from 'next/image'


export const columnsPlatforms = [
     {
          header: 'Platform',
          accessorKey: '_id', 
          cell: (item) => {
               const platform = item.getValue()
               const iconPlatfrom = <div className='relative' style={{width: '50px', height: '50px'}}><Image src={`/socmed/${platform}.svg`} sizes='auto' fill style={{objectFit: 'obtain'}} className='rounded-full' alt="...." /></div>
               return iconPlatfrom
          }
     },
     {
          header: 'IP',
          accessorKey: 'ip',
     },
     {
          header: 'Port',
          accessorKey: 'port'
     },
     {
          header: 'Active Account Threshold',
          accessorKey: 'activeAccountThreshold',
          cell: (item) => {
               const activeAccountThreshold = item.getValue()
               return (
                    <div className='' style={{'paddingLeft' : '5rem'}}>
                         {activeAccountThreshold}
                    </div>
               )
          }
     },
     {
          header: 'Last Activity',
          accessorKey: 'lastActivity',
          cell: (item) => {
               const lastActivity = item.getValue()
               return (
                    <div className=''>
                         {moment.utc(lastActivity).format('YYYY-MM-DD HH:mm')}
                    </div>
               )
          }
     },
     {
          header: 'Actions',
          accessorFn: (item) => item,
          cell: (key) => {
               const dataKey = key.row.original
               // console.log(dataKey)
               return <UpdatePlatforms data={dataKey} />
          }
     }
]