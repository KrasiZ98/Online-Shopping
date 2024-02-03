import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/home-page/Home';
import { Navigation } from './components/navigation/Navigation';
import { Details } from './components/details-page/Details';
import { FilterProducts } from './components/filter-products/FilterProducts';
import { Login } from './components/login-page/Login';
import { Profile } from './components/profile-page/Profile';
import { Favorite } from './components/favorite-products/Favorite';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/filter-products' element={<FilterProducts />} />
        <Route path='/favorite-products' element={<Favorite />} />
      </Routes>
    </div>
  );
}

export default App;
