import {combineReducers} from 'redux';
import {registerReducer, idTenantReducer, photoReducer} from './auth';
import {globalReducer} from './global';
import {uploadMenuReducer, photoMenuReducer} from './uploadMenu';
import {menuReducer} from './menu';
import {updateMenuReducer} from './updateMenu';
import {customerOrderReducer} from './customerOrder';

const reducer = combineReducers({
  registerReducer,
  photoReducer,
  customerOrderReducer,
  globalReducer,
  menuReducer,
  idTenantReducer,
  updateMenuReducer,
  uploadMenuReducer,
  photoMenuReducer,
}); //combine reducer karena reducer akan banyak

export default reducer;
