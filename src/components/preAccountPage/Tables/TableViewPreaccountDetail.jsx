import React, {useState, useEffect} from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function TableViewPreaccountDetail({data}){
    // console.log(data, 'pageViewTavle')
  return (
    <main className='mt-5'>
        <Table className="bg-secondary rounded-sm">
            <TableHeader className="text-center items-center bg-primary">
                <TableRow>
                    <TableHead className="text-secondary">Email</TableHead>
                    <TableHead className="text-secondary">Status</TableHead>
                    <TableHead className="text-secondary">Platform</TableHead>
                    <TableHead className="text-secondary">Password</TableHead>
                    <TableHead className="text-secondary">Username</TableHead>
                    <TableHead className="text-secondary">Phone Number</TableHead>
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
                                <TableRow key={i}>
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
    </main>
  )
}