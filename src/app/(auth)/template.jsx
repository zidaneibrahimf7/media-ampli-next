'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function AuthTemplate({ children }) {
  const { status } = useSession()

  // console.log(status)

  if (status === 'authenticated') {
    return redirect('/accounts') 
  }

  return <div>{children}</div>

}