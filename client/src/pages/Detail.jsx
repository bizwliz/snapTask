import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_SNAPS,
} from '../utils/actions';
import { QUERY_SNAPS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentSnap, setCurrentSnap] = useState({});

  const { loading, data } = useQuery(QUERY_SNAPS);

  const { snaps, cart } = state;

  useEffect(() => {
    // already in global store
    if (snaps.length) {
      setCurrentSnap(snaps.find((snap) => snap._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_SNAPS,
        products: data.snaps,
      });

      data.snaps.forEach((snap) => {
        idbPromise('snaps', 'put', snap);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('snaps', 'get').then((indexedSnaps) => {
        dispatch({
          type: UPDATE_SNAPS,
          products: indexedSnaps,
        });
      });
    }
  }, [snaps, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentSnap, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentSnap, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentSnap._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentSnap && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentSnap.name}</h2>

          <p>{currentSnap.description}</p>

          <p>
            <strong>Price:</strong>${currentSnap.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentSnap._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentSnap.image}`}
            alt={currentSnap.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
