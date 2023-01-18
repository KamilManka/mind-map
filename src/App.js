import './styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from './components/homepage/Homepage';
import { Main } from './components/Main';
import { Header } from './components/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import Account from './components/Account';
import { Login } from './containers/Login';
import { UserContext, UserProvider, isLoggedIn } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Auth from './Auth';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { QueryClient, ReactQueryDevtools, QueryClientProvider } from 'react-query';
import Spotify from './components/Spotify';
import Udemy from './components/Udemy';
import Overview from './components/dashboard/Overview';
import EditAccount from './components/EditAccount';
import { ViewAccountDetails } from './components/ViewAccountDetails';
import { YouTube } from '@mui/icons-material';

const redirect_uri = 'http://localhost:3000/spotify'; // Your redirect uri

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

//TODO: suspense i lazy loading
function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    // <div className="container" style={{ padding: '50px 0 100px 0' }}>
    //   {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    // </div>
    <div className="App">
      {/* <QueryClientProvider client={queryClient}> */}
      <script src="https://apis.google.com/js/api.js"></script>
      <NotificationProvider>
        <UserProvider>
          <BrowserRouter>
            <Header />
            <Main>
              <Routes>
                <Route path="">
                  <Route index element={<Homepage />} />
                  <Route path="login" element={<Login />} />
                  <Route path="auth" element={<Auth />} />
                  <Route path="dashboard" element={<Dashboard />}>
                    <Route path=":tab" component={<Overview />} />
                    {/* <Route path="spotify" component={<Spotify />} />
                    <Route path="udemy" component={<Udemy />} /> */}
                  </Route>
                  <Route path="account">
                    <Route index element={<ViewAccountDetails />} />
                    <Route path="edit" element={<EditAccount />} />
                  </Route>
                  <Route path="spotify" element={<Spotify />} />
                  <Route path="udemy" element={<Udemy />} />
                  <Route path="youtube" element={<YouTube />} />
                </Route>
              </Routes>
            </Main>
          </BrowserRouter>
        </UserProvider>
      </NotificationProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

      {/* </QueryClientProvider> */}
    </div>
  );
}

export default App;
