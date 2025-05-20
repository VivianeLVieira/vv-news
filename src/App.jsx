import './App.css'
import { Route, Routes } from "react-router";

import Home from './pages/Home'; 
import ArticlePage from './pages/ArticlePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/article/:article_id" element={<ArticlePage />}></Route>
    </Routes>
  )
}

export default App
