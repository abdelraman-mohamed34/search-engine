import React from 'react'
import { FiSearch } from 'react-icons/fi'

function SearchInput({ searchTerm, setSearchTerm }) {
    return (
        <div className='flex justify-center mb-3 max-w-7xl mx-auto w-full'>
            <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <FiSearch size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-200 py-4 pl-12 pr-4 rounded-xl shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                />
            </div>
        </div>
    )
}

export default SearchInput
