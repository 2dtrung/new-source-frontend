import { Navigate, Route, Routes } from 'react-router-dom';

import { Measures } from './Measures';

export const MeasuresRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Measures />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
