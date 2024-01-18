import { useEffect, useRef, useState } from 'react'

const FIRST_PAGE = 1
const PAGE_AMOUNT = 10

interface Range {
  start: number
  end: number
}

const usePagination = (
  { totalCount }: { totalCount: number },
  apiDependencies: any[],
) => {
  const current = useRef<number>(FIRST_PAGE)

  const setCurrent = (page: number) => (current.current = page)

  const [range, setRange] = useState<Range>({
    start: FIRST_PAGE,
    end: FIRST_PAGE,
  })

  const isStart = () => range.start > PAGE_AMOUNT

  const isNext = () => totalCount > range.end

  const [currentPages, setCurrentPages] = useState<number[]>([])

  const goNext = () => {
    setRange((prev) => {
      return {
        ...prev,
        start: prev.end + 1,
        end:
          prev.end + PAGE_AMOUNT > totalCount
            ? totalCount
            : prev.end + PAGE_AMOUNT,
      }
    })
  }

  const goPrev = () => {
    setRange((prev) => {
      return {
        ...prev,
        start: prev.start > PAGE_AMOUNT ? prev.start - PAGE_AMOUNT : FIRST_PAGE,
        end: prev.start - 1,
      }
    })
  }

  useEffect(() => {
    setRange({
      start: FIRST_PAGE,
      end: totalCount > PAGE_AMOUNT ? PAGE_AMOUNT : totalCount,
    })
  }, [...apiDependencies])

  useEffect(() => {
    setCurrentPages(
      Array.from({ length: range.end - range.start + 1 }).map(
        (page, index) => (page = range.start + index),
      ),
    )
  }, [range])

  return {
    current,
    isStart,
    isNext,
    goNext,
    goPrev,
    setCurrent,
    currentPages,
  }
}

export default usePagination
