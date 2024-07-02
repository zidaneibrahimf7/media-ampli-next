'use client'

import React, {useState} from 'react'
// import { Tree, TreeNode } from 'react-organizational-chart'

import { Smartphone } from 'lucide-react'
import dynamic from 'next/dynamic'

const DynamicTree = dynamic(() => import('react-organizational-chart').then((module) => module.Tree), {
  ssr: false
})

const DynamicTreeNode = dynamic(() => import('react-organizational-chart').then((module) => module.TreeNode), {
  ssr: false
})

export default function OrganizationalMiniPcDevice({data, namePc}) {
    // console.log(data, ':::data')
  return (
    // <main>

    // </main>

   <main>
    <DynamicTree 
        lineWidth='2px'
        lineColor='green'
        lineBorderRadius='20px'
        label={<span className='border border-3 border-red-200'>{namePc}</span>}
    >
        {
            data.map((val, ind) => {
                // console.log(val, 'vall')
                const deviceId = val.deviceId
                const ipAddress = val.ipAddress
                const port = val.port
                const status = val.status
                const statusActivity = val.statusActivity
    
                return (
                    <>
                         <DynamicTreeNode label={<span className='text-center flex justify-center mt-2'><Smartphone size={30} /></span>}>
                            <DynamicTreeNode label={port}>
                                {/* <TreeNode label={ipAddress} /> */}
                            </DynamicTreeNode>
                         </DynamicTreeNode>
                         {/* <TreeNode label={deviceId}>
                             <TreeNode label={ipAddress} />
                             <TreeNode label={port} />
                         </TreeNode> */}
                    </>
                )
            })
        }

    </DynamicTree>

   </main>
  )
}