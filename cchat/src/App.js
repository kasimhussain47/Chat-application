import './App.css';
import Join from "./components/Join/Join";
import { BrowserRouter as Router ,Routes ,Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";



function App() {
 


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Join/>}/>
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


// tari tooooo