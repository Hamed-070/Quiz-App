import './App.css';
import { Routes , Route } from 'react-router-dom';
import Home from './components/Home';
import QuizPage from './components/QuizPage';
import Result from './components/Result';

function App() {
  return (
    <div> 

        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/quizpage' element={<QuizPage />}/>
          <Route path='/result' element={<Result />}/>
        </Routes>

    </div>
  );
}

export default App;
