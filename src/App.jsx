
import Login from './Views/Login/Login';
import Register from './Views/Register/Register';
import Todo from './Views/Todo/Todo';
import Footer from './Components/Footer/Footer';
import NotFound from './Views/NotFound/NotFound';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux/store';
import { Provider } from 'react-redux';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';

library.add(fab)

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>      
          <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />          
            <Route path="/registro" element={<Register />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>        
          <Footer />
        </BrowserRouter>
      </Provider>
      
    </div>
  )
}

export default App
