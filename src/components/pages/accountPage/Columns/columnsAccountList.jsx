'use client'


import React from 'react'
import Image from 'next/image'
import moment from 'moment'
import { Badge } from '@/components/ui/badge'

export const columnsAccountList = [
     {
          header: 'Name',
          accessorKey: 'name',
          cell: (key) => {
               const dataKey = key.row.original
               // console.log(dataKey, '::data::')
               const profilePicture = <div className='relative' style={{'height' : '40px', 'width' : '40px'}}><Image src={`/api/media/profilePicture/${dataKey.profilePicture}`} fill sizes="auto" style={{objectFit: 'cover'}} className="rounded-full" alt="..." /></div>
               const name = dataKey.name
               // console.log(name)
               return (
                    <div className='flex gap-2'>
                         <div>{profilePicture}</div>
                         <div className='mt-2'>{name}</div>
                    </div>
               )
          }
     },
     {
          header: 'User ID',
          accessorKey: 'id',
          cell: (item) => {
               const userId = item.getValue()
               return userId ? userId : ''
          }
     },
     {
          header: 'Device ID',
          accessorKey: 'deviceId',
          cell: (item) => {
               const deviceId = item.getValue()
               return deviceId ? deviceId : ''
          }
     },
     {
          header: 'Status',
          accessorFn: (item) => item,
          cell: (key) => {
               const dataKey = key.row.original
               const status = dataKey.status
               const statusActive = dataKey.statusActive
               // console.log(status, statusActive)
               let valueActive
               if(status === ' active' || statusActive === 'active') {
                    valueActive = <Badge variant="success">Active</Badge>
               } else if (status === 'active' && statusActive === 'backup') {
                    valueActive = <Badge variant="outline">Backup</Badge>
               } else if (status === 'inactive') {
                    valueActive = <Badge variant="warning">Inactive</Badge>
               } else if (status === 'not_available') {
                    valueActive = <Badge variant="danger">Banned</Badge>
               } else {
                    valueActive = <Badge>No Status</Badge>
               }

               return <div className='text-center flex justify-first'>{valueActive}</div>
          }
     },
     {
          header: 'Platform',
          accessorKey: 'platform',
          cell: (item) => {
               const platform = item.getValue()
               const platformImage = <div className='relative flex justify-center' style={{'height' : '40px', 'width' : '40px'}}><Image src={`/socmed/${platform}.svg`} fill sizes="auto" style={{objectFit: 'cover'}} className="rounded-full" alt={'...'} /></div>
               // return platform ? platform : ''
               return platform ? platformImage : ''
          }
     },
     {
          header: 'Last Activity',
          accessorKey: 'lastActivity',
          cell: (item) => {
               const lastActivity = item.getValue()
               return moment.utc(lastActivity).format('YYYY-MM-DD HH:mm')
          }
     },
]