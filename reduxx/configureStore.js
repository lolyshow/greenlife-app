import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { promiseMiddleware } from './middleware';
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
    appReducer,
    authReducer,
});
 
const persistConfig = {
  key: 'root',
  whitelist: ['authReducer'], // only authReducer state will be persisted
  storage:AsyncStorage
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
// export const RootState = ReturnType<typeof rootReducer>
// export const AppDispatch = typeof rootReducer
export default () => {
  let store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk, promiseMiddleware)))
  let persistor = persistStore(store)
  return { store, persistor }
}