import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
// var CurrencyFormat = require('react-currency-format'); //ES5
import CurrencyFormat from 'react-currency-format'; //ES6

// function currencyFormat(num) {
//   return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
// }

const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'CDN'
  }).format(value);

function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  // const { loading, success, error, order } = orderCreate;
  const { success, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const tax = numberFormat(taxPrice);
  console.log(tax);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            {cart.shipping.address}, {cart.shipping.city},
          {cart.shipping.postalCode}, {cart.shipping.country},
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {cart.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
          </h3>
              <div>
                Price
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
                  <li key={item._id}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Qty: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      {/* ${item.price} */}
                      <CurrencyFormat value={item.price} decimalScale={2} fixedDecimalScale={true}
                          displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </div>
                  </li>
                )
            }
          </ul>
        </div>    
      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>SubTotal</div>
            {/* <div>${itemsPrice}</div> */}
            <div><CurrencyFormat value={itemsPrice} decimalScale={2} fixedDecimalScale={true}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
          </li>
          <li>
            <div>Shipping</div>
            {/* <div>${shippingPrice}</div> */}
            <div><CurrencyFormat value={shippingPrice} decimalScale={2} fixedDecimalScale={true}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
          </li>
          <li>
            <div>Tax</div>
            {/* <div>${taxPrice}</div> */}
            <div><CurrencyFormat value={taxPrice} decimalScale={2} fixedDecimalScale={true}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
          </li>
          <li>
            <div>Order Total</div>
            {/* <div>${totalPrice}</div> */}
            <div><CurrencyFormat value={totalPrice} decimalScale={2} fixedDecimalScale={true}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
          </li>
        </ul>
      </div>
    </div>
  </div>

}

export default PlaceOrderScreen;