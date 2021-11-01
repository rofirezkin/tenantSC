import {combineReducers} from 'redux';
import {registerReducer, idTenantReducer, photoReducer} from './auth';
import {globalReducer} from './global';
import {menuReducer} from './menu';

const reducer = combineReducers({
  registerReducer,
  photoReducer,
  globalReducer,
  menuReducer,
  idTenantReducer,
}); //combine reducer karena reducer akan banyak

export default reducer;
