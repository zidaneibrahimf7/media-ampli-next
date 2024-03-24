import { range } from "./range";

import { useMemo } from "react";

export const DOTS = "..."

export const usePagination = ({ total, totalPage, siblingCount = 1, currentPage }) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(total / totalPage);
    const totalPageNumber = siblingCount + 5


    if (totalPageNumber >= totalPageCount) {
      return range(1, totalPageCount)
    }

    let leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    let rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, lastPageIndex]
    }

  }, [total, totalPage, siblingCount, currentPage])


  return paginationRange
}