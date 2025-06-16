import { BrowserRouter, Route, Routes } from 'react-router';

import Home from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
