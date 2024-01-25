import { put, takeLatest,call,delay } from 'redux-saga/effects';
import nameSpace from './nameSpace';
import api from '../../api'

export function* Login({payload}) {
  yield put({ type: `${nameSpace}/startLoading`,payload });
  yield delay(500)
  const respone = yield call(api.login,payload)
  yield put({ type: `${nameSpace}/endLoading`,payload:respone });
}

export function* watchLogin() {
  yield takeLatest(`${nameSpace}/login`, Login);
}

