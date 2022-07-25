import React from 'react';
import './App.css';
import Header from './components/Header';
import MediaList from './components/MediaList';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <MediaList />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
