import { TrainingPlanner } from '@components/TrainingPlanner/TrainingPlanner'

function IndexPage() {
    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-wrap -mx-3">
                <TrainingPlanner />
            </div>
        </div>
    )
}

export default IndexPage
