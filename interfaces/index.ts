export type ActivityItem = {
    id: string
    name: string
}

export type DashboardItem = {
    id: string
    activityId: ActivityItem['id']
    activity: ActivityItem
    repetitions: number
    duration: number // seconds
}
