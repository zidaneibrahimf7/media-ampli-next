'use client'

import moment from 'moment'
import React from 'react'
import UpdatePlatforms from '../UpdatePlatforms'


export const columnsPlatforms = [
     {
          header: 'Platform',
          accessorKey: '_id'
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