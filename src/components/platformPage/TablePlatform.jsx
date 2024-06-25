'use client'

import React, {useState, useEffect}from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import moment from 'moment'
import UpdatePlatforms from './UpdatePlatforms'

export default function TablePlatform({data}){

    return (
        <main>
            <div className='rounded-md border mx-4 my-5'>
                <Table className="bg-secondary rounded-sm">
                    <TableHeader className="items-center bg-primary">
                        <TableRow>
                            <TableHead className="text-secondary">Platform</TableHead>
                            <TableHead className="text-secondary">IP</TableHead>
                            <TableHead className="text-secondary">Port</TableHead>
                            <TableHead className="text-secondary" style={{'paddingLeft' : '8rem'}}>Active Account Threshold</TableHead>
                            <TableHead className="text-secondary">Last Activity</TableHead>
                            <TableHead className="text-secondary">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            // console.log(data.results)
                            data.results.map((v, i) => {
                                // console.log(v, i)
                                return (
                                    <TableRow className="hover:bg-white" key={i}>
                                        <TableCell>{v._id}</TableCell>
                                        <TableCell>{v.ip}</TableCell>
                                        <TableCell>{v.port}</TableCell>
                                        <TableCell><div className='ml-3 pl-3' style={{'paddingLeft' : '12rem'}}>{v.activeAccountThreshold}</div></TableCell>
                                        <TableCell>{moment.utc(v.lastActivity).format('YYYY-MM-DD HH:mm')}</TableCell>
                                        <TableCell><UpdatePlatforms data={v} /></TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}