import SnapList from "../components/SnapList";
import DepartmentMenu from "../components/DepartmentMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <DepartmentMenu />
      <SnapList />
      <Cart />
    </div>
  );
};

export default Home;
