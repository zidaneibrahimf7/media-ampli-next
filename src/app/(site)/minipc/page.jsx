'use client'

import React, {useState, useEffect} from 'react'

import Loading from '@/components/utilities/Loading'

import InformationColor from '@/components/minipcPage/MiniPcInfo/InformationColor'
import AddMiniPc from '@/components/minipcPage/FormsMiniPc/AddMiniPc'
import MonitorPcList from '@/components/minipcPage/MonitorPcList'

export default function Minipc() {
  const [miniPc, setMinipc] = useState({})
  const [countMinipc, setCountMinipc] = useState('')
  const [done, setDone] = useState(false)
  
  const getListMiniPc = async () => {
    let params = {
      // offset: "",
      // limit: "",
      // search: "1"
    }

    try {
      let response = await fetch('/api/Device?act=minipc', {
        method: "POST",
        mode: 'cors',
        cache: 'default',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
  
      const data = await response.json()
      // console.log(data, 'da')
      const { code, content, message} = data
      setDone(true)
  
      if(code === 0) {
        setMinipc(content.results)
        setCountMinipc(content.count)
      }
    } catch (err) {
      console.log('error message:::', err)
    }

  }


  useEffect(() => {
    getListMiniPc()
  }, [])


  return (
    <>
     <main className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
        <h1 className='text-2xl font-semibold my-5 mx-3'>PC List</h1>
        <InformationColor />
        {
          done ? 
          <section>
           <div className='flex justify-between mx-4'>
              <span className='mt-3'>Total: <span className='font-semibold'>{countMinipc} PC</span></span>
              <AddMiniPc />
           </div>
           <>
            {
              miniPc && countMinipc > 0 ?
              <>
                <div className='grid grid-cols-12 p-2 gap-2 mt-1 mx-3'>
                  {
                    miniPc.map((v, i) => {
                      // console.log(v, i)
                      let statusPc = ''
                      if(v.statusMiniPc === 'on' && v.deviceCount >= 40) {
                        statusPc ='success'
                      } else if(v.statusMiniPc === 'on' && v.deviceCount < 40) {
                        statusPc ='warning'
                      } else if (v.statusMiniPc === 'unreachable') {
                        statusPc = 'danger'
                      } else {
                        statusPc = 'backgroundPc'
                      }
                      return (
                        <MonitorPcList data={v} status={statusPc} key={i} />
                      )
                    })
                  }
                </div>
              </>
              :
              <div className='flex justify-center'>Data is not available</div>
            }
            </>
          </section>
          :
          <div className='flex justify-center'><Loading /></div>
        }
     </main>
    </>
  )
}