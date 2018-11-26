import { take, put, actionChannel } from 'redux-saga/effects';
import { SET_SHIPPING_FETCH_STATUS, setCanCheckOut, FETCHED } from '../actions';

export function* checkoutAvailabilitySaga() {
  const checkAvailabilityChannel = yield actionChannel(SET_SHIPPING_FETCH_STATUS);
  while (true) {
    const { status } = yield take(checkAvailabilityChannel);
    yield put(setCanCheckOut(status === FETCHED));
  }
}
