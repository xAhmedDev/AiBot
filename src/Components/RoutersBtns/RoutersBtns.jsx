import { Link, useLocation } from "react-router-dom";
import "./RoutersBtns.css";

const RoutersBtns = () => {
  const location = useLocation();

  const isChatBotActive = location.pathname === "/chatbot" || location.pathname === "/";
  const isImageGeneratorActive = location.pathname === "/image-generator";

  return (
    <div className="btnR d-flex position-sticky top-0">
      <Link
        className={`btn ${isChatBotActive ? "active" : ""} flex-grow-1`}
        to={"/chatbot"}
      >
        Chat Bot
      </Link>
      <Link
        className={`btn ${
          isImageGeneratorActive ? "active" : ""
        } flex-grow-1`}
        to={"/image-generator"}
      >
        Images Generator
      </Link>
    </div>
  );
};

export default RoutersBtns;
