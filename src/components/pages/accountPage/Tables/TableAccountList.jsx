'use client'
import { Fragment } from 'react'
import Image from 'next/image'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUp, ArrowDown, ArrowUpDown} from 'lucide-react'

import moment from 'moment'


export default function TableAccountList({data, handleSorting, sortKeyValue, sortOrder}){
     console.log(data, '::data::')

     return (
           <div className='rounded-md border mx-4 my-5'>
                            <Table className="bg-secondary">
                              <TableHeader className="text-center items-center bg-secondary">
                                <TableRow>
                                  <TableHead className=""><Button className="flex justify-center text-black bg-secondary items-center gap-1 hover:text-success" onClick={() => handleSorting('name')}>Name {sortKeyValue === 'name' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                                  <TableHead className=""><Button className="flex justify-center text-black bg-secondary items-center gap-1 hover:text-success" onClick={() => handleSorting('id')}>User ID {sortKeyValue === 'id' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                                  <TableHead className=""><Button className="flex justify-center text-black bg-secondary items-center gap-1 hover:text-success" onClick={() => handleSorting('deviceId')}>Device ID {sortKeyValue === 'deviceId' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                                  <TableHead className=""><Button className="flex justify-center text-black bg-secondary items-center gap-1 hover:text-success" onClick={() => handleSorting('statusActive')}>Status {sortKeyValue === 'statusActive' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                                  <TableHead className="">Platform</TableHead>
                                  <TableHead className=""><Button className="flex justify-center text-black bg-secondary items-center gap-1 hover:text-success" onClick={() => handleSorting('lastActivity')}>Last Activity {sortKeyValue === 'lastActivity' ? sortOrder === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {
                                  data.map((value, index) => {
                                    // const src = `/api/Media/photoProfile/${value.profilePicture}`;
                                    // const myLoader=({src})=>{
                                    //   // console.log(src, 'ww')
                                    //   // return `http://2.250.10.1:21215/api/Media/getProfilePicture/${value.profilePicture}`;
                                    //   return `/api/media/profilePicture/${value.profilePicture}`;
                                    // }

                                    // const nameWithProfilePicture = <div className='relative' style={{'height' : '40px', 'width' : '40px'}}><Image loader={myLoader} src={`http://192.168.1.101:21215/api/Media/getProfilePicture/${value.profilePicture}`} layout='fill' objectFit='cover' className="rounded-full" /></div>
                                    const nameWithProfilePicture = <div className='relative' style={{'height' : '40px', 'width' : '40px'}}><Image src={`/api/media/profilePicture/${value.profilePicture}`} fill sizes="auto" style={{objectFit: 'cover'}} className="rounded-full" alt="..." /></div>
                                    
                                    // console.log(value.status)
                                    // console.log(value.statusActive)
                                    
                                    let valueActive = ''
                                    // let valueStatusActive = ''
                                    if(value.status === ' active' || value.statusActive === 'active') {
                                      valueActive = <Badge variant="success">Active</Badge>
                                    } else if (value.status === 'active' && value.statusActive === 'backup') {
                                      valueActive = <Badge variant="outline">Backup</Badge>
                                    } else if (value.status === 'inactive') {
                                      valueActive = <Badge variant="warning">Inactive</Badge>
                                    } else if (value.status === 'not_available') {
                                      valueActive = <Badge variant="danger">Banned</Badge>
                                    } else {
                                      valueActive = <Badge>No Status</Badge>
                                    }
          
                                    return (
                                      <Fragment key={index}>
                                        <TableRow className="hover:bg-white" key={index}>
                                          <TableCell><div className='flex gap-2'>{nameWithProfilePicture}<span className="mt-2">{value.name}</span></div></TableCell>
                                          <TableCell>{value.id ? value.id : " "}</TableCell>
                                          <TableCell>{value.deviceId ? value.deviceId : " "}</TableCell>
                                          <TableCell>{valueActive ? <div className='mx-3'>{valueActive}</div> : " "}</TableCell>
                                          <TableCell>{value.platform ? value.platform : " "}</TableCell>
                                          <TableCell>{value.lastActivity? moment.utc(value.lastActivity).format('YYYY-MM-DD HH:mm') : "-"}</TableCell>
                                        </TableRow>
                                      </Fragment>
                                    )
                                  })
                                }
                              </TableBody>
                            </Table>
                          </div>
     )
     
}