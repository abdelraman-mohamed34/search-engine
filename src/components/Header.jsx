import React from 'react'
import { FiLayers } from 'react-icons/fi'

function Header({ count, len }) {
    return (
        <div className="max-w-7xl mx-auto mb-8 flex justify-between items-end">
            <div>
                <h1 className='text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3'>
                    <FiLayers className="text-indigo-600" />
                    Inventory Manager
                </h1>
                <p className="text-slate-500 mt-2">Virtualized list rendering {count} items smoothly.</p>
            </div>
            <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                <span className="text-indigo-700 font-semibold text-sm">Visible: {len}</span>
            </div>
        </div>
    )
}

export default Header
