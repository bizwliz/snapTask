import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_SNAP } from '../../utils/mutations';
import { QUERY_SNAPS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const SnapForm = () => {
  const [snapTitle, setSnapTitle] = useState('');
  const [snapDepartment, setSnapDepartment] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addSnap, { error }] = useMutation(ADD_SNAP, {
    refetchQueries: [QUERY_SNAPS, 'getSnaps', QUERY_ME, 'me'],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addSnap({
        variables: {
          snapTitle,
          snapDepartment,
        },
      });

      setSnapTitle('');
      setSnapDepartment(''); // Optionally reset snapDepartment after submission
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'snapTitle' && value.length <= 280) {
      setSnapTitle(value);
      setCharacterCount(value.length);
    }
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;

    if (name === 'snapDepartment' && value.length <= 280) {
      setSnapDepartment(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Create your project, snap, and done!</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">

              <textarea
                name="snapTitle"
                placeholder="What is your snap name?"
                value={snapTitle}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>

                <textarea
                name="snapDepartment"
                placeholder="What is your snap about?"
                value={snapDepartment}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange2}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Snap
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your snaps. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SnapForm;
