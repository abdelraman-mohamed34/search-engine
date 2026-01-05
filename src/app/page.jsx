'use client'
import React, { useEffect, useState, useRef, useMemo, useTransition } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import EmptyState from '@/components/EmptyState'
import { FiBox } from 'react-icons/fi'

export default function Home() {
  const [bigData, setBigData] = useState([])
  const [scrollTop, setScrollTop] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isPending, startTransition] = useTransition() // ميزة React 18 للأداء

  const containerRef = useRef(null)
  const searchWorkerRef = useRef(null)

  const count = 1000000
  const containerHeight = 600
  const rowHeight = 85

  // 1. تشغيل الـ Workers بذكاء
  useEffect(() => {
    const initWorkers = () => {
      const mainWorker = new Worker(new URL('./workers/Worker.js', import.meta.url))
      searchWorkerRef.current = new Worker(new URL('./workers/SearchWorker.js', import.meta.url))

      mainWorker.postMessage({ count })

      mainWorker.onmessage = (e) => {
        const { data } = e.data
        // استخدام startTransition لمنع تجميد الواجهة أثناء تحديث المليون سجل
        startTransition(() => {
          setBigData(data)
          setLoading(false)
        })
        // إرسال البيانات فوراً لعامل البحث ليكون جاهزاً
        searchWorkerRef.current.postMessage({ type: 'INIT', data })
      }

      searchWorkerRef.current.onmessage = (e) => {
        setSearchResults(e.data.results)
      }
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(initWorkers)
    } else {
      setTimeout(initWorkers, 300)
    }

    return () => {
      searchWorkerRef.current?.terminate()
    }
  }, [])

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchWorkerRef.current && searchTerm.trim() !== "") {
        searchWorkerRef.current.postMessage({ type: 'SEARCH', query: searchTerm })
      }
    }, 250)
    return () => clearTimeout(delay)
  }, [searchTerm])

  const onScroll = (e) => setScrollTop(e.currentTarget.scrollTop)

  const isSearching = searchTerm.trim() !== ""
  const currentData = isSearching ? searchResults : bigData
  const displayCount = currentData.length

  const visibleItems = useMemo(() => {
    const topIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2)
    const endIndex = Math.min(displayCount - 1, Math.floor((containerHeight + scrollTop) / rowHeight) + 2)
    const items = []
    for (let i = topIndex; i <= endIndex; i++) {
      if (currentData[i]) items.push({ ...currentData[i], index: i })
    }
    return items
  }, [scrollTop, currentData, displayCount])

  return (
    <div className='px-2 sm:px-4 py-6 md:p-12 w-full min-h-screen bg-slate-50 text-slate-900'>
      <Header count={count} len={displayCount} />

      <div className="max-w-7xl mx-auto mb-6">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* منع CLS عبر حجز المساحة مسبقاً */}
      <div className="max-w-7xl mx-auto shadow-xl rounded-2xl overflow-hidden border border-slate-200 bg-white" style={{ minHeight: containerHeight }}>
        <div
          onScroll={onScroll}
          ref={containerRef}
          style={{ height: containerHeight }}
          className='w-full overflow-auto relative hide-scrollbar'
        >
          {loading ? (
            <LoadingSkeleton rowHeight={rowHeight} />
          ) : (
            <div style={{ height: displayCount * rowHeight, position: 'relative' }}>
              {visibleItems.length > 0 ? (
                visibleItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={false} // تعطيل الانيميشن الأولي لتحسين الـ INP
                    animate={{ y: item.index * rowHeight }}
                    transition={{ type: "spring", stiffness: 1000, damping: 100 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: rowHeight,
                      padding: '6px 12px',
                    }}
                  >
                    <div className='group relative h-full bg-white border border-slate-200/60 rounded-xl flex items-center justify-between px-6 hover:border-indigo-400/50 transition-colors'>
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-indigo-100">
                          <FiBox size={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className='font-semibold text-slate-800 text-sm md:text-base'>{item.name}</span>
                          <span className="text-[11px] text-slate-400">ID: {item.id} • Row {item.index}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-mono text-slate-400">VALUE</span>
                        <span className="font-bold text-slate-700">{item.price}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <EmptyState searchTerm={searchTerm} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}