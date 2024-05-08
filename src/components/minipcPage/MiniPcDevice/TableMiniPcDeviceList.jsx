'use client'

import React, {useState, useEffect} from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function TableMiniPcDeviceList({id, data, count}){
    // console.log(id, '::Id')

  return (
    <>
        {/* Table */}
        <Table 
            className="bg-secondary rounded-sm" 
            containerClassname="h-fit max-h-80 overflow-y-auto relative"
        >
            <TableHeader className="items-center bg-primary">
                <TableRow key={data.port}>
                <TableHead className="w-[100px] text-secondary">Device ID</TableHead>
                    <TableHead className="w-[100px] text-secondary">IP</TableHead>
                    <TableHead className="w-[100px] text-secondary">Port</TableHead>
                    <TableHead className="w-[100px] text-secondary">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.length && count > 0 ? 
                    <>
                    {
                        data.map((v, i) => {
                            // console.log(v, i, 'wqwq')
                            let statusDevice = ''
                            if(v.status === 'error' || v.status === 'timeout') {
                              statusDevice = 'danger/50'
                            } else if (v.status === 'maintenance') {
                              statusDevice = 'yellow-300/30'
                            }

                            return (
                                <>
                                     <TableRow className={`bg-${statusDevice}`} key={i}>
                                        <TableCell className="">{v.deviceId}</TableCell>
                                        <TableCell>{v.ipAddress}</TableCell>
                                        <TableCell>{v.port}</TableCell>
                                        <TableCell>{v.status}</TableCell>
                                    </TableRow>
                                </>
                            )
                        })
                    }
                    </>
                    :
                    <>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell className="font-medium"><div className='text-center ml-3 pl-3' style={{'width' : '10rem', 'marginLeft' : '3rem'}}>Data is not available</div></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </>
                }
            </TableBody>
        </Table>
    </>
  )
}