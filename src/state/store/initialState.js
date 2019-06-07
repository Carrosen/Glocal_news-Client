const initialState = {
  country: '',
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        uid: ''
      },
    },
  },
}

export default initialState
