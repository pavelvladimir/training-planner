import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { create as createDashboardItem } from '@models/dashboard'
import { ActivityItem, DashboardItem } from '@interfaces'

import { useDashboard, useActivities } from './TrainingPlannerProvider'
import { TrainingPlannerDashboard } from './TrainingPlannerDashboard'
import { TrainingPlannerActivities } from './TrainingPlannerActivities'

export function TrainingPlannerBoards() {
    const [activities] = useActivities()
    const [dashboard, setDashboard] = useDashboard()

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result

        if (!destination) return

        if (source.droppableId === 'ACTIVITIES' && destination.droppableId === 'DASHBOARD') {
            const result: Array<DashboardItem> = Array.from(dashboard)
            const sourceClone: Array<ActivityItem> = Array.from(activities)
            const item: ActivityItem = sourceClone[source.index]

            result.splice(destination.index, 0, createDashboardItem({ activity: item }))
            setDashboard(result)
        } else if (source.droppableId === 'DASHBOARD' && destination.droppableId === 'DASHBOARD') {
            const result: Array<DashboardItem> = Array.from(dashboard)
            const [removed] = result.splice(source.index, 1)
            result.splice(destination.index, 0, removed)
            setDashboard(result)
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <TrainingPlannerDashboard />
            <TrainingPlannerActivities />
        </DragDropContext>
    )
}
