import React, { Fragment, useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Form from './Components/Form.js';

function App() {
  const [productsForm, setProductsForm] = useState({
    product_name: '',
    product_description: '',
    product_price: '',
    id_categoria: '',
    product_stock: '',
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
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 col-lg-5 mb-3">
            <h2 style={{ textAlign: 'center' }}>Product Form</h2>
            <Form
              productsForm={productsForm}
              setProductsForm={setProductsForm}
              updateProductId={updateProductId}
            />
          </div>
          <div className="col-12 col-lg-7">
            <h2 style={{ textAlign: 'center' }}>Products List</h2>
            <ProductList
              products={productsList}
              setProducts={setProductsList}
              setListUpdated={setListUpdated}
              setUpdateProductId={setUpdateProductId}
              setProductsForm={setProductsForm}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;


/* 
Dear programmer:
When I wrote this code, only god and I knew how it worked.
Now, only god knows it!
Therefore, if you are trying to optimize
this routine and it fails (most surely),
please increase this counter as awarning for the next person:
total_hours_wasted_here = 150 
*/
