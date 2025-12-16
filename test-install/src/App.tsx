import 'react-timeline-scheduler/dist/react-timeline-scheduler.css'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Examples } from './pages/Examples';
import { Docs } from './pages/Docs';

function App() {
  return (
    <Layout>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
       </Routes>
    </Layout>
  );
}

export default App;
