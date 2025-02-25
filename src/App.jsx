import { Route, Routes } from "react-router-dom";
import "./App.css";
import Content from "./components/Content";
import Home from "./components/Home";
import History from "./components/History";
import Footer from "./reusableComponents/Footer";
import Header from "./reusableComponents/Header";

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Content />} path="/">
        </Route>
        <Route element={<Home />} path="/home"></Route>
        <Route element={<History />} path="/history"></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
