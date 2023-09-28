import Layout from './components/layouts/defaultLayout';
import AdminPanel from './pages/AdminPanel';
import { VisitorsProvider } from './contexts/visitorsContext';
import './App.css';

function App() {
  return (
    <VisitorsProvider>
      <Layout>
        <AdminPanel />
      </Layout>
    </VisitorsProvider>
  );
}

export default App;
