import React, { useRef, useState } from 'react'
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import { VirtualScroll } from '@components/VirtualScroll'
import { sampleActivitiesData } from '@utils/sample-data'

import { useActivities } from './TrainingPlannerProvider'
import { TrainingPlannerItem } from './TrainingPlannerItem'

export function TrainingPlannerActivities() {
    const page = useRef(0)
    const [canFetchMore, setCanFetchMore] = useState(true)
    const [activities, setActivities] = useActivities()

    const fetchMore = () => {
        let result = Array.from(activities)

        const itemsPerPage = 10
        const startIndex = page.current * itemsPerPage
        const data = sampleActivitiesData.slice(startIndex, startIndex + itemsPerPage)

        result = result.concat(data)
        setActivities(result)
        setCanFetchMore(result.length < sampleActivitiesData.length)
        page.current++
    }

    return (
        <div className="flex flex-col w-1/3 px-3">
            <Droppable droppableId="ACTIVITIES" isDropDisabled>
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                    return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="w-full p-1 bg-blue-500"
                            style={{
                                minHeight: 500,
                            }}
                        >
                            <VirtualScroll
                                items={activities}
                                fetchMore={fetchMore}
                                canFetchMore={canFetchMore}
                                estimateSize={62}
                                style={{
                                    height: 492,
                                }}
                            >
                                {(item, index) => {
                                    return (
                                        item && (
                                            <TrainingPlannerItem key={item.id} item={item} index={index} clone>
                                                {item.name}
                                            </TrainingPlannerItem>
                                        )
                                    )
                                }}
                            </VirtualScroll>
                            {/* {provided.placeholder} */}
                        </div>
                    )
                }}
            </Droppable>
        </div>
    )
}
