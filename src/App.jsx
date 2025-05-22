import './App.css'
import { Route, Routes } from "react-router";
import { AccountProvider } from './context/Account';

import Home from './pages/Home'; 
import ArticlePage from './pages/ArticlePage'
import SignInPage from './pages/SignInPage';
import Header from './components/Header';


function App() {
  return (
    <AccountProvider>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/article/:article_id" element={<ArticlePage />}/>
      <Route path="/login" element={<SignInPage />}/>
      <Route path="*" element={<>
          <Header />
          <p>404: Page not found </p>
          <p>Sorry, we couldn't find that page</p>
        </>}/>
    </Routes>
    </AccountProvider>
  )
}

export default App
