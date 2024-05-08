import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SelectPlatform({onChangePlatform}){
  return (
    <>
    <div className='flex flex-wrap gap-2 mx-3'>
        <Select onValueChange={onChangePlatform}>
            <SelectTrigger className="w-auto mt-4"><SelectValue/></SelectTrigger>
            <SelectContent>
                <SelectItem>All platform</SelectItem> 
                <SelectItem value='facebook' key='facebook'>Facebook</SelectItem>
                <SelectItem value='instagram' key='instagram'>Instagram</SelectItem>
                <SelectItem value='twitter' key='twitter'>Twitter</SelectItem>
                <SelectItem value='tiktok' key='tiktok'>Tiktok</SelectItem>
                <SelectItem value='kompas' key='kompas'>Kompas</SelectItem>
                <SelectItem value='detik' key='detik'>Detik</SelectItem>
            </SelectContent>
        </Select>
    </div>
    </>
  )
}

