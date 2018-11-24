import { put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { connect } from '../createSocketConnection';
import { setCustomerServiceAvailability } from '../actions';

export function* customerServiceAvailabilitySaga() {
  const socket = connect();
  const channel = new eventChannel((emit) => {
    const enableSupportMessage = () => {
      emit(true);
    };
    const disableSupportMessage = () => {
      emit(false);
    };

    socket.on('SUPPORT_AVAILABLE', enableSupportMessage);
    socket.on('SUPPORT_NOT_AVAILABLE', disableSupportMessage);
    return () => {};
  });

  while (true) {
    const supportavailable = yield take(channel);
    yield put(setCustomerServiceAvailability(supportavailable));
  }
}
