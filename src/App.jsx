import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddHabit from "./pages/AddHabit";
import TrackHabit from "./pages/TrackHabit";
import AllHabits from "./pages/AllHabits";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddHabit />} />
        <Route path="/track/:id" element={<TrackHabit />} />
        <Route path="/all" element={<AllHabits />} />
      </Routes>
    </Router>
  );
}

export default App;
