import { useEffect, useContext } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { AppContext } from '../App';

function Home() {
  const { workouts, workoutDispatch } = useContext(AppContext);

  // loading workout data when page is first loading
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const json = await response.json();

      if (response.ok) {
        workoutDispatch({ type: 'SET_WORKOUT', payload: json });
      }
    };

    fetchWorkouts();
  }, [workoutDispatch]);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
