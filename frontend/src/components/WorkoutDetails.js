import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { formatDistanceToNow } from 'date-fns';

function WorkoutDetails({ workout }) {
  const { workouts, workoutDispatch } = useContext(AppContext);

  const handleDelete = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
    });

    const json = await response.json();

    if (response.ok) {
      workoutDispatch({ type: 'DELETE_WORKOUT', payload: json });
    }

    if (!response.ok) {
      console.log(json.error);
    }
  };

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps (kg): </strong>
        {workout.reps}
      </p>
      <p className='date'>
        <strong>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </strong>
      </p>
      <span className='material-symbols-outlined' onClick={handleDelete}>
        Delete
      </span>
    </div>
  );
}

export default WorkoutDetails;
