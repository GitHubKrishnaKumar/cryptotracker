import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import CoinPage from './pages/Coin';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/coin/:id' element={<CoinPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
