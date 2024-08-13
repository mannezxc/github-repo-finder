'use client'

import { FC, PropsWithChildren, useRef } from "react"
import { AppStore, makeStore } from "./store"
import { Provider } from "react-redux"

export const ReduxProvider: FC<PropsWithChildren> = ({children}) => {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }
    return <Provider store={storeRef.current}>
        {children}
    </Provider>
}
