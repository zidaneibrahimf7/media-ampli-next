import { DOTS, usePagination } from '@/helpers/usePagination'
import numeral from 'numeral'

export default function Pagination({length, limit, page, callback, siblingCount = 1}) {
  const paginationRange = usePagination({
    "total": length,
    "totalPage" : limit,
    siblingCount,
    "currentPage" : page
  })

  if (page === 0 && paginationRange.length < 2) {
    return null;
  }


  return (
    <nav aria-label='Page Navigation Example'>
      <ul className='flex items-center -space-x-px h-8 text-md'>
        {
          paginationRange && paginationRange.map(pageNumber => {
            if (pageNumber === DOTS || page === pageNumber) {
              return (
                <li key={Math.floor(Math.random() * 10000)}>
                  <a href={'#!'}
                    className='cursor-not-allowed flex items-center justify-center px-3 h-8 leading-tight text-white bg-success border border-gray-300 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white'
                    disabled
                    suppressHydrationWarning={true}
                  >
                    {pageNumber === page ? pageNumber : DOTS}
                  </a>
                </li>
              )
            }
            

            return (
              <li key={Math.floor(Math.random() * 10000)}>
                <a href={'#!'}
                  className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-secondary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  onClick={() => callback(pageNumber)}
                  suppressHydrationWarning={true}
                >{numeral(pageNumber).format('0,0').replaceAll(',', '.')}</a>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}