import React, { useEffect, useRef, useCallback } from 'react'
import { useVirtual } from 'react-virtual'

interface VirtualScrollProps {
    children: (item: any, index: number) => React.ReactNode
    items: Array<any>
    fetchMore: () => void
    canFetchMore: boolean
    estimateSize: number
    style?: React.CSSProperties
}

export function VirtualScroll({ children, items, fetchMore, canFetchMore, estimateSize, style }: VirtualScrollProps) {
    const parentRef = useRef()

    const rowVirtualizer = useVirtual({
        size: canFetchMore ? items.length + 1 : items.length,
        parentRef,
        estimateSize: useCallback(() => estimateSize, [estimateSize]),
    })

    useEffect(() => {
        const [lastItem] = [...rowVirtualizer.virtualItems].reverse()

        if (!lastItem) {
            return
        }

        if (canFetchMore && lastItem.index >= items.length - 1) {
            fetchMore()
        }
    }, [canFetchMore, fetchMore, items.length, rowVirtualizer.virtualItems])

    return (
        <div className="w-full overflow-auto" ref={parentRef} style={style}>
            <div
                className="relative w-full"
                style={{
                    height: rowVirtualizer.totalSize,
                }}
            >
                {rowVirtualizer.virtualItems.map((virtualRow) => {
                    const item = items[virtualRow.index]

                    return (
                        <div
                            key={virtualRow.index}
                            className="absolute left-0 w-full"
                            style={{
                                top: virtualRow.start,
                                height: virtualRow.size,
                            }}
                        >
                            {children(item, virtualRow.index)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
