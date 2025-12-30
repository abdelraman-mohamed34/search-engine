
'use client'
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'

const VictoryChart = dynamic(() => import('victory').then(m => m.VictoryChart), { ssr: false });
const VictoryLine = dynamic(() => import('victory').then(m => m.VictoryLine), { ssr: false });
const VictoryAxis = dynamic(() => import('victory').then(m => m.VictoryAxis), { ssr: false });

function Charts({ chartData }) {
    const formattedData = useMemo(() => {
        if (!chartData || !Array.isArray(chartData) || chartData.length === 0) return [];
        return chartData.map((val, index) => ({
            x: index + 1,
            y: parseFloat(val)
        }));
    }, [chartData]);

    if (formattedData.length === 0) {
        return (
            <div className="w-full h-[350px] flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-400 text-sm">Processing 1M records...</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-2xl max-w-7xl p-6 shadow-md border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-2">Performance Analytics</h3>
            <div className="h-[300px] w-full">
                <VictoryChart
                    key={formattedData.length}
                    width={800}
                    height={300}
                    domain={{ y: [40, 60] }}
                    padding={{ top: 20, bottom: 50, left: 50, right: 30 }}
                >
                    <VictoryAxis
                        tickFormat={(x) => `CH-${x}`}
                        style={{ tickLabels: { fontSize: 10, fill: '#9ca3af' } }}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(y) => `$${y}`}
                        style={{ tickLabels: { fontSize: 10, fill: '#9ca3af' } }}
                    />
                    <VictoryLine
                        data={formattedData}
                        interpolation="natural"
                        style={{
                            data: { stroke: "#4f46e5", strokeWidth: 3 }
                        }}
                        animate={{ duration: 1000 }}
                    />
                </VictoryChart>
            </div>
        </div>
    )
}

export default Charts;