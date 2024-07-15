'use client'
import React, {useState, useEffect, useReducer} from 'react'
// import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
// import { Label } from '@/components/ui/label'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

// import { Check, Construction, MonitorCheck } from 'lucide-react'
import moment from 'moment'
import Loading from '@/components/utilities/Loading'
import Pagination from '@/components/utilities/Pagination'

import { useSession } from 'next-auth/react'

import TableDevicePage from '@/components/pages/devicePage/TableDevicePage'
import { toastrError, toastrWarning } from '@/helpers/Toaster';
import { useQuery } from '@tanstack/react-query';
import DataTable from '@/components/custom/DataTable';
import { ColumnsDeviceList } from '@/components/pages/devicePage/columns/ColumnsDeviceList';
import useSorting from '@/hooks/useSorting';
import usePagination from '@/hooks/usePagination';
import { Skeleton } from '@/components/ui/skeleton';

export default function DevicesPage() {
  const [searchDevices, setSearchDevices] = useState('')

  const {data: session, status} = useSession()

    const rowEachPage = 15
    const {sortKey, sortValue, onSortingChange, sorting } = useSorting('lastActivity')
    const {offset, limit, onPaginationChange, pagination} = usePagination(rowEachPage)

    const {data: deviceList, isLoading, isError} = useQuery({
      queryKey: ['devices', pagination, searchDevices],
      queryFn: async () => {
        const url = '/api/Device?act=devices'
        let params = {
        "offset": offset,
        "limit": limit,
        "deviceId": "",
        "status": "",
        "statusActivity": "",
        "search": searchDevices ? searchDevices : ""
        }
        const response = await fetch(url, {
          method: "POST",
          headers: {
                'Content-Type': 'application/json'
          },
          mode: 'cors',
          body: JSON.stringify(params),
          cache: 'default'
        })

        const result = await response.json()
        // console.log(result, '::resultQuery::')
        const { code, content} = result
        if(code === 0) return result
      }
    })

    return (
      <>
      <main>
        {
          status === 'authenticated' ?
          <section>
            <div className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
            <h1 className='text-2xl font-semibold my-5 mx-3'>Devices List</h1>
            <div>
             { deviceList?.content ? <label className='mx-1 px-2 py-5 mb-3'>Total: {deviceList?.content?.count > 1 ? <span>{deviceList?.content?.count} devices</span> : <span>{deviceList?.content?.count} device</span>}</label> :  <Skeleton className="h-4 w-[20%]" />}
            </div>
            <div className='flex justify-end mx-3'>
                     <form>
                       <Input
                         type="text"
                         placeholder="search...."
                         onChange={(e) => {
                           e.preventDefault()
                            // console.log(e.target.value)
                           setSearchDevices(e.target.value.trim())
                           }}
                         onKeyPress={(event) => {
                           if (event.key === 'Enter') {
                               event.preventDefault();
                                // console.log(event.key, event.target.value)
                               setSearchDevices(event.target.value.trim())
                              // getDevices()
                             }
                           }}
                           className="mr-3"
                           style={{'width': '13rem'}}
                         />
                     </form>
            </div>
            {
              // console.log(deviceList)
              <DataTable 
                data={deviceList}
                columns={ColumnsDeviceList}
                sorting={sorting}
                onSortingChange={onSortingChange}
                pagination={pagination}
                onPaginationChange={onPaginationChange}
                rowEachPage={rowEachPage}
                isLoading={isLoading}
                error={isError}
                className={'rounded-md mx-4 my-5'}
                classNameTableRow={'hover:bg-secondary'}

              />
            }
            </div>
          </section> 
          :
          <>
          <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'><span className='loader'></span></div>
          </>
        }
      </main>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      </>
    )
}