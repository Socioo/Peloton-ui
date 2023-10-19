import Authenticated from './pages/Authenticated'
import Login from './pages/Login'
import { getLocalAccessToken } from './utils/helper';

import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import 'antd/dist/antd.min.css';
import { useEffect, useState } from 'react';
import AuthContext from './context/AuthContext';

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access_token = getLocalAccessToken();
    if (access_token !== user.access_token) {
      setUser(c => ({ ...c, access_token }));
    }
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  if (loading) return <div>Loading...</div>

  return <>
    <AuthContext.Provider value={{
      user,
      setUser
    }}>
        <div>
          <Routes>
            {
              user.access_token ? (
                <Route
                  path='*'
                  element={<Authenticated />}
                />
              ) : (
                <>
                  <Route
                    path="/login"
                    exact
                    element={<Login />}
                  />
                  <Route
                    path="*"
                    element={<Navigate to="/login" />}
                  />
                </>
              )
            }
          </Routes>
        </div>
    </AuthContext.Provider>
  </>;
}

export default App;
