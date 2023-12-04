import React from 'react';

const ProductList = ({ products, setProducts, setListUpdated, setUpdateProductId, setProductsForm }) => {
  const handleDelete = (id) => {
    const requestInit = {
      method: 'DELETE',
    };
    fetch(`http://localhost:3001/api/products/${id}`, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    setListUpdated(true);
  };

  const handleUpdate = (id) => {
    const selectedProduct = products.find((product) => product.product_id === id);
  
    if (!selectedProduct) {
      console.error(`Product with id ${id} not found.`);
      return;
    }
  
    const { product_name, product_description, product_price, id_categoria, product_stock } = selectedProduct;
  
    console.log("Selected Product:", selectedProduct);
    
    const priceAsNumber = parseFloat(product_price);

    if (product_name === '' || product_description === '' || isNaN(priceAsNumber) || priceAsNumber <= 0) {
      alert('Todos los campos son obligatorios y el precio debe ser un número mayor a cero.');
      return;
    }

    const updatedProduct = {
      product_name,
      product_description,
      product_price: priceAsNumber,
      id_categoria,
      product_stock,
    };

    // Establecer el ID del producto y los datos del formulario
    setUpdateProductId(id);
    setProductsForm({
      product_name: updatedProduct.product_name,
      product_description: updatedProduct.product_description,
      product_price: updatedProduct.product_price,
      id_categoria: updatedProduct.id_categoria,
      product_stock: updatedProduct.product_stock,
    });

    const updatedProducts = products.map((product) =>
      product.product_id === id ? updatedProduct : product
    );

    const requestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    };

    fetch(`http://localhost:3001/api/products/${id}`, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    setProducts(updatedProducts);

    setListUpdated(true);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.product_id}>
            <td>{product.product_id}</td>
            <td>{product.product_name}</td>
            <td>{product.product_price}</td>
            <td>{product.product_description}</td>
            <td>
              <div className="mb-3">
                <button onClick={() => handleDelete(product.product_id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
              <div className="mb-3">
                <button onClick={() => handleUpdate(product.product_id)} className="btn btn-dark">
                  Update
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
