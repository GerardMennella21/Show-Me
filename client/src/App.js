import React from 'react';
import './App.css';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
// import Home from './pages/Home'

// Apollo/Routes
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const httpLink = createHttpLink({
  uri: '/graphql'
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <main>
            <Routes>
              {/* <Route
                path="/"
                element={<Home />}
              /> */}
              <Route
                path="/login"
                element={<Login />}
                
              />
              <Route
                path="/signup"
                element={<Signup />}
              />

            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>    
  );
}

export default App;
