export const user = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                completed: false,
                id: action.id,
                text: action.text
            };

        default:
            return state;
    }
};

export const users = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER':
            return [
                ...state,
                user(undefined, action)
            ];
        default:
            return state;
    }
};
