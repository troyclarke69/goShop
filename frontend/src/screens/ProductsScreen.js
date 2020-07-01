import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';
import CurrencyFormat from 'react-currency-format';
import Axios from 'axios';

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const productList = useSelector(state => state.productList);
  // const { loading, products, error } = productList;
  const { products } = productList;

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  // const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
  const { success: successDelete } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  }

  const openModalNew = (product) => {
    setModalVisible(true);
    setId(0);
    setName('');
    setPrice(0);
    setDescription('');
    setImage('');
    setBrand('');
    setCategory('');
    setCountInStock(0);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
      _id: id,
      name, price, image, brand, category,
      countInStock, description
    }));
  }
  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  }

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);

    setUploading(true);
    //aws path: api/uploads/s3
    Axios.post('api/uploads/s3', bodyFormData, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    }).then(response => {
      setImage(response.data);
      setUploading(false);
    }).catch(error => {
      console.log(error);
      setUploading(false);
    });
  };

  return <div className="content content-margined">
    <div className="product-header">     
      <h3>Products</h3>
      <button className="button primary" onClick={() => openModalNew({})}>Create Product</button>
    </div>

    {modalVisible &&
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              {name && <h2>Edit Product</h2>}
              {!name && <h2>Create Product </h2>}
              
            </li>
            <li>
              {loadingSave && <div><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
              <span className="sr-only">Loading...</span></div>}
              {errorSave && <div>{errorSave}</div>}
            </li>

            <li>
              <label htmlFor="name">
                Name
              </label>
              <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="price">
                Price
              </label>
              <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="image">
                Image
              </label>
              <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)}>
              </input>
              <input type="file" onChange={uploadFileHandler}></input>
              {uploading && <div>Uploading image...</div>}
            </li>
            <li>
              <label htmlFor="brand">
                Brand
              </label>
              <input type="text" name="brand" value={brand} id="brand" onChange={(e) => setBrand(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="countInStock">
                CountInStock
              </label>
              <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="name">
                Category
              </label>
              <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="description">
                Description
              </label>
              <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
            </li>
            <li>
              <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
            </li>
            <li>
              <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
            </li>
          </ul>
        </form>
      </div>
    }

    <div className="product-list">
      <table className="table">
        <thead className="thead-style">
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (<tr key={product._id}>
            <td>{product._id.substring(0,10)}</td>
            <td>{product.brand}</td>
            <td>{product.name}</td>
            <td>
              {/* {product.price} */}
              <CurrencyFormat value={product.price} decimalScale={2} fixedDecimalScale={true}
                      displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </td>
            <td>{product.category}</td>
           
            <td>
              <button className="button secondary" onClick={() => openModal(product)} >Edit</button>
              {' '}
              <button className="button remove" onClick={() => deleteHandler(product)} >Delete</button>
            </td>
          </tr>))}
        </tbody>
      </table>

    </div>
  </div>
}
export default ProductsScreen;