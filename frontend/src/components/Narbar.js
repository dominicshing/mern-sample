import React from 'react';
import { Link } from 'react-router-dom';

function Narbar() {
  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>Workout Buddy</h1>
        </Link>
      </div>
    </header>
  );
}

export default Narbar;
