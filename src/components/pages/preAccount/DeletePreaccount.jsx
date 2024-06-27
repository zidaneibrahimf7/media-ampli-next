import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { Button } from '@/components/ui/button'

import { toastrSuccess, toastrWarning } from "@/helpers/Toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function DeletePreaccount({email}) {
    const [alertMessage, setAlertMessage] = useState('Data has been deleted!')
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async(email) => {
        let params = {
          email: email
        }

        mutate(params)
        setIsOpen(false)
        // console.log(params)
        // let response = await fetch('/api/Preaccount?act=deletePreaccount', {
        //   method: "POST",
        //   mode: 'cors',
        //   cache: 'default',
        //   // credentials: 'same-origin',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(params)
        // })
    
        // const data = await response.json()
    
        // const { code, content, message} = data
    
        // if(code === 0 && content) {
        //     toastrSuccess(message)
        // } else {
        //   toastrWarning(message)
        // }

        // setTimeout(() => location.reload(), 2000)
      }
      
      const client = useQueryClient()
      const {mutate, isPending} = useMutation({
          mutationFn: async (params) => {
            const url = '/api/Preaccount?act=deletePreaccount'
            const response = await fetch(url, {
                method: "POST",
                mode: 'cors',
                cache: 'default',
                // credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })

            const result = await response.json()
            const {code, content, message} = result
            setAlertMessage(message)
            if(code === 0) return result
          },
          onSuccess: (data) => {
            client.invalidateQueries({queryKey: ['preaccount']})
            toastrSuccess(alertMessage)
          }
      })

    
    return (
        <>
          <AlertDialog open={isOpen}>
            <AlertDialogTrigger><Button variant="danger" onClick={() => setIsOpen(true)}>Delete Preaccount</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure want to delete {email} ?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                <Button variant="danger" onClick={() => handleDelete(email)}>Delete</Button>
                {/* <AlertDialogAction>Continue</AlertDialogAction> */}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </>
    )
}