import React from 'react'
import Image from 'next/image'

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import moment from 'moment'
import ViewPreaccount from '../ViewPreaccount'
import DeletePreaccount from '../DeletePreaccount'
import EditPreaccount from '../Forms/EditPreaccount'

export default function TablePreaccount({data}){
    // console.log(data)

  return (
    <>
        <main className='rounded-md border mx-4 my-5'>
            <Table className="bg-secondary rounded-sm">
                <TableHeader className="text-center items-center bg-primary">
                    <TableRow>
                        <TableHead className="text-secondary">Date Create</TableHead>
                        <TableHead className="text-secondary">Email</TableHead>
                        <TableHead className="text-secondary">Backup Code</TableHead>
                        <TableHead className="text-secondary px-5">Status</TableHead>
                        <TableHead className="text-secondary">Status Activity</TableHead>
                        <TableHead className="text-secondary">Last Activity</TableHead>
                        <TableHead className="text-secondary">Platform Active</TableHead>
                        <TableHead className="text-secondary text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.map((v, i) => {
                            // console.log(v, i)
                             // let countStatus = 0
                             // for (const objCount of v.platformLogin) {
                             //   if (objCount.status === 0) countStatus++
                             // }
                            const backupCodeList = v?.backupCode?.map((v, i) => {
                                // console.log(v, 'sssss')
                                return (
                                <div className='font-medium' key={i}>
                                  <ul className='list-disc'>
                                    <li>{v}</li>
                                  </ul>
                                </div>
                                )
                              })
                              const platformActive =  v.platformLogin.map((platform) => {
                                if(platform.status === 1) {
                                  return (
                                      <div className='relative col-span-1' style={{'width' : '27px', 'height' : '27px'}} key={platform._id}>
                                        <Image
                                            src={`/socmed/${platform.platform}.svg`}
                                            layout='fill'
                                            alt=''
                                            className='rounded-full col-span-3'
                                        />
                                      </div>
                                  )
                                } else {
                                  return ''
                                }
                              })
                            return (
                                <>
                                    <TableRow className={v.countDeactive === 6 ? 'bg-danger/50' : 'hover:bg-white'}>
                                        <TableCell>{moment.utc(v.dateCreate).format('YYYY-MM-DD HH:mm')}</TableCell>
                                        <TableCell>{v.email}</TableCell>
                                        <TableCell>{backupCodeList ? backupCodeList : ''}</TableCell>
                                        <TableCell>{v.status === 1 ? <Badge variant="success">Available</Badge> : <Badge variant="danger">Not Available</Badge>}</TableCell>
                                        <TableCell><div className='px-12'>{v.statusActivity}</div></TableCell>
                                        {
                                            platformActive ? <TableCell>  <div className='grid grid-cols-6 pl-2'>{platformActive}</div></TableCell> : ''
                                        }
                                        <TableCell>{moment.utc(v.lastActivity).format('YYYY-MM-DD HH:mm')}</TableCell>
                                        <TableCell>
                                            <div className='flex gap-2 ml-3'>
                                                <ViewPreaccount data={v} />
                                                <EditPreaccount data={v} />
                                                <DeletePreaccount email={v.email}/>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </main>
    </>
  )
}

