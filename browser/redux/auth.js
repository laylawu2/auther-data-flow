import axios from 'axios';
import { browserHistory } from 'react-router'

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE = 'REMOVE_CURRENT_USER'

/* -----------------    ACTIONS     ------------------ */

export const setUser  = user => ({ type: SET_CURRENT_USER, user })
const remove  = () => ({ type: REMOVE })

/* ------------       REDUCER     ------------------ */

export default function reducer (currentUser={}, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return action.user
            case REMOVE: return null
		default: return currentUser;
	}
}

/* ------------       DISPATCHERS     ------------------ */

export const login = (formData) => dispatch => {
  axios.post('/auth/login', formData)
       .then(dbUser => dispatch(setUser(dbUser.data)))
       .catch(err =>  console.error(err.stack))
}

export const signup = credentials => dispatch => {
  axios.post('/auth/signup', credentials)
       .then(res => dispatch(set(res.data)))
       .catch(err => console.error('Signup unsuccesful', err));
}

export const retrieveLoggedInUser = () => dispatch => {
  axios.get('/auth/me')
      .then(res => dispatch(setUser(res.data)))
      .catch(err => console.error('retrieveLoggedInUser unsuccesful', err));
}

export const logout = () => dispatch => {
  dispatch(remove())
  axios.get('/auth/logout')
       .catch(err => console.error('logout unsuccesful', err));
}
