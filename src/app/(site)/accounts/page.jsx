'use client'

import React, {useState, useEffect, useReducer} from 'react'
import Image from 'next/image'

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

import Pagination from '@/components/utilities/Pagination'

import { ArrowUp, ArrowDown, ArrowUpDown} from 'lucide-react'

import moment from 'moment'

import { useSession } from 'next-auth/react'

import Loading from '@/components/utilities/Loading'


import AccountSummary from '@/components/accountPage/AccountSummary'
import SelectPlatform from '@/components/accountPage/SelectPlatform'
import SelectStatus from '@/components/accountPage/SelectStatus'
import TotalAccount from '@/components/accountPage/TotalAccount'


const actionType = {
  account: 'getAccount',
  accountList: 'getAccountList',
  accountListCluster: 'getAccountListCluster',
  totalAccount: 'totalAccount',
  updatePage: 'updatePage',
  changePlatform: 'changePlatform',
  selectedPlatform: 'selectedPlatform',
  changeStatus: 'changeStatus',
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
    case actionType.changeStatus:
      return {...state, statusFilter: payload}
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
  statusFilter: null,
  search: '',
  platformId: null,
  sort: {
    name: 1
  },
}

export default function AccountsPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [done, setDone] = useState(false)

  const {data: session, status} = useSession()

  const [sortOrderAccount, setSortOrderAccount] = useState('asc')
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

    // let response = await fetch('/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '')  + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: '')) )

    let response
    let url = '/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '')  + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: ''))
   
    // console.log(state.statusFilter, 'ssss')

    switch(state.statusFilter){
      case 'active':
        response = await fetch(url + '&status=active&statusActive=active')
        break;
      case 'not_available':
        response = await fetch(url + '&status=not_available')
        break;
      case 'backup':
        response = await fetch(url + '&status=active&statusActive=backup')
        break;
      case 'inactive':
        response = await fetch(url + '&status=inactive')
        break;
      default:
        response = await fetch(url)
        break;
    }
    
    const data = await response.json()
    setDone(true)
    const { code, content } = data

    // console.log(content, 'contentt')

    dispatch({'type': actionType.account, 'payload': content.results})
    dispatch({'type': actionType.totalAccount, payload: content.count})
    dispatch({'type': actionType.updatePage, payload: page})

    // getMediaPhotoProfile(content.results)

    if(code === 0 && content.count) return content.results

  }

  const changedPlatform = (platform) => {
    // console.log(platform, 'accountPlatform')
    state.currentPage = 1
    dispatch({'type': actionType.changePlatform, 'payload': platform})
    dispatch({'type': actionType.updatePage, payload: state.currentPage})
  }

  const changedStatus = (status) => {
    // console.log(status, 'status')
    state.currentPage = 1
    dispatch({'type': actionType.changeStatus, 'payload': status})
    dispatch({'type': actionType.updatePage, payload: state.currentPage})
    
  }

  useEffect(() => {
    getAccount()
  }, [state.platformFilter, state.statusFilter])

  return (
    <>
      <main>
      {
        status === 'authenticated' ?
        <>
        <section className='bg-white rounded rounded-lg m-4 shadow-xl'>
          <AccountSummary />
        </section>
        <section className='flex w-full justify-center'>
            <div className='grow w-5 rounded-sm py-3 m-5 text-primary items-center shadow-xl bg-white'>
              <div>
                <h1 className='text-2xl font-semibold my-1 mx-3'>Account List</h1>
                {/* selected menu */}
                <div className='flex gap-1'>
                  <SelectPlatform onChangePlatform={changedPlatform} />
                  <SelectStatus onChangeStatus={changedStatus} />
                </div>
              </div>
              {/* Total Account and Search Components */}
              <div className='flex justify-between'>
                <TotalAccount countAccount={state.totalAccount} />
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
                      done ?
                      <>
                        {
                          state.account.length ?
                          <>
                          <div className='rounded-md border mx-4 my-5'>
                            <Table className="bg-secondary rounded-sm">
                              <TableHeader className="text-center items-center bg-primary">
                                <TableRow>
                                  <TableHead className="text-secondary"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorterAccount('name')}>Name {sortKeyValueAccount === 'name' ? sortOrderAccount === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                                  <TableHead className="text-secondary"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorterAccount('id')}>User ID {sortKeyValueAccount === 'id' ? sortOrderAccount === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                                  <TableHead className="text-secondary"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorterAccount('deviceId')}>Device ID {sortKeyValueAccount === 'deviceId' ? sortOrderAccount === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                                  <TableHead className="text-secondary"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorterAccount('statusActive')}>Status {sortKeyValueAccount === 'statusActive' ? sortOrderAccount === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                                  <TableHead className="text-secondary">Platform</TableHead>
                                  <TableHead className="text-secondary"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorterAccount('lastActivity')}>Last Activity {sortKeyValueAccount === 'lastActivity' ? sortOrderAccount === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {
                                  state.account.map((value, index) => {
                                    // const src = `/api/Media/photoProfile/${value.profilePicture}`;
                                    // const myLoader=({src})=>{
                                    //   // console.log(src, 'ww')
                                    //   // return `http://2.250.10.1:21215/api/Media/getProfilePicture/${value.profilePicture}`;
                                    //   return `/api/media/profilePicture/${value.profilePicture}`;
                                    // }

                                    // const nameWithProfilePicture = <div className='relative' style={{'height' : '40px', 'width' : '40px'}}><Image loader={myLoader} src={`http://192.168.1.101:21215/api/Media/getProfilePicture/${value.profilePicture}`} layout='fill' objectFit='cover' className="rounded-full" /></div>
                                    const nameWithProfilePicture = <div className='relative' style={{'height' : '40px', 'width' : '40px'}}><Image src={`/api/media/profilePicture/${value.profilePicture}`} layout='fill' objectFit='cover' className="rounded-full" /></div>
                                    
                                    // console.log(value.status)
                                    // console.log(value.statusActive)
                                    
                                    let valueActive = ''
                                    // let valueStatusActive = ''
                                    if(value.status === ' active' || value.statusActive === 'active') {
                                      valueActive = <Badge variant="success">Active</Badge>
                                    } else if (value.status === 'active' && value.statusActive === 'backup') {
                                      valueActive = <Badge variant="outline">Backup</Badge>
                                    } else if (value.status === 'inactive') {
                                      valueActive = <Badge variant="warning">Inactive</Badge>
                                    } else if (value.status === 'not_available') {
                                      valueActive = <Badge variant="danger">Banned</Badge>
                                    } else {
                                      valueActive = <Badge>No Status</Badge>
                                    }
          
                                    return (
                                      <>
                                        <TableRow className="hover:bg-white" key={index}>
                                          <TableCell><div className='flex gap-2'>{nameWithProfilePicture}<span className="mt-2">{value.name}</span></div></TableCell>
                                          <TableCell>{value.id ? value.id : " "}</TableCell>
                                          <TableCell>{value.deviceId ? value.deviceId : " "}</TableCell>
                                          <TableCell>{valueActive ? <div className='mx-3'>{valueActive}</div> : " "}</TableCell>
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
                        <div className='flex justify-center mx-3'>Data is not available</div>
                        </>
                        }
                      </>
                      :
                      <div className='flex justify-center mx-3'><Loading /></div> 
                    }
            </div>
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
