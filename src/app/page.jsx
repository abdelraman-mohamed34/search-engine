'use client'
import Charts from '@/components/Charts'
import EmptyState from '@/components/EmptyState'
import Header from '@/components/Header'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import SearchInput from '@/components/SearchInput'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { FiBox } from 'react-icons/fi'

export default function Home() {
  const [bigData, setBigData] = useState([])
  const [avg, setAvg] = useState([])
  const [scrollTop, setScrollTop] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const searchWorkerRef = useRef(null)

  const count = 1000000
  const containerHeight = 600
  const rowHeight = 85

  useEffect(() => {
    const worker = new Worker(new URL('./workers/Worker.js', import.meta.url))
    worker.postMessage({ count })
    worker.onmessage = (e) => {
      setBigData(e.data.data)
      setAvg(e.data.totalAvg)
      setLoading(false)
    }
    return () => worker.terminate()
  }, [])

  useEffect(() => {
    if (bigData.length > 0) {
      searchWorkerRef.current = new Worker(new URL('./workers/SearchWorker.js', import.meta.url))

      searchWorkerRef.current.postMessage({ type: 'INIT', data: bigData })

      searchWorkerRef.current.onmessage = (e) => {
        setSearchResults(e.data.results)
      }
    }
    return () => searchWorkerRef.current?.terminate()
  }, [bigData])

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchWorkerRef.current && searchTerm.trim() !== "") {
        searchWorkerRef.current.postMessage({ type: 'SEARCH', query: searchTerm })
      }
    }, 200)
    return () => clearTimeout(delay)
  }, [searchTerm])

  const onScroll = (e) => setScrollTop(e.currentTarget.scrollTop)
  const isSearching = searchTerm.trim() !== ""
  const currentData = isSearching ? searchResults : bigData
  const displayCount = currentData.length

  const topIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2)
  const endIndex = Math.min(displayCount - 1, Math.floor((containerHeight + scrollTop) / rowHeight) + 2)

  const visibleItems = useMemo(() => {
    const items = []
    for (let i = topIndex; i <= endIndex; i++) {
      if (currentData[i]) {
        items.push({ ...currentData[i], index: i })
      }
    }
    return items
  }, [topIndex, endIndex, currentData])

  return (
    <div className='p-6 md:p-12 w-full min-h-screen bg-slate-50 text-slate-900'>

      <Header count={count} len={visibleItems.length} />

      <div className='w-full max-w-7xl mx-auto mb-8 min-h-[400px] justify-center items-center hidden'>
        <AnimatePresence mode='wait'>
          {!loading && avg.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <Charts chartData={avg} />
            </motion.div>
          ) : (
            <div className="w-full h-[400px] bg-white rounded-2xl border border-slate-100 flex items-center justify-center shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
                <p className="text-slate-400 font-medium">Generating performance metrics...</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="max-w-7xl mx-auto shadow-sm rounded-xl overflow-hidden">
        <div
          onScroll={onScroll}
          style={{ height: containerHeight }}
          className='w-full bg-white shadow-2xl shadow-slate-200/60 rounded-xl overflow-auto border border-slate-200 hide-scrollbar scroll-smooth'
        >
          <div
            style={{
              height: loading ? containerHeight : displayCount * rowHeight,
              position: 'relative'
            }}
            className='w-full'
          >
            {loading ? (
              <LoadingSkeleton rowHeight={rowHeight} />
            ) : (
              <AnimatePresence mode='popLayout'>
                {visibleItems.length > 0 ? visibleItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{
                      position: 'absolute',
                      top: item.index * rowHeight,
                      height: rowHeight,
                      width: '100%',
                      padding: '8px 16px'
                    }}
                  >
                    <div className='group h-full bg-white border border-slate-100 rounded-xl flex items-center justify-between px-5 hover:border-indigo-300 hover:shadow-md transition-all duration-300 cursor-pointer'>
                      <div className="flex items-center gap-4">
                        <span className='p-3 rounded-lg bg-slate-100 group-hover:bg-indigo-500 transition-colors duration-300'>
                          <FiBox className="text-indigo-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 size-5" />
                        </span>
                        <span className="font-bold text-slate-700 group-hover:text-indigo-900 transition-colors">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <EmptyState searchTerm={searchTerm} />
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}