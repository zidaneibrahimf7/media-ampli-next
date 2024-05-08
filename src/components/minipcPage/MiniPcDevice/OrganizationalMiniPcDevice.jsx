'use client'

import React, {useState} from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'

import { Smartphone } from 'lucide-react'

export default function OrganizationalMiniPcDevice({data, namePc}) {
    // console.log(data, ':::data')
    // const [nameDevice, setNameDevice] = useState('')
  return (
   <main>
    <Tree 
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
                         <TreeNode label={<span className='text-center flex justify-center mt-2'><Smartphone size={30} /></span>}>
                            <TreeNode label={port}>
                                {/* <TreeNode label={ipAddress} /> */}
                            </TreeNode>
                         </TreeNode>
                         {/* <TreeNode label={deviceId}>
                             <TreeNode label={ipAddress} />
                             <TreeNode label={port} />
                         </TreeNode> */}
                    </>
                )
            })
        }

    </Tree>

   </main>
  )
}