import { useContext } from "react";
import "./HomeScreenContent.css";
import { AuthContext } from "../../contexts/authContext";

function HomeScreenContent({ homeContent }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="home-screen-content">
      <h1 className="content-title">Hello, {currentUser.name}!</h1>
      <hr></hr>
      {homeContent}
    </div>
  );
}

export default HomeScreenContent;
