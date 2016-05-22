export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'USERS_RECEIVED':
      return state.update('users',
        usersState => users(usersState, action.entries));
    case 'USER_RECEIVED':
      return state.update('user',
        userState => user(userState, action.entry));
  }
  return state;
}