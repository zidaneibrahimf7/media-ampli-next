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
import { firstCase } from '@/helpers/Helpers'
import { Skeleton } from '@/components/ui/skeleton'

export default function TableMiniPcDeviceList({id, data, count, isLoading}){
    // console.log(id, '::Id')
    // console.log(data, '::data::')
    // console.log(isLoading)


  return (
    <>
        {/* Table */}
        <Table 
            className="bg-secondary rounded-sm" 
            containerClassname="h-fit max-h-80 overflow-y-auto relative"
        >
            <TableHeader className="">
                <TableRow key={data?.port}>
                <TableHead className="w-[100px]">Device ID</TableHead>
                    <TableHead className="w-[100px]">IP</TableHead>
                    <TableHead className="w-[100px]">Port</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    !isLoading ? 
                    <>
                    {
                        data?.map((v, i) => {
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
                                        <TableCell>{firstCase(v.status)}</TableCell>
                                    </TableRow>
                                </>
                            )
                        })
                    }
                    </>
                    :
                    <>
                        {
                            data?.length === 0 && count === 0 ?
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center font-medium">No Results.</TableCell>
                            </TableRow>
                            :
                            <>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <TableRow>
                                        <TableCell className='' colSpan={2}>
                                                <Skeleton className="h-4 w-[70%]" />
                                        </TableCell>
                                        <TableCell className='' colSpan={2}>
                                                <Skeleton className="h-4 w-[70%]" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        }
                    </>
                }
            </TableBody>
        </Table>
    </>
  )
}