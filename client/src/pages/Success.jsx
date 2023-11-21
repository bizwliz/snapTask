import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_TASK } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addTask] = useMutation(ADD_TASK);

  useEffect(() => {
    async function saveTask() {
      const cart = await idbPromise('cart', 'get');
      const snaps = cart.map((item) => item._id);

      if (snaps.length) {
        const { data } = await addTask({ variables: { snaps } });
        const snapData = data.addTask.snaps;

        snapData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveTask();
  }, [addTask]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
