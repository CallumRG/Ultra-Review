// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../Landing';
import SearchPage from '../Search';
import ReviewPage from '../Review';
import MyPage from '../MyPage';

const App = () => {
  return (
    // Set up the Router to enable client-side routing
    <Router>
      {/* Define the routes using the Routes component */}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;