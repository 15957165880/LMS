import { all } from 'redux-saga/effects';
// 导入你的各个 sagas
import {watchLogin} from './pages/Login/saga';
import {watchList} from './pages/List/saga';

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchList()
  ]);
}
