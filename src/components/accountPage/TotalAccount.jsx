import React from 'react'

export default function TotalAccount({countAccount}){
  return (
    <>
    {
        countAccount ?
        <>
         {
            countAccount === 1 ?
                <p className='text-md font-normal mt-3 mx-3'>Total: {countAccount} account</p>
                :   
                <p className='text-md font-normal mt-3 mx-3'>Total: {countAccount} accounts</p>    
        }
        </>
        :
        <p className='text-md font-normal mt-3 mx-3'>Total: 0 account</p>
    }
    </>
  )
}
