'use client'

import React, {useState, useEffect} from 'react'
import Pagination from '@/components/utilities/Pagination'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import Loading from '@/components/utilities/Loading'

import CreatePreaccount from '@/components/preAccountPage/Forms/CreatePreaccount'
import TablePreaccount from '@/components/preAccountPage/Tables/TablePreaccount'

import { useSession } from 'next-auth/react'

export default function PreaccountPage(){
  const [preAccount, setPreAccount] = useState({})
  const [countAccount, setCountAccount] = useState(0)
  const [limit, setLimit] = useState(20)
  const [currentPage, setPage] = useState(1)
  const [done, setDone] = useState(false)

  const [searchPreaccount, setSearchPreaccount] = useState('')

  const {data: session, status} = useSession()
  
  const getPreaccountInfo = async (page, search) => {
    if(!page) page = currentPage
    let offset = (page === 1) ? 0 : ((page - 1) * limit)

    let params = {
      'offset': offset,
      'limit' : limit,
      'search' : (searchPreaccount ? searchPreaccount : '')
    }

    let response = await fetch('/api/Preaccount?act=getPreaccount', {
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
    // console.log(data, 'datasss')
    setDone(true)

    if(page !== currentPage) setPage(page)

    let { code, content } = data
    // console.log(content, 'contentsss')

    if(code === 0 && content.results) {
      setPreAccount(content.results)
      setCountAccount(content.count)
      return content.results
    }
  }

  useEffect(() => {
    getPreaccountInfo()
    // updatePreaccount()
  }, [searchPreaccount])
  

  return (
    <>
      <main>
      {
        status === 'authenticated' ?
        <section>
          <div className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
            <h1 className='text-2xl font-semibold my-5 mx-3'>Preaccount List</h1>
          <>
          {
            done ?
            <>
              <div className='flex justify-between mx-1'>
                {/* countAccount and Search Components */}
                <div>
                  <Label className='mx-1 px-2 py-5'>Total: {countAccount > 1 ? <span>{countAccount} accounts</span> : <span>{countAccount} account</span>}</Label>
                  <div className='flex gap-2'>
                      <form className='ml-3 mt-3'>
                        {/* <Label className='text-xs'>Search by email</Label> */}
                        <Input
                        type="text"
                        placeholder="search and press enter..."
                        onChange={(e) => {
                          e.preventDefault()
                          // console.log(e.target.value, 'vals')
                          setSearchPreaccount(e.target.value)
                          if(!e) {
                            getPreaccountInfo()
                          }
                        }}
                        onKeyPress={(e) => {
                          if(e.key === 'Enter') {
                            e.preventDefault()
                            // console.log(e.key, e.target.value)
                            setSearchPreaccount(e.target.value)
                            getPreaccountInfo()
                          }
                        }}
                        className="border border-primary"
                        style={{'width': '12rem'}}
                        />
                      </form>
                  </div>
                </div>
                <CreatePreaccount />
              </div>
              {
                preAccount.length ? 
                <>
                  <TablePreaccount data={preAccount} />
                  <div className='flex justify-end mt-4 mx-4'>
                    <Pagination length={countAccount} limit={limit} page={currentPage} callback={getPreaccountInfo} />
                  </div>
                </>
                :
                <>
                {
                  preAccount.length === 0 ?
                  <div className='flex justify-center'>Data is not available</div>
                  :
                  <div className='flex justify-center'><Loading /></div>

                }
                </>
              }
            </>
            :
            <div className='flex justify-center'><Loading /></div>
          }
            </>
          </div>
        </section>
          :
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'><span className='loader'></span></div>
      }
      </main>
    </>
  )
}