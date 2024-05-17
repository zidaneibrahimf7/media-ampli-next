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


export default function DeletePreaccount({email}) {
    const handleDelete = async(email) => {
        let params = {
          email: email
        }

        // console.log(params)
        let response = await fetch('/api/Preaccount?act=deletePreaccount', {
          method: "POST",
          mode: 'cors',
          cache: 'default',
          // credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })
    
        const data = await response.json()
    
        const { code, content, message} = data
    
        if(code === 0 && content) {
            toastrSuccess(message)
        } else {
          toastrWarning(message)
        }

        setTimeout(() => location.reload(), 2000)
      }

    
    return (
        <>
          <AlertDialog>
            <AlertDialogTrigger><Button variant="danger">Delete Preaccount</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure want to delete {email} ?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="danger" onClick={() => handleDelete(email)}>Delete</Button>
                {/* <AlertDialogAction>Continue</AlertDialogAction> */}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </>
    )
}