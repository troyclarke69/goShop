import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import CurrencyFormat from 'react-currency-format'; //ES6
import Rating from '../components/Rating';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));
    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    // console.log(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }

  return <>
    {category &&
      <div className="category">
        <div>Category: {category}</div> 
      </div>
    }

    <ul className="filter">
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
    </ul>
    
    {loading ? <div><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div> :
        error ? <div>{error}</div> :
        <ul className="products">
          {
            products.map(product =>
              <li key={product._id}>
                <div className="product">
                  <Link to={'/product/' + product._id}>
                    <img className="product-image" src={product.image} alt="product" />

                  </Link>
                  <div className="product-name">
                    <Link to={'/product/' + product._id}>{product.name}</Link>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  {/* <div className="product-price">${product.price}</div> */}
                  <div className="product-price"><CurrencyFormat value={product.price} decimalScale={2}     fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </div>
                  <div className="product-rating">
                    {/* {product.rating} Stars ({product.numReviews} Reviews) */}
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </div>
                </div>
              </li>)
          }
        </ul>
    }
  </>

}
export default HomeScreen;