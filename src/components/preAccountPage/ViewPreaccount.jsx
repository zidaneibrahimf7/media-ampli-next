import React, {useState, useEffect} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import TableViewPreaccountDetail from './Tables/TableViewPreaccountDetail'

export default function ViewPreaccount ({data}){
  return (
    <>
        <main>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default">View Preaccount</Button>
                </DialogTrigger>
                <DialogContent className="w-full" style={{ width: '90%', maxWidth: '65rem' }}>
                    <TableViewPreaccountDetail data={data} />
                </DialogContent>
            </Dialog>
        </main>
    </>
  )
}

