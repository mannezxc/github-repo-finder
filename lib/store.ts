import { useDispatch, useSelector, useStore } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reposSlice from './reducers/repos'

export const makeStore = () => {
    return configureStore({
        reducer: {
            repos: reposSlice
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
