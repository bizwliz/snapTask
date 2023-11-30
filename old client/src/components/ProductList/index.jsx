import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        snaps: data.snaps,
      });
      data.snaps.forEach((snap) => {
        idbPromise('snaps', 'put', snap);
      });
    } else if (!loading) {
      idbPromise('snaps', 'get').then((snaps) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          snaps: snaps,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.snaps;
    }

    return state.snaps.filter(
      (snap) => snap.department._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Snaps:</h2>
      {state.snaps.length ? (
        <div className="flex-row">
          {filterProducts().map((snap) => (
            <ProductItem
              key={snap._id}
              _id={snap._id}
              image={snap.image}
              name={snap.name}
              price={snap.price}
              quantity={snap.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any snaps yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
