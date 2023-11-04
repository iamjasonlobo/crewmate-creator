import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="sidenav">
        <Link className='sidenav-link' to="/">Home</Link>
        <Link className='sidenav-link' to="/create">Create a Crewmate!</Link>
        <Link className='sidenav-link' to="/gallery">Crewmate Gallery</Link>
      <img className="sidenav-img" src="https://shimmering-stardust-c75334.netlify.app/assets/peeking.7c0ab599.png" ></img>
      </div>
      <div className="whole-page">
        <Outlet />
      </div>
      </div>
  );
};

export default Layout;