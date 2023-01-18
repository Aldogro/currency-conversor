import { localStorageAdd } from './utils'

export const AppActions = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SAVE_BLUE: 'SAVE_BLUE',
    SAVE_LAST_CURRENCY: 'SAVE_LAST_CURRENCY',
    SET_LAST_SAVED_RATES: 'SET_LAST_SAVED_RATES',
    SET_LAST_UPDATED_RATES: 'SET_LAST_UPDATED_RATES',
    SET_NEXT_UPDATE_DATE: 'SET_NEXT_UPDATE_DATE'
}

export const AppReducer = (state, action) => {
    switch (action.type) {
        case AppActions.LOGIN:
            localStorageAdd('uyuAppState', { ...state, loggedUser: true })
            return { ...state, loggedUser: true }
        case AppActions.LOGOUT:
            localStorageAdd('uyuAppState', { ...state, loggedUser: false })
            return { ...state, loggedUser: false }
        case AppActions.SAVE_BLUE:
            localStorageAdd('uyuAppState', { ...state, lastBlueValue: action.payload })
            console.log(action.payload)
            return { ...state, lastBlueValue: action.payload }
        case AppActions.SAVE_LAST_CURRENCY:
            localStorageAdd('uyuAppState', { ...state, lastSelectedCurrency: action.payload })
            return { ...state, lastSelectedCurrency: action.payload }
        case AppActions.SET_LAST_SAVED_RATES:
            localStorageAdd('uyuAppState', { ...state, lastSavedRates: action.payload })
            return { ...state, lastSavedRates: action.payload }
        case AppActions.SET_LAST_UPDATED_RATES:
            localStorageAdd('uyuAppState', { ...state, lastUpdatedRates: action.payload })
            return { ...state, lastUpdatedRates: action.payload }
        case AppActions.SET_NEXT_UPDATE_DATE:
            localStorageAdd('uyuAppState', { ...state, nextUpdate: action.payload })
            return { ...state, nextUpdate: action.payload }
      default:
        return state
    }
}