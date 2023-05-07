export const startLoading = state => ({
    ...state,
    isLoading: true,
    hasError: false,
    error: null
})

export const finishLoading = state => ({
    ...state,
    isLoading: false,
    hasError: false,
    error: null,
})

export const errorLoading = (state, error) => ({
    ...state,
    isLoading: false,
    hasError: true,
    error
})

export const resetLoading = state => ({
    ...state,
    isLoading: false,
    hasError: false,
    error: null,
})