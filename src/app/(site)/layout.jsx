'use client'

import HeaderComponents from "@/components/layout/header-components"
import NavbarComponents from "@/components/layout/navbar-components"

export default function DashboardLayout({children}) {

  return (
    <>
      <HeaderComponents />
      <NavbarComponents />
      {children}
    </>
  )
}