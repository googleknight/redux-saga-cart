import { take, put, apply } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { SET_CURRENT_USER, setTaxRate } from '../actions';

export function* taxRateSaga() {
  const { user: { country } } = yield take(SET_CURRENT_USER);
  const response = yield fetch(`http://localhost:8081/tax/${country}`);
  const { rate } = yield apply(response, response.json);
  yield put(setTaxRate(rate));
}
