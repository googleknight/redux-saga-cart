import fetch from 'isomorphic-fetch';
import { take, put, fork, all, apply } from 'redux-saga/effects';
import { SET_CART_ITEMS, SET_CURRENT_USER, setItemPrice } from '../actions';

export function* fetchItemPrice(item, currency) {
  const response = yield fetch(`http://localhost:8081/prices/${currency}/${item.id}`);
  const data = yield apply(response, response.json);
  const { price } = data[0];
  yield put(setItemPrice(item.id, price));
}

export function* itemPriceSaga() {
  const [{ user }, { items }] = yield all([
    take(SET_CURRENT_USER),
    take(SET_CART_ITEMS),
  ]);
  yield items.map(item => fork(fetchItemPrice, item, user.country));
}
