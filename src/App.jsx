import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import ChatBot from "./Components/ChatBot/ChatBot.jsx";
import ImagesGenerator from "./Components/ImagesGenerator/ImagesGenerator.jsx";
import NoPageFound from "./Components/NoPageFound/NoPageFound.jsx"
import { Routes, Route } from "react-router-dom";

const App = () => {
  


  return (
      <Routes>
          <Route path="/" element={<ChatBot />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/image-generator" element={<ImagesGenerator />} />
          <Route path="*" element={<NoPageFound />} />
      </Routes>
  );
};

export default App;
