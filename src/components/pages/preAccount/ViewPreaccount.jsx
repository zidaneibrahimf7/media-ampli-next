import React, {useState, useEffect} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import TableViewPreaccountDetail from './Tables/TableViewPreaccountDetail'
import Modal from '../../custom/Modal'

export default function ViewPreaccount ({data}){
    // console.log(data, ":::L")

    return (
        <>
            <main>
                <Modal 
                    trigger={<Button variant="default">View Preaccount</Button>}
                    title={`View Preaccount`}
                    fontSizeTitle={'text-xl'}
                    content={<TableViewPreaccountDetail data={data} />}
                    width={'65rem'}
                    // className={'bg-white'}
                />
            </main>
        </>
  )
}

