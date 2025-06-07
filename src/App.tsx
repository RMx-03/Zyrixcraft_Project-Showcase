import Navbar from './components/Navbar';
import ProjectsScroller from './components/ProjectsScroller';
import './index.css';

function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <ProjectsScroller />
    </div>
  );
}

export default App;
