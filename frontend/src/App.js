import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, createContext, useReducer } from 'react';

// pages & components
import Home from './pages/Home';
import Narbar from './components/Narbar';

export const AppContext = createContext();

function workoutReducer(workouts, action) {
  switch (action.type) {
    case 'SET_WORKOUT':
      return action.payload;

    case 'ADD_WORKOUT':
      return [action.payload, ...workouts];

    case 'DELETE_WORKOUT':
      const filteredArray = workouts.filter(
        (workout) => workout._id !== action.payload._id
      );
      return filteredArray;

    default:
      return;
  }
}

function App() {
  const [workouts, workoutDispatch] = useReducer(workoutReducer, []);

  return (
    <AppContext.Provider value={{ workouts, workoutDispatch }}>
      <div className='App'>
        <BrowserRouter>
          <Narbar />
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
