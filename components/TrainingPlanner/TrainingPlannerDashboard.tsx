import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import classNames from 'classnames'

import { TrainingPlannerItem } from './TrainingPlannerItem'
import { useDashboard } from './TrainingPlannerProvider'

export function TrainingPlannerDashboard() {
    const [dashboard] = useDashboard()

    return (
        <div className="flex flex-col w-2/3 px-3">
            <Droppable droppableId="DASHBOARD">
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                    return (
                        <div
                            className={classNames('w-full', 'p-1', 'bg-blue-50', {
                                'bg-amber-200': snapshot.isDraggingOver,
                            })}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                minHeight: 500,
                            }}
                        >
                            {dashboard.map((item, index) => {
                                return (
                                    <TrainingPlannerItem key={item.id} item={item} index={index}>
                                        <form action="">
                                            <p className="inline-block w-1/3">{item.activity.name.toUpperCase()}</p>
                                            <label className="inline-block w-1/3 px-1 text-black">
                                                <span className="sr-only">Number of repetitions</span>
                                                <input
                                                    className="w-full"
                                                    type="number"
                                                    placeholder="Number of repetitions"
                                                />
                                            </label>
                                            <label className="inline-block w-1/3 px-1 text-black">
                                                <span className="sr-only">Exercise Duration</span>
                                                <input
                                                    className="w-full"
                                                    type="number"
                                                    placeholder="Exercise Duration"
                                                />
                                            </label>
                                        </form>
                                    </TrainingPlannerItem>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        </div>
    )
}
