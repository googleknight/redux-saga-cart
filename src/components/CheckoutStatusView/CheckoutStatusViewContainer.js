import { connect } from 'react-redux';
import { CheckoutStatusViewDisplay } from './CheckoutStatusViewDisplay';

import { checkoutPhaseSelector } from '../../selectors';

const mapStateToProps = state => ({
  phase: checkoutPhaseSelector(state),
});
const mapDispatchToProps = dispatch => ({

});

export const CheckoutStatusViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutStatusViewDisplay);
