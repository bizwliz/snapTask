import { useQuery } from '@apollo/client';

import SnapList from '../components/SnapList';
import SnapForm from '../components/SnapForm';

import { QUERY_SNAPS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_SNAPS);
  const snaps = data?.snaps || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <SnapForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <SnapList
              snaps={snaps}
              title="Some Feed for Snap(s)..."
            />
          )}
        </div>
      </div>
    </main>
    
  );
};

export default Home;
