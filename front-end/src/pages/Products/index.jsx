import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProductsCards from '../../components/ProductsCards';
import CartContext from '../../context/CartContext';

const axios = require('axios');

export default function ProductsWide() {
  const navigate = useNavigate();
  console.log(CartContext);
  const p = useContext(CartContext);
  console.log(p);
  const { cart } = useContext(CartContext);
  const accessToken = JSON.parse(localStorage.getItem('user'));
  const [prod, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios
        .get('http://localhost:3002/products', {
          headers: {
            authorization: accessToken.token,
          },
        });
      setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <div>
      <Header />
      {prod.length > 0 ? (
        prod.map((product) => (
          <ProductsCards p={ product } key={ product.id } />
        ))
      ) : (
        <div>Carregando</div>
      )}

      <button
        disabled={ !cart.products.length }
        onClick={ () => navigate('/customer/checkout') }
        data-testid="customer_products__button-cart"
        type="button"
      >
        Ver carrinho:
        <span data-testid="customer_products__checkout-bottom-value">
          {cart.totalPrice.replace('.', ',')}
        </span>
      </button>
    </div>
  );
}
