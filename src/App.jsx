import './App.css'
import { Route, Routes } from "react-router";

import Home from './pages/Home'; 
import ArticlePage from './pages/ArticlePage'
import SignInPage from './pages/SignInPage';
import { AccountProvider } from './context/Account';

function App() {
  return (
    <AccountProvider>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/article/:article_id" element={<ArticlePage />}></Route>
      <Route path="/login" element={<SignInPage />}></Route>
    </Routes>
    </AccountProvider>
  )
}

export default App
