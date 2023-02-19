import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Home } from "./features/Home/Home";
import { Header } from "./features/Header/Header";
import { Post } from "./features/Post/Post";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post/:postId' element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
