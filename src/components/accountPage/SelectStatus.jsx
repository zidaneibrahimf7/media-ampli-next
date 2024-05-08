import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SelectStatus({onChangeStatus}){
  return (
    <>
        <div>
        <Select onValueChange={onChangeStatus}>
            <SelectTrigger className="w-auto mt-4"><SelectValue/></SelectTrigger>
            <SelectContent>
                <SelectItem>All Status</SelectItem> 
                <SelectItem value='active' key='active'>Active</SelectItem>
                <SelectItem value='backup' key='backup'>Backup</SelectItem>
                <SelectItem value='inactive' key='inactive'>Inactive</SelectItem>
                <SelectItem value='not_available' key='not_available'>Banned</SelectItem>
            </SelectContent>
        </Select>
        </div>
    </>
  )
}