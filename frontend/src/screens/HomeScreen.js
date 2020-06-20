import React, { useEffect } from 'react';
// import data from '../data';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen (props) {

    //React Hook - lets you use state and other React features without writing a class.

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList
    const dispatch = useDispatch();

    useEffect(() => {
      // similar to componentDidMount/componentDidUpdate
      // const fetchData = async () => {
      //   const {data} = await axios.get("api/products");
      //   setProduct(data);
      //}
      // fetchData();

      // using react-redux
      dispatch(listProducts());
      return () => {
        //
      };
    }, [])

    return loading ? <div>Loading ...</div> :
      error ? <div>{error}</div> :   
        <ul className="products">
        {      
          products.map(product =>         
            <li key={product._id}>
              <div className="product">
              <Link to = {'/product/' + product._id}>
                <img className="product-image" src={product.image} alt="product" />
                <div className="product-name">{product.name}</div>
                </Link>
                
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                    {/* {[...Array(product.rating).keys()].map(x =>
                      <i class="fa fa-star fa-1x" aria-hidden="true"></i>
                    )} */}
                  {product.rating} Stars
                  ({product.numReviews} Reviews)
                </div>
              </div>
            </li>)
          }

      </ul>
}

export default HomeScreen;