import React, { Fragment, useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Form from './Components/Form.js';

function App() {
  const [productsForm, setProductsForm] = useState({
    title: '',
    description: '',
    price: '',
    edicion: 0,
  });

  const [productsList, setProductsList] = useState([]);

  const [listUpdated, setListUpdated] = useState(false);

  // Agregamos el estado y la función para manejar la actualización del producto
  const [updateProductId, setUpdateProductId] = useState(null);

  useEffect(() => {
    const getProducts = () => {
      fetch('http://localhost:3001/api/products')
        .then(res => res.json())
        .then(res => setProductsList(res));
    };
    getProducts();
    setListUpdated(false);
  }, [listUpdated]);

  return (
    <Fragment>
      <Navbar brand="Library App" />
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{ textAlign: 'center' }}>Products List</h2>
            {/* Pasamos setUpdateProductId al componente ProductList */}
            <ProductList
              products={productsList}
              setProducts={setProductsList}
              setListUpdated={setListUpdated}
              setUpdateProductId={setUpdateProductId}
              setProductsForm={setProductsForm}
            />
          </div>
          <div className="col-5">
            <h2 style={{ textAlign: 'center' }}>Product Form</h2>
            {/* Pasamos updateProductId al componente Form */}
            <Form productsForm={productsForm} setProductsForm={setProductsForm} updateProductId={updateProductId} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
