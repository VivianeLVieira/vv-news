import './App.css'
import { Route, Routes } from "react-router";
import Home from "./pages/Home"; 
import Article from './pages/ArticlePage';


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/article/:article_id" element={<Article />}></Route>
    </Routes>
    </>
  )
}

export default App
