import './App.css';
import Login from './views/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Help from './views/Help';
import Admin from './views/Admin';
import Chat from './views/Chat';
import Topic from './views/Topic';

function App() {
  console.log(process.env.REACT_APP_API)
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path="help" element={<Help />} />
              <Route path="admin" element={<Admin />} />
              <Route path="chat" element={<Chat isAdmin={true} />} />
              <Route path="topic" element={<Topic />} />
              <Route path="topic/chat" element={<Chat isAdmin={false} />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
