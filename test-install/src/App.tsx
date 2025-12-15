import { useState } from 'react';
import 'react-timeline-scheduler/dist/react-timeline-scheduler.css'; 
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Examples } from './pages/Examples';
import { Docs } from './pages/Docs';

type Page = 'home' | 'examples' | 'docs';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
       {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
       {currentPage === 'examples' && <Examples />}
       {currentPage === 'docs' && <Docs />}
    </Layout>
  );
}

export default App;
