'use client'

import React, {useState, useEffect} from 'react'

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
  import { Button } from "@/components/ui/button"
  import { Trash2 } from 'lucide-react'

  import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toastrSuccess, toastrWarning } from '@/helpers/Toaster'

export default function DeleteMiniPc({data, miniPcId, closeModal}){
    // console.log(data, ':::dataas')
    // const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async (miniPcId) => {
        // console.log('qwqwq', miniPcId)
        let params = {
            miniPcId: miniPcId
        }

        mutate(params)
        // console.log(params, ':::paramss')
        // try {
        //     const response = await fetch('/api/Device?act=delete-minipc', {
        //         method: 'POST',
        //         body: JSON.stringify(params),
        //         mode: 'cors',
        //         cache: 'default'
        //       })
        
        //       const data = await response.json()
        
        //       let {code, content, message} = data

        //       if(code === 0) {
        //         toast.success(message, {
        //           style: {
        //             border: '1px solid #55CD6C',
        //             padding: '12px',
        //             color: '#FFFAEE',
        //             backgroundColor: '#55CD6C'
        //           },
        //           iconTheme: {
        //             primary: '#FFFAEE',
        //             secondary: '#55CD6C',
        //           },
        //         })
        //         setTimeout(() => location.reload(), 2000)
        //       } 
        //       else {
        //         toast.error(message, {
        //           style: {
        //             border: '1px solid hsl(0 100% 64%)',
        //             padding: '12px',
        //             color: '#FFFAEE',
        //             backgroundColor: 'hsl(0 100% 64%)'
        //           },
        //           iconTheme: {
        //             primary: '#FFFAEE',
        //             secondary: 'hsl(0 100% 64%)'
        //           },
        //         })
        //       }

        // } catch (error) {
        //     console.error('error message:', error)
        // }
    }

    const client = useQueryClient()
    const {mutate} = useMutation({
      mutationFn: async(params) => {
        const url = '/api/Device?act=delete-minipc'
        const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(params),
              mode: 'cors',
              cache: 'default'
        })
        const result = await response.json()

        return result
      },
      onSuccess: (data) => {
        if(data.code === 0){
          client.invalidateQueries({queryKey: ['miniPc']})
          toastrSuccess(data.message)
          // setIsOpen(false)
          closeModal(false)
        } else {
          toastrWarning(data.message)
        }

      }
    })





  return (
    <main>
        <AlertDialog>
            <AlertDialogTrigger asChild><Button type='button' variant='danger'><Trash2 /></Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure want to delete this PC ?</AlertDialogTitle>          
                    <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete this PC from servers.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button variant="danger" onClick={() => handleDelete(data.miniPcId)}>Delete</Button>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    </main>
  )
}