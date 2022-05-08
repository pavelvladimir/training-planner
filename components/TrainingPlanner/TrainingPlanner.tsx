import { TrainingPlannerProvider } from './TrainingPlannerProvider'
import { TrainingPlannerBoards } from './TrainingPlannerBoards'

export function TrainingPlanner() {
    return (
        <TrainingPlannerProvider>
            <TrainingPlannerBoards />
        </TrainingPlannerProvider>
    )
}
