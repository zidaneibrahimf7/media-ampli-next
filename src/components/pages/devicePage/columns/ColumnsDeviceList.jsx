'use client'


import Modal from '@/components/custom/Modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { firstCase } from '@/helpers/Helpers'
import { toastrSuccess } from '@/helpers/Toaster'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Construction, MonitorCheck, Smartphone} from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import DeviceMonitoring from '../DeviceMonitoring'


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
               // const statusMaintenance = dataKey.isMaintenance
               // console.log(statusMaintenance)
               // let badgeStatusBasedMaintenance
               // switch(statusMaintenance){
               //      case 0: 
               //           badgeStatusBasedMaintenance = <Badge variant="success">Active</Badge>
               //           break;
               //      default:
               //           badgeStatusBasedMaintenance = <Badge variant="warning">Maintenance</Badge>
               //           break;
               // }

               const status = dataKey.status
               // console.log(status)

               let badgeShowStatus

               switch(status){
                    case 'on': 
                         badgeShowStatus = <Badge variant="success">Active</Badge>
                         break;
                    case 'maintenance':
                         badgeShowStatus = <Badge variant="warning">Maintenance</Badge>
                         break;
                    case 'error':
                         badgeShowStatus = <Badge variant="danger">Error</Badge>
                         break;
                    default:
                         badgeShowStatus = ""
                         break;
               }

               return badgeShowStatus

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

               const keyIpPort = dataKey.deviceIpPort.split(':')
               // console.log(keyIpPort)
               const port = keyIpPort[1]
               const ip = keyIpPort[0]

               const status = dataKey.status
               // console.log(status)

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

               const [isOpen, setIsOpen] = useState(false)

               function keyEscPress(e){
                    e.preventDefault()
                    // console.log(e)
                    if(e.key === "Escape") {
                         setIsOpen(true)
                    }
               }

               return (
                    <>
                    {
                         status !== 'error' ?
                         <div className='flex gap-2'>
                              <div>
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
                              </div>
                              <div>
                                   <Modal 
                                        trigger={<Button className="flex gap-2"><Smartphone />View Devices</Button>}
                                        title={`View Device "${dataKey._id}"`}
                                        fontSizeTitle={'90px'}
                                        content={<DeviceMonitoring id={dataKey._id} port={port} ip={ip} />}
                                        open={isOpen}
                                        classNameBox={'overflow-y-auto h-[54.7rem]'}
                                        onOpenChange={setIsOpen}
                                        width={'105rem'}
                                        onEscapeKeyDown={(e) => keyEscPress(e)}
                                        onInteractOutside={(e) => {
                                             e.preventDefault()
                                             let {className} = e.target
                                             if(e){
                                                  setIsOpen(true)
                                             }
                                        }}
                                   />
                              </div>

                         </div>
                         :
                         false
                    }
                    </>
               )
          }
     }
]