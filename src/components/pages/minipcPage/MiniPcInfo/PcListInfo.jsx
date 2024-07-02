import React from 'react'

export default function PcListInfo({data}){
  return (
    <main>
         <div>
            <p>IP Address: {data.ipAddress}</p>
            <p>Port: {data.port}</p>
            <p>{data.deviceCount > 1 ? <>Total {data.deviceCount} devices</> : <>Total: {data.deviceCount} device</>}</p>
        </div>
    </main>
  )
}