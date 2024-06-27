import React, {useState, useEffect} from 'react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'


import { Users, ArrowUp, ArrowDown, ArrowUpDown} from 'lucide-react'

export default function AccountSummary() {

    const [accountSummaryDetailed, setAccountSummaryDetailed] = useState({})

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
        getAccountSummaryDetailed()
      }, [])

  return (
   <>
    <div className='p-6 grid grid-cols-8 gap-4 gap-x-7'>
            <div className='col-span-2 grid grid-cols-3 bg-secondary/50 rounded-lg shadow shadow-lg' name="totalAccount">
              <div className='col-span-1 py-14'>
                <Users size={120} className='bg-slate-400 rounded-full p-3' strokeWidth={2} color='white' />
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
                    <Badge variant="outline">Backup</Badge>
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
            <div className='p-2 bg-secondary/50 rounded-lg shadow shadow-lg' name="facebook">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16' style={{width: '100%', height: '100%', position: 'relative'}}><Image src="/socmed/facebook.png" fill sizes='auto' style={{objectFit: 'contain'}} alt='facebook' className='flex justify-self-center rounded-full' /></div>
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
                    <Badge variant="outline">Backup</Badge>
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
            <div className='p-2 bg-secondary/50 rounded-lg shadow shadow-lg' name="twitter">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16'  style={{width: '100%', height: '100%', position: 'relative'}}><Image src="/socmed/twitter.png" fill sizes='auto'  style={{objectFit: "contain"}} alt='twitter' className='flex justify-self-center rounded-full' /></div>
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
                    <Badge variant="outline">Backup</Badge>
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
            <div className='p-2 bg-secondary/50 rounded-lg shadow shadow-lg' name="instagram">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16'  style={{width: '100%', height: '100%', position: 'relative'}}><Image src="/socmed/instagram.png" fill sizes='auto' style={{objectFit: 'contain'}} alt='instagram' className='flex justify-self-center rounded-full' /></div>
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
                    <Badge variant="outline">Backup</Badge>
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
            <div className='p-2 bg-secondary/50 rounded-lg shadow shadow-lg' name="tiktok">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16'  style={{width: '100%', height: '100%', position: 'relative'}}><Image src="/socmed/tiktok.png" fill sizes='auto' style={{objectFit: 'contain'}} alt='tiktok' className='rounded-full' /></div>
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
                    <Badge variant="outline">Backup</Badge>
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
            <div className='p-2 bg-secondary/50 rounded-lg shadow shadow-lg' name="detik">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16'  style={{width: '100%', height: '100%', position: 'relative'}}><Image src="/socmed/detik.png" fill sizes='auto' style={{objectFit: 'contain'}} alt='detik' className='flex justify-self-center rounded-full' /></div>
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
                    <Badge variant="outline">Backup</Badge>
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
            <div className='p-2 bg-secondary/50 rounded-lg shadow shadow-lg' name="kompas">
              <div className='grid grid-rows-4 gap-1'>
                <div className='col-span-2 text-center px-16'  style={{width: '100%', height: '100%', position: 'relative'}}><Image src="/socmed/kompas.png" fill sizes='auto' style={{objectFit: 'contain'}} alt='kompas' className='flex justify-self-center rounded-full' /></div>
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
                    <Badge variant="outline">Backup</Badge>
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
   </>
  )
}