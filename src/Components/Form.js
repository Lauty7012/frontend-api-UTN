import React from 'react';

const Form = ({ productsForm, setProductsForm, updateProductId }) => {
  const handleChange = (e) => {
    setProductsForm({
      ...productsForm,
      [e.target.name]: e.target.value,
    });
  };

  let { product_name, product_description, product_price, id_categoria, product_stock } = productsForm;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de los datos
    if (!product_name || !product_description || !product_price || !id_categoria || !product_stock) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // Consulta
    const requestInit = {
      method: updateProductId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productsForm),
    };

    const apiUrl = updateProductId
      ? `http://localhost:3001/api/products/${updateProductId}`
      : 'http://localhost:3001/api/products';

    fetch(apiUrl, requestInit)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((error) => console.error('Error en la solicitud:', error));

    // Reiniciando state del formulario
    setProductsForm({
      product_name: '',
      product_description: '',
      product_price: '',
      id_categoria: '',
      product_stock: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="product_name" className="form-label">
          Name
        </label>
        <input
          value={product_name}
          name="product_name"
          onChange={handleChange}
          type="text"
          id="product_name"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="product_description" className="form-label">
          Description
        </label>
        <input
          value={product_description}
          name="product_description"
          onChange={handleChange}
          type="text"
          id="product_description"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="product_price" className="form-label">
          Price
        </label>
        <input
          value={product_price}
          name="product_price"
          onChange={handleChange}
          type="number"
          id="product_price"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="id_categoria" className="form-label">
          Category ID
        </label>
        <input
          value={id_categoria}
          name="id_categoria"
          onChange={handleChange}
          type="number"
          id="id_categoria"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="product_stock" className="form-label">
          Stock
        </label>
        <input
          value={product_stock}
          name="product_stock"
          onChange={handleChange}
          type="number"
          id="product_stock"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {updateProductId ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

export default Form;
