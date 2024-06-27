import React, {useState, useEffect} from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function TableViewPreaccountDetail({data}){
    // console.log(data, 'pageViewTavle')
  return (
    <main className='mt-5'>
        <div className='rounded-md border'>
            <Table className="bg-white rounded-lg">
                <TableHeader className="">
                    <TableRow>
                        <TableHead className="">Email</TableHead>
                        <TableHead className="">Status</TableHead>
                        <TableHead className="">Platform</TableHead>
                        <TableHead className="">Password</TableHead>
                        <TableHead className="">Username</TableHead>
                        <TableHead className="">Phone Number</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {
                    data.platformLogin.length > 0 ?
                    <>
                        {
                            // console.log(data, '::data::')
                            data.platformLogin.map((v, i) => {
                                // console.log(v, i)
                                return (
                                    <TableRow key={i} className='hover:bg-secondary'>
                                        <TableCell>{data.email}</TableCell>
                                        <TableCell>{v.status === 1 ? <Badge variant="success">Available</Badge> : <Badge variant="danger">Not Available</Badge>}</TableCell>
                                        <TableCell>{v.platform}</TableCell>
                                        <TableCell>{v.password ? v.password : '-'}</TableCell>
                                        <TableCell>{v.username ? v.username : '-'}</TableCell>
                                        <TableCell>{v.msisdn ? v.msisdn : '-'}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </>
                    :
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-center">Data is not available</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                }
                </TableBody>
            </Table>
        </div>
    </main>
  )
}