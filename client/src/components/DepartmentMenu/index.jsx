import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_DEPARTMENTS, UPDATE_CURRENT_DEPARTMENT } from '../../utils/actions';
import { QUERY_DEPARTMENTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function DepartmentMenu() {
  const [state, dispatch] = useStoreContext();
  const { departments, currentDepartment } = state;

  const { loading, data: departmentData } = useQuery(QUERY_DEPARTMENTS);

  useEffect(() => {
    if (departmentData) {
      dispatch({
        type: UPDATE_DEPARTMENTS,
        departments: departmentData.departments,
      });
      departmentData.departments.forEach((department) => {
        idbPromise('departments', 'put', department);
      });
    } else if (!loading) {
      idbPromise('departments', 'get').then((departments) => {
        dispatch({
          type: UPDATE_DEPARTMENTS,
          departments: departments,
        });
      });
    }
  }, [departmentData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_DEPARTMENT,
      currentDepartment: id,
    });
  };

  return (
    <div>
      <h2>Choose a Department:</h2>
      {departments.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
          className={`btn ${currentDepartment === item._id && 'active'}`}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleClick('');
        }}
        className={`btn ${!currentDepartment && 'active'}`}
      >
        All
      </button>
    </div>
  );
}

export default DepartmentMenu;
