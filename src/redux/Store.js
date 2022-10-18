import { configureStore } from '@reduxjs/toolkit'

import main from './MainSlice'

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action,
        })
    }
    return next(action)
}

const Store = configureStore({
    reducer: { main },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default Store
