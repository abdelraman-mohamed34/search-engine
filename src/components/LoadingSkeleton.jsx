import React from 'react'

function LoadingSkeleton({ rowHeight }) {
    return (
        <div className="w-full">
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    style={{ height: rowHeight, padding: '8px 16px' }}
                    className="w-full"
                >
                    <div className="h-full bg-white border border-slate-100 rounded-xl flex items-center justify-between px-5 animate-pulse">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-slate-200 rounded w-32"></div>
                                <div className="h-3 bg-slate-100 rounded w-20"></div>
                            </div>
                        </div>
                        <div className="h-6 bg-slate-200 rounded w-16"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LoadingSkeleton
