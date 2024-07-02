import React from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Check, Construction, MonitorCheck } from 'lucide-react'
import moment from 'moment'

import Pagination from '@/components/utilities/Pagination'
import { toastrSuccess } from '@/helpers/Toaster'

export default function TableDevicePage({data}){

    const changeStatus = async(deviceId, isMaintenance) => {
        // console.log(deviceId, isMaintenance, 'status')

        let params = {
          deviceId: deviceId,
          maintenance: isMaintenance === 0 ? 1 : 0 
        }
    
        // console.log(params, 'passs')
    
        const response = await fetch('/api/Device?act=maintenances', {
          method: 'POST',
          body: JSON.stringify(params),
          mode: 'cors',
          cache: 'default'
        })
    
        const data = await response.json()
        // console.log(data)
        let { code, content, message } = data
    
        if(code === 0) {
          toastrSuccess((isMaintenance === 1 ? 'Set active success' : 'Set maintenance success'))
          setTimeout(() => location.reload(), 2000)
        }
      }

  return (
    <>
        <Table className="bg-secondary rounded-sm">
            <TableHeader className="text-center items-center bg-primary">
                <TableRow>
                    <TableHead className="text-secondary">Device ID</TableHead>
                    <TableHead className="text-secondary">IP Port</TableHead>
                    <TableHead className="text-secondary pl-4" style={{'paddingLeft' : '2rem'}}>Status</TableHead>
                    <TableHead className="text-secondary">Status Activity</TableHead>
                    <TableHead className="text-secondary">Last Activity</TableHead>
                    <TableHead className="text-secondary">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.count > 0 ?
                    <>
                     {
                    // console.log(data, '::data::')
                        data.results.map((v, i) => {
                            // console.log(v, i)
                            return (
                                <TableRow className="hover:bg-white">
                                    <TableCell>{v._id}</TableCell>
                                    <TableCell>{v.deviceIpPort}</TableCell>
                                    <TableCell>{v.isMaintenance === 0 ? <Badge variant="success" className="ml-3" style={{'marginLeft' : '1.4rem'}}>Active</Badge> : <Badge variant="warning">Maintenance</Badge>}</TableCell>
                                    <TableCell><div className='mx-3 px-3'>{v.statusActivity}</div></TableCell>
                                    <TableCell>{moment.utc(v.lastActivity).format('YYYY-MM-DD HH:mm')}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => changeStatus(v._id, v.isMaintenance)}
                                            variant={v.isMaintenance === 0 ? 'warning' : 'success'}
                                        >
                                            {
                                                v.isMaintenance === 0 ?
                                                <div className='flex items-center gap-2'><Construction size={22} className="" />Set Maintenance</div>
                                                :
                                                <div className='flex items-center gap-2'><MonitorCheck size={22} className="" />Set Active</div>
                                            }
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                    
                    </>
                    :
                    <TableRow className="hover:bg-white">
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell className="text-lg">No Data Available</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                    </TableRow>
                }
            </TableBody>
        </Table>
    </>
  )
}

