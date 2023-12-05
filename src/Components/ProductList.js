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

    // Establecer el ID del producto y los datos del formulario
    setUpdateProductId(id);
    setProductsForm({
      product_name,
      product_description,
      product_price: parseFloat(product_price),
      id_categoria,
      product_stock,
    });
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
