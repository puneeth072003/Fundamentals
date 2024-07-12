import { configureStore } from 'redux';
import userReducer from './user-reducer';

const store = configureStore(userReducer);

export default store;