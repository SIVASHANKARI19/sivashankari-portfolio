import { ComputersCanvas } from './canvas';
import Hero from './Hero';
import Navbar from './Navbar';

// NOTE: About, Tech, Experience, Works, and Contact are intentionally NOT
// re-exported here. App.jsx lazy-loads them directly via React.lazy() for
// code-splitting; re-exporting them from this barrel would statically
// import them again and defeat that split. Import them directly from their
// own files (e.g. "./components/About") if needed elsewhere.

export {
  Hero,
  Navbar,
  ComputersCanvas,
}