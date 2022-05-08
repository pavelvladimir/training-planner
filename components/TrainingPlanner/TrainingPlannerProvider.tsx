import React, { createContext, useReducer, useContext } from 'react'
import { ActivityItem, DashboardItem } from '@interfaces'

interface TrainingPlannerProviderProps {
    children?: React.ReactNode
}

type TrainingPlannerProviderState = {
    activities: Array<ActivityItem>
    dashboard: Array<DashboardItem>
}

type TrainingPlannerProviderAction =
    | {
          payload: Array<ActivityItem>
          type: 'SET_ACTIVITIES'
      }
    | {
          payload: Array<DashboardItem>
          type: 'SET_DASHBOARD'
      }

type TrainingPlannerContext = [TrainingPlannerProviderState, React.Dispatch<TrainingPlannerProviderAction>]

const reducer: React.Reducer<TrainingPlannerProviderState, TrainingPlannerProviderAction> = (
    state: TrainingPlannerProviderState,
    action: TrainingPlannerProviderAction,
) => {
    switch (action.type) {
        case 'SET_ACTIVITIES':
            return {
                ...state,
                activities: action.payload,
            }
        case 'SET_DASHBOARD':
            return {
                ...state,
                dashboard: action.payload,
            }
        default:
            return state
    }
}

const initialState: TrainingPlannerProviderState = {
    activities: [],
    dashboard: [],
}

export const TrainingPlannerContext = createContext<TrainingPlannerContext>([initialState, () => initialState])

export const TrainingPlannerProvider = ({ children }: TrainingPlannerProviderProps) => {
    const [state, dispatch] = useReducer<React.Reducer<TrainingPlannerProviderState, TrainingPlannerProviderAction>>(
        reducer,
        initialState,
    )

    return <TrainingPlannerContext.Provider value={[state, dispatch]}>{children}</TrainingPlannerContext.Provider>
}

const setActivities = (payload: Array<ActivityItem>): TrainingPlannerProviderAction => ({
    payload: payload,
    type: 'SET_ACTIVITIES',
})

export const useActivities = (): [Array<ActivityItem>, (value: Array<ActivityItem>) => void] => {
    const [state, dispatch] = useContext<TrainingPlannerContext>(TrainingPlannerContext)
    return [state.activities, (value) => dispatch(setActivities(value))]
}

const setDashboard = (payload: Array<DashboardItem>): TrainingPlannerProviderAction => ({
    payload: payload,
    type: 'SET_DASHBOARD',
})

export const useDashboard = (): [Array<DashboardItem>, (value: Array<DashboardItem>) => void] => {
    const [state, dispatch] = useContext<TrainingPlannerContext>(TrainingPlannerContext)
    return [state.dashboard, (value) => dispatch(setDashboard(value))]
}

export default TrainingPlannerProvider
