import { v4 as uuid } from 'uuid'
import { DashboardItem } from '@interfaces'

export function create(initialValues: any): DashboardItem {
    return {
        id: initialValues?.id || uuid(),
        activityId: initialValues?.activityId || initialValues?.activity?.id || null,
        activity: initialValues?.activity || null,
        repetitions: initialValues?.repetitions || null,
        duration: initialValues?.duration || null,
    }
}

export default create
