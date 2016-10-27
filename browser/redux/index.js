import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import currentUser from './auth';


export default combineReducers({ users, stories, currentUser });

// state {
// 	users
// 	stories
// 	login = current = {}
// 	signup
// }

// const mapState = (state) => ({
//   currentUserId: propertyFromState, ==> state.login.id???
//   message: 'Log in'
// })

// current = {
// 	id:
// 	name:
// 	phone:
// 	email:
// 	password:
// 	isAdmin:
// }

// browserHistory.push(`/users/${dbUser.data.id}`)
