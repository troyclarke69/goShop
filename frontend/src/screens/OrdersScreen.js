import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import CurrencyFormat from 'react-currency-format';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { success: successDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return loading ? <div><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      <span className="sr-only">Loading...</span>
    </div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead className="thead-style">
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Total</th>
              <th>User</th>
              <th>Paid</th>
              <th>Paid At</th>
              <th>Delivered</th>
              <th>Delivered At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id.substring(0,10)}</td>
              <td>{order.createdAt.substring(0,10)}</td>
              <td>
                {/* {order.totalPrice} */}
                <CurrencyFormat value={order.totalPrice} decimalScale={2} fixedDecimalScale={true}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} />
                
              </td>
              <td>{order.user.name}</td>
              <td>
                {/* {order.isPaid.toString()} */}
                {order.isPaid ? <i class="fa fa-check fa-1g" aria-hidden="true"></i> : <i class="fa fa-times" aria-hidden="true"></i>}
              </td>
              <td>{order.paidAt}</td>
              <td>
                {/* {order.isDelivered.toString()} */}
                {order.isDelivered ? <i class="fa fa-check fa-1g" aria-hidden="true"></i> : <i class="fa fa-times" aria-hidden="true"></i>}
              </td>
              <td>{order.deliveredAt}</td>
              <td>
                <Link to={"/order/" + order._id} className="button secondary" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button remove">Delete</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;