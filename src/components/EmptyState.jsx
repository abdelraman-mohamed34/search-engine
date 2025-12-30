import React from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'

function EmptyState({ searchTerm }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-[500px] text-slate-400"
        >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <FiSearch size={32} className="opacity-20" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600">No results found</h3>
            <p className="text-sm">
                We couldn't find anything matching <span className="text-indigo-600 font-bold">"{searchTerm}"</span>
            </p>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 text-sm text-indigo-500 hover:underline"
            >
                Clear all filters
            </button>
        </motion.div>
    )
}

export default EmptyState
