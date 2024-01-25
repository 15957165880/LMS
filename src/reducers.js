import { combineReducers } from '@reduxjs/toolkit';
import LoginReducer from './pages/Login/model.js';
import ListReducer from './pages/List/model.js';

const rootReducer = combineReducers({
    login:LoginReducer,
    list: ListReducer
});

export default rootReducer;
