import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HackedPage from './components/hacked';
import PreventionGuide from './components/prevention';
import ControlPanel from './components/control-panel';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HackedPage />} />
      <Route path="/guide" element={<PreventionGuide />} />
      <Route path="/control" element={<ControlPanel />} />
    </Routes>
  </BrowserRouter>
);

export default App;