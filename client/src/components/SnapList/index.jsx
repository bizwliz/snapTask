import { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SNAPS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_SNAPS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import SnapItem from '../SnapItem';

function SnapList() {
  const [state, dispatch] = useStoreContext();

  const { currentDepartment } = state;

  const { loading, data } = useQuery(QUERY_SNAPS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_SNAPS,
        snaps: data.snaps,
      });
      console.log(data.snaps)
      data.snaps.forEach((snap) => {
        idbPromise('snaps', 'put', snap);
      });
    } else if (!loading) {
      idbPromise('snaps', 'get').then((snap) => {
        dispatch({
          type: UPDATE_SNAPS,
          snaps: snap,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterSnaps() {
    if (!currentDepartment) {
      return state.snaps;
    }
console.log(state.snaps)
    return state.snaps.filter(
      (snap) => snap.department._id === currentDepartment
    );
  }

  return (
    <div className="my-2">
      <h2>Our Snaps:</h2>
      {state.snaps ? (
        <div className="flex-row">
          {filterSnaps()?.map((snap) => (
            <SnapItem
              key={snap?._id}
              _id={snap?._id}
              image={snap?.image}
              name={snap?.name}
              price={snap?.price}
              quantity={snap?.quantity}
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

export default SnapList;
