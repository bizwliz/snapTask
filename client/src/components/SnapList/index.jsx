import { Link } from 'react-router-dom';

const ThoughtList = ({
  snaps,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!snaps.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {snaps &&
        snaps.map((snap) => (
          <div key={snap._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${snap.snapDepartment}`}
                >
                  {snap.snapDepartment} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this snap on {snap.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this snap on {snap.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{snap.snapTitle}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/snaps/${snap._id}`}
            >
              Join the discussion on this snap.
              
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
