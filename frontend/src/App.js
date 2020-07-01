import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';

function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  // const [searchKeyword, setSearchKeyword] = useState('');
  // const [sortOrder, setSortOrder] = useState('');
  // const category = props.match.params.id ? props.match.params.id : '';

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(listProducts(category, searchKeyword, sortOrder))
  // }
  // const sortHandler = (e) => {
  //   setSortOrder(e.target.value);
  //   dispatch(listProducts(category, searchKeyword, sortOrder))
  // }

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
         
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/"><b>WikiShop</b></Link>
          </div>

          {/* <ul className="filter">
            <li>
              <form onSubmit={submitHandler}>
                <input className="button-search" name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
                <button type="submit">Search</button>
              </form>
            </li>
            <li>
              Sort By: {' '}
              <select name="sortOrder" onChange={sortHandler}>
                <option value="">Newest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </select>
            </li>
          </ul> */}

          
          <div className="header-links">
            <Link to="/cart" title="Your Cart"><i className="fa fa-shopping-cart fa-2x" aria-hidden="true"></i></Link>
            {
              userInfo ? <Link to="/profile" title={userInfo.name}><i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i> </Link> :
                <Link to="/signin" title="Login"><i className="fa fa-sign-in fa-2x" aria-hidden="true"></i></Link>
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#" title="Admin"><i className="fa fa-unlock fa-2x" aria-hidden="true"></i></a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>  
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Guitar Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            <i className="fa fa-arrow-left fa-1g" aria-hidden="true"></i>
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/Electric" onClick={closeMenu}>Electric</Link>
            </li>
            <li>
              <Link to="/category/Acoustic" onClick={closeMenu}>Acoustic</Link>
            </li>
            <li>
              <Link to="/category/Bass" onClick={closeMenu}>Bass</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />           
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>

        </main>
        <footer className="footer">
          &copy; 2020 All right reserved.
    </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
