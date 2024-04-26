'use client'

import React, {useState, useEffect, useReducer} from 'react'
import Image from 'next/image'

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

import Pagination from '@/components/utilities/Pagination'

import { Users, ArrowUp, ArrowDown, ArrowUpDown} from 'lucide-react'

import moment from 'moment'

import { useSession } from 'next-auth/react'

import Loading from '@/components/utilities/Loading'


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
  const [accountSummary, setAccountSummary] = useState({})
  const [accountSummaryDetailed, setAccountSummaryDetailed] = useState({})
  const [done, setDone] = useState(false)

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

    // let response = await fetch('/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '')  + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: '')) )
    
    // if(state.statusFilter === 'active') {
    //   let response = await fetch('/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '')  + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: '')) + '&status=active&statusActive=active')
    // } else if (state.statusFilter === 'not_available') {
    //   console.log('banned')
    // } else if (state.statusFilter === 'backup') {
    //   console.log('backup')
    // } 
    // else {
    //   console.log('woww')
    // }

    let response
    // console.log(state.statusFilter, 'ssss')

    switch(state.statusFilter){
      case 'active':
        response = await fetch('/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '')  + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: '')) + '&status=active&statusActive=active')
        break;
      case 'not_available':
        response = await fetch('/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '')  + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: '')) + '&status=not_available')
        break;
      case 'backup':
        response = await fetch('/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '')  + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: '')) + '&status=active&statusActive=backup')
        break;
      case 'inactive':
        response = await fetch('/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '')  + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: '')) + '&status=inactive')
        break;
      default:
        response = await fetch('/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '')  + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: '')) )
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

  const getAccountList = async (page) => {
    if(state.platform) return false
    // console.log(state.platform, 'sss')

    // console.log(page, 'pagee')
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

  const changedStatus = (status) => {
    // console.log(status, 'status')
    state.currentPage = 1
    dispatch({'type': actionType.changeStatus, 'payload': status})
    dispatch({'type': actionType.updatePage, payload: state.currentPage})
    
  }

  
  const getAccountSummary = async () => {
    let params = {
      "offset": 0,
      "limit": 25,
      // "status": 'active',
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

  const getAccountSummaryDetailed = async () => {
    let params = {}

    let response = await fetch('/api/Account?act=account-summary-detailed', {
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
    // console.log(code, content)
    if(code === 0) setAccountSummaryDetailed(content)

  }


  useEffect(() => {
    if(!state.platformFilter) {
      // getAccountSummary()
      getAccountSummaryDetailed()
    }
    getAccount()
    // getAccountList()
  }, [state.platformFilter, state.statusFilter])

  return (
    <>
      <main>
      {
        status === 'authenticated' ?
        <>
        <section className='bg-white rounded rounded-lg m-4 shadow-xl'>
          <div className='p-6 grid grid-cols-8 gap-4'>
            <div className='col-span-2 grid grid-cols-3' name="totalAccount">
              <div className='col-span-1 py-14 px-5'>
                <Users size={80} className='' />
              </div>
              <div className='col-span-2'>
                <div className='grid grid-cols-2 grid-rows-2 py-4'>
                  <div className='text-center col-span-2'>
                    <Badge variant="">Total Account</Badge>
                    {
                      typeof accountSummaryDetailed?.total === 'number' ?
                      <><h5 className='font-bold text-2xl'>{accountSummaryDetailed.total > 0 ? accountSummaryDetailed.total : 0}</h5> </>
                      :
                      <div className='px-28 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="success">Active</Badge>
                    {
                      typeof accountSummaryDetailed.total_active ?
                      <><h5 className='font-bold text-2xl'>{accountSummaryDetailed.total_active > 0 ? accountSummaryDetailed.total_active : 0}</h5></>
                      :
                      <div className='px-14'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="secondary">Backup</Badge>
                    {
                      typeof accountSummaryDetailed.total_inactive ?
                      <><h5 className='font-bold text-2xl'>{accountSummaryDetailed.total_backup > 0 ? accountSummaryDetailed.total_backup : 0}</h5></>
                      :
                      <div className='px-14'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="warning">Inactive</Badge>
                    {
                      typeof accountSummaryDetailed.total_banned ?
                      <><h5 className='font-bold text-2xl'>{accountSummaryDetailed.total_inactive > 0 ? accountSummaryDetailed.total_inactive : 0}</h5></>
                      :
                      <div className='px-14'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="danger">Banned</Badge>
                    {
                      typeof accountSummaryDetailed.total_backup ?
                      <><h5 className='font-bold text-2xl'>{accountSummaryDetailed.total_banned > 0 ? accountSummaryDetailed.total_banned : 0}</h5></>
                      :
                      <div className='px-14'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='p-2' name="facebook">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16'><Image src="/socmed/facebook.png" width="50" height="50" alt='facebook' className='flex justify-self-center rounded-full' /></div>
                <div className='col-span-2 text-center'>
                  <Badge>Total Account</Badge>
                  {
                    typeof accountSummaryDetailed?.facebook?.total === 'number' ?
                    <><h5 className='font-bold text-xl'>{accountSummaryDetailed.facebook.total > 0 ? accountSummaryDetailed.facebook.total : 0}</h5> </>
                    :
                    <div className='px-20 mt-1 text-center'><div className='loader-super-mini'></div></div>
                  }
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant="success">Active</Badge>
                    {
                      typeof accountSummaryDetailed?.facebook?.active === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.facebook.active > 0 ? accountSummaryDetailed.facebook.active : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="secondary">Backup</Badge>
                    {
                      typeof accountSummaryDetailed?.facebook?.backup === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.facebook.backup > 0 ? accountSummaryDetailed.facebook.backup : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant={'warning'}>Inactive</Badge>
                    {
                      typeof accountSummaryDetailed?.facebook?.inactive === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.facebook.inactive > 0 ? accountSummaryDetailed.facebook.inactive : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="danger">Banned</Badge>
                    {
                      typeof accountSummaryDetailed?.facebook?.banned === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.facebook.banned > 0 ? accountSummaryDetailed.facebook.banned : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='p-2' name="twitter">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16'><Image src="/socmed/twitter.png" width="50" height="50" alt='twitter' className='flex justify-self-center rounded-full' /></div>
                <div className='col-span-2 text-center'>
                  <Badge>Total Account</Badge>
                  {
                    typeof accountSummaryDetailed?.twitter?.total === 'number' ?
                    <><h5 className='font-bold text-xl'>{accountSummaryDetailed.twitter.total > 0 ? accountSummaryDetailed.twitter.total : 0}</h5> </>
                    :
                    <div className='px-20 mt-1 text-center'><div className='loader-super-mini'></div></div>
                  }
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant="success">Active</Badge>
                    {
                      typeof accountSummaryDetailed?.twitter?.active === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.twitter.active > 0 ? accountSummaryDetailed.twitter.active : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="secondary">Backup</Badge>
                    {
                      typeof accountSummaryDetailed?.twitter?.backup === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.twitter.backup > 0 ? accountSummaryDetailed.twitter.backup : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant={'warning'}>Inactive</Badge>
                    {
                      typeof accountSummaryDetailed?.twitter?.inactive === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.twitter.inactive > 0 ? accountSummaryDetailed.twitter.inactive : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="danger">Banned</Badge>
                    {
                      typeof accountSummaryDetailed?.twitter?.banned === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.twitter.banned > 0 ? accountSummaryDetailed.twitter.banned : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='p-2' name="instagram">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16'><Image src="/socmed/instagram.png" width="50" height="50" alt='instagram' className='flex justify-self-center rounded-full' /></div>
                <div className='col-span-2 text-center'>
                  <Badge>Total Account</Badge>
                  {
                    typeof accountSummaryDetailed?.instagram?.total === 'number' ?
                    <><h5 className='font-bold text-xl'>{accountSummaryDetailed.instagram.total > 0 ? accountSummaryDetailed.instagram.total : 0}</h5> </>
                    :
                    <div className='px-20 mt-1 text-center'><div className='loader-super-mini'></div></div>
                  }
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant="success">Active</Badge>
                    {
                      typeof accountSummaryDetailed?.instagram?.active === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.instagram.active > 0 ? accountSummaryDetailed.instagram.active : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="secondary">Backup</Badge>
                    {
                      typeof accountSummaryDetailed?.instagram?.backup === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.instagram.backup > 0 ? accountSummaryDetailed.instagram.backup : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant={'warning'}>Inactive</Badge>
                    {
                      typeof accountSummaryDetailed?.instagram?.inactive === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.instagram.inactive > 0 ? accountSummaryDetailed.instagram.inactive : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="danger">Banned</Badge>
                    {
                      typeof accountSummaryDetailed?.instagram?.banned === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.instagram.banned > 0 ? accountSummaryDetailed.instagram.banned : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='p-2' name="tiktok">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16'><Image src="/socmed/tiktok.png" width="50" height="50" alt='tiktok' className='flex justify-self-center rounded-full' /></div>
                <div className='col-span-2 text-center'>
                  <Badge>Total Account</Badge>
                  {
                    typeof accountSummaryDetailed?.tiktok?.total === 'number' ?
                    <><h5 className='font-bold text-xl'>{accountSummaryDetailed.tiktok.total > 0 ? accountSummaryDetailed.tiktok.total : 0}</h5> </>
                    :
                    <div className='px-20 mt-1 text-center'><div className='loader-super-mini'></div></div>
                  }
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant="success">Active</Badge>
                    {
                      typeof accountSummaryDetailed?.tiktok?.active === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.tiktok.active > 0 ? accountSummaryDetailed.tiktok.active : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="secondary">Backup</Badge>
                    {
                      typeof accountSummaryDetailed?.tiktok?.backup === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.tiktok.backup > 0 ? accountSummaryDetailed.tiktok.backup : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant={'warning'}>Inactive</Badge>
                    {
                      typeof accountSummaryDetailed?.tiktok?.inactive === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.tiktok.inactive > 0 ? accountSummaryDetailed.tiktok.inactive : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="danger">Banned</Badge>
                    {
                      typeof accountSummaryDetailed?.tiktok?.banned === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.tiktok.banned > 0 ? accountSummaryDetailed.tiktok.banned : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='p-2' name="detik">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16'><Image src="/socmed/detik.png" width="50" height="50" alt='detik' className='flex justify-self-center rounded-full' /></div>
                <div className='col-span-2 text-center'>
                  <Badge>Total Account</Badge>
                  {
                    typeof accountSummaryDetailed?.detik?.total === 'number' ?
                    <><h5 className='font-bold text-xl'>{accountSummaryDetailed.detik.total > 0 ? accountSummaryDetailed.detik.total : 0}</h5> </>
                    :
                    <div className='px-20 mt-1 text-center'><div className='loader-super-mini'></div></div>
                  }
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant="success">Active</Badge>
                    {
                      typeof accountSummaryDetailed?.detik?.active === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.detik.active > 0 ? accountSummaryDetailed.detik.active : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="secondary">Backup</Badge>
                    {
                      typeof accountSummaryDetailed?.detik?.backup === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.detik.backup > 0 ? accountSummaryDetailed.detik.backup : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant={'warning'}>Inactive</Badge>
                    {
                      typeof accountSummaryDetailed?.detik?.inactive === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.detik.inactive > 0 ? accountSummaryDetailed.detik.inactive : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="danger">Banned</Badge>
                    {
                      typeof accountSummaryDetailed?.detik?.banned === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.detik.banned > 0 ? accountSummaryDetailed.detik.banned : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='p-2' name="kompas">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16'><Image src="/socmed/kompas.png" width="50" height="50" alt='kompas' className='flex justify-self-center rounded-full' /></div>
                <div className='col-span-2 text-center'>
                  <Badge>Total Account</Badge>
                  {
                    typeof accountSummaryDetailed?.kompas?.total === 'number' ?
                    <><h5 className='font-bold text-xl'>{accountSummaryDetailed.kompas.total > 0 ? accountSummaryDetailed.kompas.total : 0}</h5> </>
                    :
                    <div className='px-20 mt-1 text-center'><div className='loader-super-mini'></div></div>
                  }
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant="success">Active</Badge>
                    {
                      typeof accountSummaryDetailed?.kompas?.active === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.kompas.active > 0 ? accountSummaryDetailed.kompas.active : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="secondary">Backup</Badge>
                    {
                      typeof accountSummaryDetailed?.kompas?.backup === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.kompas.backup > 0 ? accountSummaryDetailed.kompas.backup : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
                <div className='col-span-2 grid grid-cols-2'>
                  <div className='text-center'>
                    <Badge variant={'warning'}>Inactive</Badge>
                    {
                      typeof accountSummaryDetailed?.kompas?.inactive === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.kompas.inactive > 0 ? accountSummaryDetailed.kompas.inactive : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                  <div className='text-center'>
                    <Badge variant="danger">Banned</Badge>
                    {
                      typeof accountSummaryDetailed?.kompas?.banned === 'number' ?
                      <><h5 className='font-bold text-xl'>{accountSummaryDetailed.kompas.banned > 0 ? accountSummaryDetailed.kompas.banned : 0}</h5> </>
                      :
                      <div className='px-10 mt-1 text-center'><div className='loader-super-mini'></div></div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='flex w-full justify-center'>
            <div className='grow w-5 rounded-sm py-3 m-5 text-primary items-center shadow-xl bg-white'>
              <div>
              <h1 className='text-2xl font-semibold my-1 mx-3'>Account List</h1>
              {/* selected menu */}
              {/* Platform */}
              <div className='flex gap-1'>
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
                <div>
                    {/* Status */}
                    <Select onValueChange={changedStatus}>
                      <SelectTrigger className="w-auto mt-4">
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem>All Status</SelectItem> 
                        <SelectItem value='active' key='active'>Active</SelectItem>
                        <SelectItem value='backup' key='backup'>Backup</SelectItem>
                        <SelectItem value='inactive' key='inactive'>Inactive</SelectItem>
                        <SelectItem value='not_available' key='not_available'>Banned</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
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
                                <TableHead className="text-secondary"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorterAccount('statusActive')}>Status {sortKeyValueAccount === 'statusActive' ? sortOrderAccount === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                                <TableHead className="text-secondary">Platform</TableHead>
                                <TableHead className="text-secondary"><Button className="flex justify-center bg-primary items-center gap-1 hover:text-success" onClick={() => handleSorterAccount('lastActivity')}>Last Activity {sortKeyValueAccount === 'lastActivity' ? sortOrderAccount === 'asc' ? <ArrowUp size={17} /> : <ArrowDown size={17} /> : <ArrowUpDown size={17} className='opacity-50' />}</Button></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {
                                state.account.map((value, index) => {
                                  // console.log(value, 'vass')

                                  const nameWithProfilePicture = <div className='relative' style={{'height' : '20px', 'width' : '20px'}}><Image src={`/api/Media/photoProfile/${value.profilePicture}`} layout='fill' objectFit='cover' /></div>
                                  // console.log(value.statusActive)
                                  let valueActive = ''
                                  // let valueStatusActive = ''
                                  switch(value.status){
                                    case 'active':
                                        // valueActive = <Badge variant="success">Active</Badge>
                                        switch(valueActive.statusActive){
                                          case 'active':
                                            valueActive = <Badge variant="success">Active</Badge>
                                            break;
                                          case 'backup':
                                            valueActive = <Badge variant="success">Active</Badge>
                                            break;
                                        }
                                        break;
                                    // case 'backup':
                                    //     valueActive = <Badge variant="secondary">Backup</Badge>
                                    //     break;
                                    case 'inactive':
                                        valueActive = <Badge variant="warning">Inactive</Badge>
                                        break;
                                    case 'not_available':
                                        valueActive = <Badge variant="danger">Banned</Badge>
                                        break;
                                    default:
                                      valueActive = <Badge>No Status</Badge>
                                      break;
                                  }
        
                                  return (
                                    <>
                                      {
        
                                      }
                                      <TableRow className="hover:bg-white" key={index}>
                                        {/* <TableCell>{nameWithProfilePicture}</TableCell> */}
                                        <TableCell><div className='flex gap-2'>{nameWithProfilePicture}{value.name}</div></TableCell>
                                        {/* <TableCell>{value.userId ? value.userId : "-"}</TableCell> */}
                                        <TableCell>{value.id ? value.id : " "}</TableCell>
                                        {/* <TableCell>{value.username ? value.username : " "}</TableCell> */}
                                        {/* <TableCell>{value.statusActive ? value.statusActive : " "}</TableCell> */}
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
            {/* <div className='flex justify-center mx-3'><Loading /></div> */}
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
