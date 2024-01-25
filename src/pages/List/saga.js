import { put, takeEvery, call } from 'redux-saga/effects';
import nameSpace from './nameSpace';
import api from '../../api'

function* update({ payload }) {
  const {data,success} = yield call(api.update, payload)
  const {action}=payload
  yield put({ type: `${nameSpace}/updateList`,payload:{data,success,action} });
}



export function* watchList() {
  yield takeEvery(`${nameSpace}/update`, update);
}

