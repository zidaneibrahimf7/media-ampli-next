'use client'

import React, {useState, useEffect, useReducer} from 'react'
import Image from 'next/image'

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';

import Pagination from '@/components/utilities/Pagination'

import { Users } from 'lucide-react'

import moment from 'moment'


const actionType = {
  account: 'getAccount',
  accountList: 'getAccountList',
  accountListCluster: 'getAccountListCluster',
  totalAccount: 'totalAccount',
  updatePage: 'updatePage',
  changePlatform: 'changePlatform',
  selectedPlatform: 'selectedPlatform',
  sort: 'sort',
}

function reducer(state, action) {
  const { type, payload } = action
  console.log(type, payload, state)

  switch(type) {
    case actionType.account:
      return {...state, account: payload}
    case actionType.accountList:
      return {...state, accountList: payload}
    case actionType.accountListCluster:
      return {...state, accountListCluster: payload}
    case actionType.totalAccount:
      return {...state, totalAccount: payload}
    case actionType.updatePage:
      return { ...state, currentPage: payload }
    case actionType.changePlatform: 
      return {...state, platformFilter: payload}
    case actionType.selectedPlatform:
      return {...state, platformId: payload}
    case actionType.sort:
      return {...state, sort: payload}
    default:
        return state;
  }
}

const initialState = {
  accountList: [],
  limit: 10,
  currentPage: 1,
  totalAccount: 0,
  platformFilter: null,
  // clusterId: null,
  platformId: null,
  sort: {
    dateCreate: -1
  }
}

export default function AccountsPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [accountSummary, setAccountSummary] = useState({})
  // const [countAccount, setAccountCount] = useState(0)

  const getAccount = async (page) => {
    // if(state.platformId)

    if(!page) page = state.currentPage
    let offset = (page === 1) ? 0 : ((page - 1) * state.limit)

    let response = await fetch('/api/Account?act=account&offset=' + offset + '&limit=' + state.limit + '&ignoreCluster=true&ignoreSlot=true')
    const data = await response.json()
    console.log(data, 'data ')
  }

  const getAccountList = async (page) => {
    if(state.platform) return false
    // console.log(state.platform, 'sss')

    console.log(page, 'pagee')
    if(!page) page = state.currentPage
    let offset = (page === 1) ? 0 : ((page - 1) * state.limit)

    let response = await fetch('/api/Account?act=list&offset=' + offset + '&limit=' + state.limit + ((state.platformFilter ? '&platform=' + state.platformFilter: '')))
    const data = await response.json()
    // console.log(data, 'getAccountList')

    const { code, content } = data
    // console.log(content, 'cliss')

    dispatch({'type': actionType.accountList, "payload": content?.accountsNonCluster})
    dispatch({'type': actionType.accountListCluster, "payload": content.clusters})
    dispatch({'type': actionType.totalAccount, payload: content.accountsNonCluster?.length})
    dispatch({'type': actionType.updatePage, payload: page})

    if(code === 0 && content) return content

  }

  const changedPlatform = (platform) => {
    // console.log(platform, 'ss')
    dispatch({'type': actionType.changePlatform, 'payload': platform})
  }

  
  const getAccountSummary = async () => {
    let params = {
      "offset": 0,
      "limit": 99,
      "status": 'active',
      // "statusActive": 'active',
    }
    let response = await fetch('/api/Account?act=account-summary', {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params), 
    })

    const data = await response?.json()
    // console.log(data, 'datss')
    const { code, content } = data

    if(code === 0 && content) {
      setAccountSummary(content)
      // setAccountCount(content.count)

    }


  }


  useEffect(() => {
    if(!state.platformFilter) {
      getAccountSummary()
    }
    // getAccount()
    getAccountList()
  }, [state.platformFilter])

  return (
    <>
      <main>
        <section className='bg-white rounded rounded-lg m-4 shadow-xl'>
          <div className='p-10 flex gap-2'>
            <Users size={50} className='' />
            <div className='mx-3 px-3 flex-none w-64'>
              <h3 className='font-normal text-2xl'>Total Account</h3>
              {
                accountSummary.total ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.total}</h3>
                :
                (
                  !accountSummary ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              <h3 className='font-normal text-2xl'>Facebook</h3>
              {/* <Image src='/public/socmed/facebook.png' width="30" height="30" alt='facebook' className='ml-2 text-center justify-center align-center' /> */}
              {
                accountSummary.facebook ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.facebook}</h3>
                :
                (
                  !accountSummary ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              <h3 className='font-normal text-2xl'>Twitter</h3>
              {
                accountSummary.twitter ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.twitter}</h3>
                :
                (
                  !accountSummary ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              <h3 className='font-normal text-2xl'>Instagram</h3>
              {
                accountSummary.tiktok ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.instagram}</h3>
                :
                (
                  !accountSummary ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              <h3 className='font-normal text-2xl'>Tiktok</h3>
              {
                accountSummary.tiktok ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.tiktok}</h3>
                :
                (
                  !accountSummary ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              <h3 className='font-normal text-2xl'>Kompas</h3>
              {
                accountSummary.kompas ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.kompas}</h3>
                :
                (
                  !accountSummary ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              <h3 className='font-normal text-2xl'>Detik</h3>
              {
                accountSummary.detik ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.detik}</h3>
                :
                (
                  !accountSummary ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
          </div>
        </section>
        <section className='flex w-full justify-center'>
         <div className='grow w-5 rounded-sm py-3 m-5 text-primary items-center shadow-xl bg-white'>
          <div>
          <h1 className='text-2xl font-semibold my-1 mx-3'>Account List</h1>
          {/* selected menu */}
          <div className='flex flex-wrap gap-2 mx-3'>
            <Select onValueChange={changedPlatform}>
                <SelectTrigger className="w-auto mt-4">
                  <SelectValue/>
                </SelectTrigger>
                  <SelectContent>
                    <SelectItem>All platform</SelectItem> 
                    <SelectItem value='facebook' key='facebook'>Facebook</SelectItem>
                    <SelectItem value='instagram' key='instagram'>Instagram</SelectItem>
                    <SelectItem value='twitter' key='twitter'>Twitter</SelectItem>
                    <SelectItem value='tiktok' key='tiktok'>Tiktok</SelectItem>
                    <SelectItem value='kompas' key='kompas'>Kompas</SelectItem>
                    <SelectItem value='detik' key='detik'>Detik</SelectItem>
                </SelectContent>
            </Select>
            </div>
          </div>
          {/* Total Account */}
          <div>
            {
              state.totalAccount ?
              <>
                {
                  state.totalAccount === 1 ?
                    <p className='text-md font-normal mt-3 mx-3'>Total: {state.totalAccount} account</p>
                    :   
                    <p className='text-md font-normal mt-3 mx-3'>Total: {state.totalAccount} accounts</p>    
                }
              </>
              :
              <p className='text-md font-normal mt-3 mx-3'>Total: 0 account</p>
            }
          </div>
          {/* Table Account */}
          <div className='rounded-md border mx-4 my-5'>
            <Table className="bg-secondary rounded-sm">
              <TableHeader className="text-center items-center bg-primary">
                <TableRow>
                  <TableHead className="text-secondary">Name</TableHead>
                  {/* <TableHead className="text-primary">User ID</TableHead> */}
                  <TableHead className="text-secondary">Device ID</TableHead>
                  {/* <TableHead className="text-secondary">Username</TableHead> */}
                  <TableHead className="text-secondary">Status</TableHead>
                  <TableHead className="text-secondary">Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  state.accountList ?
                   state.accountList.map((value, index) => {
                    console.log(value, 'vass')
                    // const nameWithProfilePicture = <div className='flex gap-1'><Image src={value.profilePicture} width={10} height={10} alt={value.name} />{value.name}</div>
                    return (
                      <TableRow className="hover:bg-white" key={index}>
                        {/* <TableCell>{nameWithProfilePicture}</TableCell> */}
                        <TableCell>{value.name}</TableCell>
                        {/* <TableCell>{value.userId ? value.userId : "-"}</TableCell> */}
                        <TableCell>{value.deviceId ? value.deviceId : " "}</TableCell>
                        {/* <TableCell>{value.username ? value.username : " "}</TableCell> */}
                        <TableCell>{value.status ? value.status : " "}</TableCell>
                        <TableCell>{value.lastActivity? moment.utc(value.lastActivity).format('YYYY-MM-DD HH:mm') : "-"}</TableCell>
                      </TableRow>
                    )
                  })
                  :
                  <>
                  <TableRow>Data is not found
                     {/* <div className='flex justify-center'>Data is not found</div> */}
                  </TableRow>
                  </>
                  // state.accountList.map((value, index) => {
                  //   console.log(value, 'vass')
                  //   // const nameWithProfilePicture = <div className='flex gap-1'><Image src={value.profilePicture} width={10} height={10} alt={value.name} />{value.name}</div>
                  //   return (
                  //     <TableRow className="hover:bg-danger" key={index}>
                  //       {/* <TableCell>{nameWithProfilePicture}</TableCell> */}
                  //       <TableCell>{value.name}</TableCell>
                  //     </TableRow>
                  //   )
                  // })
                }
              </TableBody>
            </Table>
          </div>
          <div className='flex justify-end mt-3'>
          {/* <Pagination length={state.totalAccount} limit={state.limit} page={state.currentPage} callback={(pageNumber) => getAccountList(pageNumber, (sortKeyValue ? sortKeyValue : 'dateCreate'), valueSort)} /> */}
          <Pagination length={state.totalAccount} limit={state.limit} page={state.currentPage} callback={getAccountList} />
        </div>
        </div>
         <div className='grow w-5 rounded-sm py-3 m-5 text-primary items-center shadow-xl bg-white'>
          <h1 className='text-2xl font-semibold my-5 mx-3'>Running Task</h1>
        </div>
        </section>
      </main>
    </>
  )
}
