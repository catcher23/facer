const user = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_USER':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })

    default:
      return state
  }
}

const users = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        user(undefined, action)
      ]
    case 'TOGGLE_USER':
      return state.map(t =>
        user(t, action)
      )
    default:
      return state
  }
}

export default users