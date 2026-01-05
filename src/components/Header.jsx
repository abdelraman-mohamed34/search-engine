import React from 'react'
import { FiLayers } from 'react-icons/fi'

const Header = React.memo(function Header() {
    return (
        <header className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 px-4 sm:px-0">
            <div>
                <h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3 whitespace-nowrap'>
                    <div className="w-8 h-8 flex items-center justify-center bg-indigo-50 rounded-lg shrink-0">
                        <FiLayers className="text-indigo-600" />
                    </div>
                    <span>Inventory Manager</span>
                </h1>

                <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">
                    Virtualized list rendering <span className="font-semibold text-indigo-700">1,000,000</span> items.
                </p>
            </div>
            <div className="hidden md:block">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    System Online
                </span>
            </div>
        </header>
    )
})

export default Header