'use client'

import React, {useState, useEffect, useReducer, Fragment} from 'react'
import { Input } from '@/components/ui/input'

import Pagination from '@/components/utilities/Pagination'

import { useSession } from 'next-auth/react'

import Loading from '@/components/utilities/Loading'

import AccountSummary from '@/components/pages/accountPage/AccountSummary'
import SelectPlatform from '@/components/pages/accountPage/SelectPlatform'
import SelectStatus from '@/components/pages/accountPage/SelectStatus'
import TotalAccount from '@/components/pages/accountPage/TotalAccount'
import TableAccountList from '@/components/pages/accountPage/Tables/TableAccountList';
import DataTable from '@/components/custom/DataTable'
import { columnsAccountList } from '@/components/pages/accountPage/Columns/columnsAccountList'
import useSorting from '@/hooks/useSorting'
import usePagination from '@/hooks/usePagination'
import { useQuery } from '@tanstack/react-query'


// const actionType = {
//   // account: 'getAccount',
//   // accountList: 'getAccountList',
//   // accountListCluster: 'getAccountListCluster',
//   // totalAccount: 'totalAccount',
//   // updatePage: 'updatePage',
//   changePlatform: 'changePlatform',
//   selectedPlatform: 'selectedPlatform',
//   changeStatus: 'changeStatus',
//   // sort: 'sort',
//   search: 'search',
// }
// function reducer(state, action) {
//   const { type, payload } = action
//   // console.log(type, payload, state)

//   switch(type) {
//     // case actionType.account:
//     //   return {...state, account: payload}
//     // case actionType.accountList:
//     //   return {...state, accountList: payload}
//     // case actionType.accountListCluster:
//     //   return {...state, accountListCluster: payload}
//     // case actionType.totalAccount:
//     //   return {...state, totalAccount: payload}
//     // case actionType.updatePage:
//     //   return { ...state, currentPage: payload }
//     case actionType.changePlatform: 
//       return {...state, platformFilter: payload}
//     case actionType.selectedPlatform:
//       return {...state, platformId: payload}
//     case actionType.changeStatus:
//       return {...state, statusFilter: payload}
//     // case actionType.sort:
//     //   return {...state, sort: payload}
//     case actionType.search:
//         return {...state, search: payload}
//     default:
//         return state;
//   }
// }


// const initialState = {
//   account: [],
//   accountList: [],
//   limit: 15,
//   currentPage: 1,
//   totalAccount: 0,
//   platformFilter: null,
//   statusFilter: null,
//   search: '',
//   platformId: null,
//   sort: {
//     name: 1
//   },
// }

const actionType = {
  changePlatform: 'changePlatform',
  selectedPlatform: 'selectedPlatform',
  changeStatus: 'changeStatus',
  search: 'search',
}

function reducer(state, action) {
  const { type, payload } = action
  // console.log(type, payload, state)

  switch(type) {
    case actionType.changePlatform: 
      return {...state, platformFilter: payload}
    case actionType.selectedPlatform:
      return {...state, platformId: payload}
    case actionType.changeStatus:
      return {...state, statusFilter: payload}
    case actionType.search:
        return {...state, search: payload}
    default:
        return state;
  }
}

const initialState = {
  platformFilter: null,
  statusFilter: null,
  search: '',
  platformId: null,
}

const rowEachPage = 15

export default function AccountsPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const {data: session, status} = useSession()
  
  // const [done, setDone] = useState(false)
  // const [sortOrderAccount, setSortOrderAccount] = useState('asc')
  // const [sortKeyValueAccount, setSortKeyValueAccount] = useState('')
  // const [valueSortAccount, setValueSortAccount] = useState(1)

  // const handleSorterAccount = async (sortKey) => {
  //   const newSortOrderAccount = sortOrderAccount === 'asc' ? 'desc' : 'asc'
  //   setSortOrderAccount(newSortOrderAccount)

  //   setSortKeyValueAccount(sortKey)

  //   const sortValue = newSortOrderAccount === 'asc' ? 1 : -1
  //   setValueSortAccount(sortValue)

  //   dispatch({'type': actionType.sort, payload: {sortKey}})

  //   await getAccount(state.currentPage, sortKey, sortValue)
    
  // }

  // const getAccount = async (page, sortKey, sortValue) => {
  //   // if(state.platformId)

  //   if(!page) page = state.currentPage
  //   let offset = (page === 1) ? 0 : ((page - 1) * state.limit)

  //   // let response = await fetch('/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '')  + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: '')) )

  //   let response
  //   let url = '/api/Account?act=account&offset=' + (state.search ? 0 : offset) + '&limit=' + state.limit + (state.search? '&search=' + state.search : '')  + ((sortValue ? '&sort=' + sortKey + '&sortValue=' + sortValue : '&sort=name&sortValue=1' )) + ((state.platformFilter ? '&platform=' + state.platformFilter: ''))
   
  //   // console.log(state.statusFilter, 'ssss')

  //   switch(state.statusFilter){
  //     case 'active':
  //       response = await fetch(url + '&status=active&statusActive=active')
  //       break;
  //     case 'not_available':
  //       response = await fetch(url + '&status=not_available')
  //       break;
  //     case 'backup':
  //       response = await fetch(url + '&status=active&statusActive=backup')
  //       break;
  //     case 'inactive':
  //       response = await fetch(url + '&status=inactive')
  //       break;
  //     default:
  //       response = await fetch(url)
  //       break;
  //   }
    
  //   const data = await response.json()
  //   setDone(true)
  //   const { code, content } = data

  //   // console.log(content, 'contentt')

  //   // dispatch({'type': actionType.account, 'payload': content.results})
  //   dispatch({'type': actionType.account, 'payload': data})
  //   dispatch({'type': actionType.totalAccount, payload: content.count})
  //   dispatch({'type': actionType.updatePage, payload: page})

  //   // getMediaPhotoProfile(content.results)

  //   // if(code === 0 && content.count) return content.results
  //   if(code === 0 && content.count) return data

  // }

    // useEffect(() => {
  //   getAccount()
  // }, [state.platformFilter, state.statusFilter])
  // const changedPlatform = (platform) => {
  //   // console.log(platform, 'accountPlatform')
  //   // state.currentPage = 1
  //   dispatch({'type': actionType.changePlatform, 'payload': platform})
  //   // dispatch({'type': actionType.updatePage, payload: state.currentPage})
  // }

  // const changedStatus = (status) => {
  //   // console.log(status, 'status')
  //   // state.currentPage = 1
  //   dispatch({'type': actionType.changeStatus, 'payload': status})
  //   // dispatch({'type': actionType.updatePage, payload: state.currentPage})
  // }

  const { sortKey, sortOrder, onSortingChange, sorting } = useSorting("name")
  const { offset, limit, onPaginationChange, pagination } = usePagination(rowEachPage)

  const {data: datas, isLoading, isError} = useQuery({
    queryKey: ['accountList', sortKey, sortOrder, pagination, state.search, state.statusFilter, state.platformFilter],
    queryFn: async () => {
      const url = `/api/Account?act=account`
      let params = {
        offset, 
        limit, 
        sort: {[sortKey]: sortOrder}
      }


      switch(state.statusFilter){
        case 'active':
            params = {
              ...params, 
              'status': 'active',
              'statusActive': 'active'
            }
            break;
        case 'not_available':
           params = {
              ...params, 
              'status': 'not_available',
            }
          break;
        case 'backup':
           params = {
              ...params, 
              'status': 'active',
              'statusActive': 'backup'
            }
          break;
        case 'inactive':
           params = {
              ...params, 
              'status': 'inactive',
            }
          break;
        default:
           params = {
              ...params, 
            }
          break;
      }

      if(state.search) params = {...params, 'search': state.search}
      if(state.platformFilter) params = {...params, 'platform': state.platformFilter}

      const response = await fetch(url, {
          method: "POST",
          mode: 'cors',
          cache: 'default',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
      })

      const result = await response.json()
      // console.log(result, '::resultQuery::')
      const {code, content} = result

      if(code === 0) return result

    }
  })

  const changedPlatform = (platform) => {
    // console.log(platform, 'accountPlatform')
    // state.currentPage = 1
    dispatch({'type': actionType.changePlatform, 'payload': platform})
    // dispatch({'type': actionType.updatePage, payload: state.currentPage})
  }

  const changedStatus = (status) => {
    // console.log(status, 'status')
    // state.currentPage = 1
    dispatch({'type': actionType.changeStatus, 'payload': status})
    // dispatch({'type': actionType.updatePage, payload: state.currentPage})
  }

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
              <TotalAccount countAccount={datas?.content?.count} isLoading={isLoading} />
              <form className='mx-1'>
                  <Input 
                    type="text"
                    placeholder="search..."
                    onChange={((e) => {
                      e.preventDefault()
                      dispatch({'type': actionType.search, 'payload': e.target.value})
                    })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                          e.preventDefault();
                          dispatch({'type': actionType.search, 'payload': e.target.value})
                      }
                    }}
                    className="mr-3 border border-primary"
                    style={{'width' : '10rem'}}
                  />
              </form>
            </div>
            {/* Table Account */}
            <DataTable 
                data={datas}
                columns={columnsAccountList}
                error={isError}
                sorting={sorting}
                onSortingChange={onSortingChange}
                pagination={pagination}
                onPaginationChange={onPaginationChange}
                rowEachPage={rowEachPage}
                isLoading={isLoading}
                className={'rounded-md mx-4 my-5'}
                classNameTableRow={'hover:bg-secondary'}
              
              />
              {/* {
                      done ?
                      <>
                        {
                          state.account.length ?
                          <>
                          <TableAccountList data={state.account} handleSorting={handleSorterAccount} sortKeyValue={sortKeyValueAccount} sortOrder={sortOrderAccount} />
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
              } */}
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
