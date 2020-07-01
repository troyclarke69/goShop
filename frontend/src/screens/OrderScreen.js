import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
import CurrencyFormat from 'react-currency-format';

function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? <div><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        <span className="sr-only">Loading...</span>
      </div> 
    : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
              {order.shipping.postalCode}, {order.shipping.country},
          </div>
            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Items
                </h3>
                <div>
                  Price
                </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
                  </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.brand} {item.name}
                          </Link>
                        </div>
                        <div>
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                      <b><CurrencyFormat value={item.price} decimalScale={2} fixedDecimalScale={true}
                      displayType={'text'} thousandSeparator={true} prefix={'$'} /></b>
                        {/* ${item.price} */}
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li>
            <li>
              <span className="order-summary full-width">Order Summary</span>
            </li>
            <li>
              <div>SubTotal</div>
              {/* <div>${order.itemsPrice}</div> */}
              <div><CurrencyFormat value={order.itemsPrice} decimalScale={2} fixedDecimalScale={true}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            </li>
            <li>
              <div>Shipping</div>
              {/* <div>${order.shippingPrice}</div> */}
              <div><CurrencyFormat value={order.shippingPrice} decimalScale={2} fixedDecimalScale={true}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            </li>
            <li>
              <div>Tax</div>
              {/* <div>${order.taxPrice}</div> */}
              <div><CurrencyFormat value={order.taxPrice} decimalScale={2} fixedDecimalScale={true}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            </li>
            <li>
              <div>Order Total</div>
              {/* <div>${order.totalPrice}</div> */}
              <div><CurrencyFormat value={order.totalPrice} decimalScale={2} fixedDecimalScale={true}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
}

export default OrderScreen;