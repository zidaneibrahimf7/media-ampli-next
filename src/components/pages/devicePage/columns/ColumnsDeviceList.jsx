'use client'


import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { firstCase } from '@/helpers/Helpers'
import { toastrSuccess } from '@/helpers/Toaster'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Construction, MonitorCheck } from 'lucide-react'
import moment from 'moment'
import React from 'react'


export const ColumnsDeviceList = [
     {
          header: 'Device ID',
          accessorKey: '_id'
     },
     {
          header: 'IP Port',
          accessorKey: 'deviceIpPort'
     },
     {
          header: 'Status',
          accessorFn: (item) => item,
          cell: (key) => {
               const dataKey = key.row.original
               // console.log(dataKey)
               const statusMaintenance = dataKey.isMaintenance
               // console.log(statusMaintenance)
               let badgeStatusBasedMaintenance
               switch(statusMaintenance){
                    case 0: 
                         badgeStatusBasedMaintenance = <Badge variant="success">Active</Badge>
                         break;
                    default:
                         badgeStatusBasedMaintenance = <Badge variant="warning">Maintenance</Badge>
                         break;
               }

               return badgeStatusBasedMaintenance

          }
     },
     {
          header: 'Status Activity',
          accessorKey: 'statusActivity',
          cell: (item) => {
               const statusActivity = item.getValue()
               return firstCase(statusActivity)
          }
     },
     {
          header: 'Last Activity',
          accessorKey: 'lastActivity',
          cell: (item) => {
               const lastActivity = item.getValue()
               // console.log(lastActivity)
               return moment.utc(lastActivity).format('YYYY-MM-DD HH:mm')
          }
     },
     {
          header: 'Action',
          accessorFn: (item) => item,
          cell: (key) => {
               const dataKey = key.row.original
               // console.log(dataKey, '::dataKey::')
               const id = dataKey._id
               // console.log(id, '::id::')
               const statusMaintenance = dataKey.isMaintenance

               const client = useQueryClient()

               const changeStatus = async (id, statusMaintenance) => {
                    // console.log(id, statusMaintenance)
                    let params = {
                         deviceId: id,
                         maintenance: statusMaintenance === 0 ? 1 : 0
                    }
                    // console.log(params)
                    mutate(params)
               }

               const {mutate, isPending} = useMutation({
                    mutationFn: async (params) => {
                         const url ='/api/Device?act=maintenances'
                         const response = await fetch(url, {
                              method: 'POST',
                              body: JSON.stringify(params),
                              mode: 'cors',
                              cache: 'default'
                         })

                         const result = await response.json()
                         const {code, content, message} = result

                          if(code === 0) return result
                    },
                    onSuccess: (data) => {
                         client.invalidateQueries({queryKey: ['devices']})
                         toastrSuccess((statusMaintenance === 1 ? 'Set active success' : 'Set maintenance success'))
                    }
               })
               return (
                    <Button
                         variant={statusMaintenance === 0 ? 'warning' : 'success'}
                         onClick={() => changeStatus(id, statusMaintenance)}
                    >{
                         statusMaintenance === 0 ?
                          <div className='flex items-center gap-2'><Construction size={22} className="" />Set Maintenance</div>
                          :
                           <div className='flex items-center gap-2'><MonitorCheck size={22} className="" />Set Active</div>
                     }
                    </Button>
               )
          }
     }
]