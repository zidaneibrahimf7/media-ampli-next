'use client'

import React, {useState, useEffect, useReducer} from 'react'
import Image from 'next/image'

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'

import Pagination from '@/components/utilities/Pagination'

import { Users, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

import moment from 'moment'

import { useSession } from 'next-auth/react'

import getMediaPhotoProfile from '@/helpers/getMediaPhotoProfile'
import Loading from '@/components/utilities/Loading'


const actionType = {
  account: 'getAccount',
  accountList: 'getAccountList',
  accountListCluster: 'getAccountListCluster',
  totalAccount: 'totalAccount',
  updatePage: 'updatePage',
  changePlatform: 'changePlatform',
  selectedPlatform: 'selectedPlatform',
  sort: 'sort',
  search: 'search',
}

function reducer(state, action) {
  const { type, payload } = action
  // console.log(type, payload, state)

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
    case actionType.search:
        return {...state, search: payload}
    default:
        return state;
  }
}

const initialState = {
  account: [],
  accountList: [],
  limit: 15,
  currentPage: 1,
  totalAccount: 0,
  platformFilter: null,
  search: '',
  platformId: null,
  sort: {
    name: 1
  },
}

export default function AccountsPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [accountSummary, setAccountSummary] = useState({})

  const {data: session, status} = useSession()

  // const [countAccount, setAccountCount] = useState(0)


  const [sortOrderAccount, setSortOrderAccount] = useState('asc')
  const [sortedAccount, setSortedAccount] = useState([])
  const [sortKeyValueAccount, setSortKeyValueAccount] = useState('')
  const [valueSortAccount, setValueSortAccount] = useState(1)

  const handleSorterAccount = async (sortKey) => {
    const newSortOrderAccount = sortOrderAccount === 'asc' ? 'desc' : 'asc'
    setSortOrderAccount(newSortOrderAccount)

    setSortKeyValueAccount(sortKey)

    const sortValue = newSortOrderAccount === 'asc' ? 1 : -1
    setValueSortAccount(sortValue)

    dispatch({'type': actionType.sort, payload: {sortKey}})

    await getAccount(state.currentPage, sortKey, sortValue)
    
  }

  const getAccount = async (page, sortKey, sortValue) => {
    // if(state.platformId)

    if(!page) page = state.currentPage
    let offset = (page === 1) ? 0 : ((page - 1) * state.limit)

    let response = await fetch('/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '') + '&status=active' + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: '')) )
    const data = await response.json()

    const { code, content } = data

    // console.log(content, 'contentt')

    dispatch({'type': actionType.account, 'payload': content.results})
    dispatch({'type': actionType.totalAccount, payload: content.count})
    dispatch({'type': actionType.updatePage, payload: page})

    // getMediaPhotoProfile(content.results)

    if(code === 0 && content.count) return content.results

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
    // console.log(platform, 'accountPlatform')
    state.currentPage = 1
    dispatch({'type': actionType.changePlatform, 'payload': platform})
    dispatch({'type': actionType.updatePage, payload: state.currentPage})
  }

  
  const getAccountSummary = async () => {
    let params = {
      "offset": 0,
      "limit": 25,
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
    getAccount()
    // getAccountList()
  }, [state.platformFilter])

  return (
    <>
      <main>
      {
        status === 'authenticated' ?
        <>
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
                  accountSummary && accountSummary.total === 0 ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1 mx-3'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              {/* <h3 className='font-normal text-2xl'>Facebook</h3> */}
              <Image src="/socmed/facebook.png" width="40" height="40" alt='facebook' className='ml-1 text-center justify-center align-center' />
              {
                accountSummary.facebook ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.facebook}</h3>
                :
                (
                  accountSummary && accountSummary.facebook === 0 ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1 mx-3'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              {/* <h3 className='font-normal text-2xl'>Twitter</h3> */}
              <Image src="/socmed/twitter.svg" width="40" height="40" alt='facebook' className='ml-1 text-center justify-center align-center' />
              {
                accountSummary.twitter ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.twitter}</h3>
                :
                (
                  accountSummary && accountSummary.twitter === 0 ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1 mx-3'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              {/* <h3 className='font-normal text-2xl'>Instagram</h3> */}
              <Image src="/socmed/instagram.svg" width="40" height="40" alt='facebook' className='ml-1 text-center justify-center align-center' />
              {
                accountSummary.tiktok ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.instagram}</h3>
                :
                (
                  accountSummary && accountSummary.instagram === 0 ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1 mx-3'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              {/* <h3 className='font-normal text-2xl'>Tiktok</h3> */}
              <Image src="/socmed/tiktok.svg" width="40" height="40" alt='facebook' className='ml-1 text-center justify-center align-center' />
              {
                accountSummary.tiktok ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.tiktok}</h3>
                :
                (
                  accountSummary && accountSummary.tiktok === 0 ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1 mx-3'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              {/* <h3 className='font-normal text-2xl'>Kompas</h3> */}
              <Image src="/socmed/kompas.svg" width="40" height="40" alt='facebook' className='ml-1 text-center justify-center align-center' />
              {
                accountSummary.kompas ? 
                <h3 className='font-semibold text-4xl pt-1 mt-1'>{accountSummary.kompas}</h3>
                :
                (
                  accountSummary && accountSummary.kompas === 0 ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1 mx-3'>0</h3>
                  </>
                  :
                  <>
                  <div className='font-semibold text-4xl pt-1 mt-1 loader-mini'></div>
                  </>
                )
              }
            </div>
            <div className='flex-none w-44'>
              {/* <h3 className='font-normal text-2xl'>Detik</h3> */}
              <Image src="/socmed/detik.svg" width="40" height="45" alt='facebook' className='ml-1 text-center justify-center align-center' />
              {
                accountSummary.detik ? 
                <h3 className='font-semibold text-4xl pt-1 mt-2'>{accountSummary.detik}</h3>
                :
                (
                  accountSummary && accountSummary.detik === 0 ?
                  <>
                   <h3 className='font-semibold text-4xl pt-1 mt-1 mx-3'>0</h3>
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
          <div className='flex justify-between'>
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
            <form className='mx-1'>
              <Input 
                type="text"
                placeholder="search..."
                onChange={((e) => {
                  e.preventDefault()
                  // console.log(e.target.value)
                  dispatch({'type': actionType.search, 'payload': e.target.value})
                  getAccount()
                  if(!e) {
                    getAccount()
                  }
                })}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                      e.preventDefault();
                      // console.log(e.key, e.target.value)
                      dispatch({'type': actionType.search, 'payload': e.target.value})
                      getAccount()
                      // dispatch({'type': actionType.updatePage, payload: state.currentPage})
                  }
                }}
                className="mr-3 border border-primary"
                style={{'width' : '10rem'}}
              />
            </form>
          </div>
          {/* Table Account */}
            {
              state.account && state.account > 0 ?
              <>
            <div className='rounded-md border mx-4 my-5'>
              <Table className="bg-secondary rounded-sm">
                <TableHeader className="text-center items-center bg-primary">
                  <TableRow>
                    <TableHead className="text-secondary"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorterAccount('name')}>Name {sortKeyValueAccount === 'name' ? sortOrderAccount === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                    <TableHead className="text-secondary"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorterAccount('id')}>User ID {sortKeyValueAccount === 'id' ? sortOrderAccount === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                    <TableHead className="text-secondary"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorterAccount('statusActive')}>Status {sortKeyValueAccount === 'statusActive' ? sortOrderAccount === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                    <TableHead className="text-secondary">Platform</TableHead>
                    <TableHead className="text-secondary"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorterAccount('lastActivity')}>Last Activity {sortKeyValueAccount === 'lastActivity' ? sortOrderAccount === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    state.account.map((value, index) => {
                      // console.log(value, 'vass')
                      // const nameWithProfilePicture = <div className='flex gap-1'><img src={`/media-profile/${value?.profilePicture}`} width={20} height={20} alt={value.name} />{value.name}</div>
                      return (
                        <>
                          {

                          }
                          <TableRow className="hover:bg-white" key={index}>
                            {/* <TableCell>{nameWithProfilePicture}</TableCell> */}
                            <TableCell>{value.name}</TableCell>
                            {/* <TableCell>{value.userId ? value.userId : "-"}</TableCell> */}
                            <TableCell>{value.id ? value.id : " "}</TableCell>
                            {/* <TableCell>{value.username ? value.username : " "}</TableCell> */}
                            <TableCell>{value.statusActive ? value.statusActive : " "}</TableCell>
                            <TableCell>{value.platform ? value.platform : " "}</TableCell>
                            <TableCell>{value.lastActivity? moment.utc(value.lastActivity).format('YYYY-MM-DD HH:mm') : "-"}</TableCell>
                          </TableRow>
                        </>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </div>
            <div className='flex justify-end mt-3 mx-4'>
              <Pagination length={state.totalAccount} limit={state.limit} page={state.currentPage} callback={(pageNumber) => getAccount(pageNumber, (sortKeyValueAccount ? sortKeyValueAccount : 'name'), valueSortAccount)} />
            </div>
            </>
              :
            <>
            {
              state.account && state.totalAccount === 0 ?
              <div className='flex justify-center mx-3'>Data is not available</div>
              :
              <>
               <div className='flex justify-center mx-3'><Loading /></div>
              </>
            }
            </>
            }
        </div>
         {/* <div className='grow w-5 rounded-sm py-3 m-5 text-primary items-center shadow-xl bg-white'>
          <div>
            <h1 className='text-2xl font-semibold my-5 mx-3'>Running Task</h1>
            <div className='flex flex-wrap gap-2 mx-3'>
            <Select onValueChange={changedPlatformRunningTask}>
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
          <div>
            {
              state.totalAccountRunningTask > 1 ?
              <p className='text-md font-normal mt-3 mx-3'>Total: {state.totalAccountRunningTask} accounts</p>
              :
              <p className='text-md font-normal mt-3 mx-3'>Total: {state.totalAccountRunningTask} account</p>
            }
          </div>
          <div className='rounded-md border mx-4 my-5'>
            <Table className="bg-secondary rounded-sm">
              <TableHeader className="text-center items-center bg-primary">
                <TableRow>
                    <TableHead className="text-secondary">Task Name</TableHead>
                    <TableHead className="text-secondary">Platform</TableHead>
                    <TableHead className="text-secondary">Project Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  state.runningTask && state.runningTask.length > 0 ?
                  <>
                  <TableRow>
                    <TableCell></TableCell>
                  </TableRow>
                  </>
                  :
                  <TableRow>
                    <TableCell className='text-center'></TableCell> 
                    <TableCell className='text-center'>Data is not available</TableCell> 
                    <TableCell className='text-center'></TableCell> 
                  </TableRow>
                }
              </TableBody>
            </Table>
          </div>
        </div> */}
        </section>
        </>
        :
        <>
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'><span className='loader'></span></div>
       </>
      }
      </main>
    </>
  )
}
