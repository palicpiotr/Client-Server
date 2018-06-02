export function isLoading(state = false, action) {
    switch (action.type) {
        case 'TODOS_LOADING':
            return true;
        default:
            return false;
    }
}

export function isError(state = false, action) {
    switch (action.type) {
        case 'TODO_LOADING_ERROR':
            return true;
        default:
            return false;
    }
}
