import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import CurrencyFormat from 'react-currency-format';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;

  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;

  const dispatch = useDispatch();

  useEffect(() => {
    if(productSaveSuccess) {
      alert('Review submitted successfully!');
      setRating(0);
      setComment('');

      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveProductReview(props.match.params.id, {
      name: userInfo.name,
      rating: rating,
      comment: comment,
    }));
  }

  return <div>
    <div className="back-to-result">
      <Link to="/">Go Back</Link>
    </div>
    {loading ? <div><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div> :
      error ? <div>{error} </div> :
        (
          <>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product" ></img>
            </div>
            <div className="details-info">
              <ul>
                {/* <li>
                  <h5>{product.brand}</h5>
                </li> */}
                <li>
                  <h4>{product.brand} {product.name}</h4>
                </li>
                <li>
                  {/* {product.rating} Stars ({product.numReviews} Reviews) */}
                  <a href="#reviews">
                    <Rating
                        value={product.rating}
                        text={product.numReviews + ' reviews'}
                      />
                    </a>
                </li>
                <li>
                  Price: 
                  {/* <b>${product.price}</b> */}
                  <b><CurrencyFormat value={product.price} decimalScale={2} fixedDecimalScale={true}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} /></b>
                </li>
                <li>                
                  <div>
                    {product.description}
                  </div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>
                  Price: 
                    {/* {product.price} */}
                    <b><CurrencyFormat value={product.price} decimalScale={2} fixedDecimalScale={true}
                  displayType={'text'} thousandSeparator={true} prefix={'$'} /></b>
                </li>
                <li>
                  Status: {product.countInStock > 0 ? <b>In Stock</b> : <b>Unavailable</b>}
                </li>
                <li>
                  Qty: <select className="qty-select" value={qty} onChange={(e) => { setQty(e.target.value) }}>
                    {[...Array(product.countInStock).keys()].map(x =>
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    )}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary" >Add to Cart</button>
                  }
                </li>
              </ul>
            </div>
          </div>
          
          <div className="content-margined">  
            <h2>Reviews</h2>         
            { !product.reviews.length && <div>There are no reviews yet.</div>}
            <ul className="review" id="reviews">
                { product.reviews.map((review) => (
                  <li key={review._id}>
                    <div>
                      <b>{review.name}</b> <i>wrote on </i> {review.createdAt.substring(0,10)}:
                    </div>                 
                    {/* <div>
                      {review.createdAt.substring(0,10)}
                    </div> */}
                    <div>
                      <span className="review-comment">"{review.comment}"</span>
                    </div>
                    <div>
                      <Rating value={review.rating}></Rating>                    
                    </div>
                  </li>
                ))}
                <li>
                  
                  <h3>Write a review</h3>
                  {/* only if user is signed in */}
                  {userInfo ? <form onSubmit={handleSubmit}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">
                          Rating
                        </label>
                        <select name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">Submit</button>
                      </li>
                    </ul>
                  </form> :
                  <div>Please <Link to={'/signin?redirect=product/' + product._id + "#reviews"} >
                      Login </Link> to write a review.
                  </div>
                  }
                 
                </li>
            </ul>
          </div>         
          </>
        )
    }


  </div>
}
export default ProductScreen;