'use client'

import React, {useState, useEffect} from 'react'
import Pagination from '@/components/utilities/Pagination'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import Loading from '@/components/utilities/Loading'

import CreatePreaccount from '@/components/pages/preAccount/Forms/CreatePreaccount'
import TablePreaccount from '@/components/pages/preAccount/Tables/TablePreaccount'

import { useSession } from 'next-auth/react'

import { useQuery } from '@tanstack/react-query'
import DataTable from '@/components/custom/DataTable'
import { columnsPreaccount } from '@/components/pages/preAccount/columnsTable/columnsPreaccount'
import useSorting from '@/hooks/useSorting'
import usePagination from '@/hooks/usePagination'

const rowEachPage = 20

export default function PreaccountPage(){
  // const [preAccount, setPreAccount] = useState({})
  // const [countAccount, setCountAccount] = useState(0)
  // // const [limit, setLimit] = useState(20)
  // const [currentPage, setPage] = useState(1)
  // const [done, setDone] = useState(false)

  const [searchPreaccount, setSearchPreaccount] = useState('')

  const {data: session, status} = useSession()
  
  // const getPreaccountInfo = async (page, search) => {
  //   if(!page) page = currentPage
  //   let offset = (page === 1) ? 0 : ((page - 1) * limit)

  //   let params = {
  //     'offset': offset,
  //     'limit' : limit,
  //     'search' : (searchPreaccount ? searchPreaccount : '')
  //   }

  //   let response = await fetch('/api/Preaccount?act=getPreaccount', {
  //     method: "POST",
  //     mode: 'cors',
  //     cache: 'default',
  //     // credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(params)

  //   })

  //   const data = await response.json()
  //   // console.log(data, 'datasss')
  //   setDone(true)

  //   if(page !== currentPage) setPage(page)

  //   let { code, content } = data
  //   // console.log(content, 'contentsss')

  //   if(code === 0 && content.results) {
  //     setPreAccount(content.results)
  //     setCountAccount(content.count)
  //     return content.results
  //   }
  // }

  // useEffect(() => {
  //   getPreaccountInfo()
  //   // updatePreaccount()
  // }, [searchPreaccount])

  const { sortKey, sortOrder, onSortingChange, sorting } = useSorting("-dateCreate")
  const { offset, limit, onPaginationChange, pagination } = usePagination(rowEachPage)

  const {data: preAccountData, isSuccess, isLoading, isError, refetch} = useQuery({
    queryKey: ['preaccount', pagination, searchPreaccount],
    queryFn: async () => {
        let url = '/api/Preaccount?act=getPreaccount'
        let params = {
            'offset': offset,
            'limit' : limit,
            'search' : (searchPreaccount ? searchPreaccount : '')
        }

        const response = await fetch(url, {
          method: "POST",
          mode: 'cors',
          cache: 'default',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })
        // console.log(response, '::responseQuery::')
        const result = await response.json()
        // const {code, content} = result

        if(result.code === 0) return result

    }
  })

  return (
    <>
      <main>
      {
        status === 'authenticated' ?
        <section>
          <div className='rounded-sm py-3 m-5 bg-white items-center shadow-xl'>
            <h1 className='text-2xl font-semibold my-5 mx-3'>Preaccount List</h1>
            <div className='flex justify-between mx-1'>
              <div className='flex gap-2'>
                <form className='ml-3 mt-3'>
                  <Input
                      type="text"
                      placeholder="search and press enter..."
                      onChange={(e) => {
                        e.preventDefault()
                        setSearchPreaccount(e.target.value)
                        // if(!e) {
                        //   getPreaccountInfo()
                        // }
                      }}
                      onKeyPress={(e) => {
                        if(e.key === 'Enter') {
                          e.preventDefault()
                          setSearchPreaccount(e.target.value)
                          // getPreaccountInfo()
                        }
                      }}
                      className="border border-primary"
                      style={{'width': '12rem'}}
                  />
                </form>
              </div>
              <CreatePreaccount />
            </div>
            <DataTable 
                      data={preAccountData}
                      columns={columnsPreaccount}
                      sorting={sorting}
                      error={isError}
                      onSortingChange={onSortingChange}
                      pagination={pagination}
                      onPaginationChange={onPaginationChange}
                      rowEachPage={rowEachPage}
                      isLoading={isLoading}
                      className={'rounded-md mx-4 my-5'}
                      classNameTableRow={'hover:bg-secondary'}
                    
            />
          {/*  */}
          <>
          {
            // done ?
            // <>
            //   <div className='flex justify-between mx-1'>
            //     <div>
            //       <Label className='mx-1 px-2 py-5'>Total: {preAccountData.content.count > 1 ? <span>{preAccountData.content.count} accounts</span> : <span>{preAccountData.content.count} account</span>}</Label>
            //       <div className='flex gap-2'>
            //           <form className='ml-3 mt-3'>
            //             {/* <Label className='text-xs'>Search by email</Label> */}
            //             <Input
            //             type="text"
            //             placeholder="search and press enter..."
            //             onChange={(e) => {
            //               e.preventDefault()
            //               setSearchPreaccount(e.target.value)
            //               if(!e) {
            //                 getPreaccountInfo()
            //               }
            //             }}
            //             onKeyPress={(e) => {
            //               if(e.key === 'Enter') {
            //                 e.preventDefault()
            //                 setSearchPreaccount(e.target.value)
            //                 getPreaccountInfo()
            //               }
            //             }}
            //             className="border border-primary"
            //             style={{'width': '12rem'}}
            //             />
            //           </form>
            //       </div>
            //     </div>
            //     <CreatePreaccount />
            //   </div>
            //   {
            //     preAccount.length > 0 ? 
            //     <>
            //       <TablePreaccount data={preAccount} />
            //       <div className='flex justify-end mt-4 mx-4'>
            //         <Pagination length={countAccount} limit={limit} page={currentPage} callback={getPreaccountInfo} />
            //       </div>
            //     </>
            //     :
            //     <>
            //     {
            //       preAccount.length === 0 ?
            //       <div className='flex justify-center'>Data is not available</div>
            //       :
            //       <div className='flex justify-center'><Loading /></div>

            //     }
            //     </>
            //   }
            // </>
            // :
            // <div className='flex justify-center'><Loading /></div>
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