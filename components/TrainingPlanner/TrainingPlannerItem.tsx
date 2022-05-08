import React from 'react'
import classNames from 'classnames'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'

interface TrainingPlannerItemProps {
    children?: React.ReactNode
    index: number
    item: { id: string; [key: string]: any }
    clone?: boolean | undefined
}

export function TrainingPlannerItem({ children, index, item, clone }: TrainingPlannerItemProps) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <>
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={classNames(
                            'mb-1',
                            'p-2',
                            'bg-blue-400',
                            {
                                'bg-blue-600': snapshot.isDragging,
                            },
                            'text-white',
                        )}
                        style={{
                            userSelect: 'none',
                            minHeight: 58,
                            ...provided.draggableProps.style,
                            ...(clone === true && !snapshot.isDragging && { transform: 'none' }),
                        }}
                    >
                        {children}
                    </div>
                    {clone === true && snapshot.isDragging && (
                        <div
                            className="mb-1 p-2 bg-blue-400 text-white"
                            style={{
                                userSelect: 'none',
                                minHeight: 58,
                            }}
                        >
                            {children}
                        </div>
                    )}
                </>
            )}
        </Draggable>
    )
}
