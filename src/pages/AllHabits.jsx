import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllHabit() {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = habits.filter((h) => h.id !== id);
    localStorage.setItem("habits", JSON.stringify(updated));
    setHabits(updated);
  };

  const handleClick = (habitId) => {
    navigate(`/track/${habitId}`);
  };

  return (
    <div className="all-habits-container">
      <h2>📋 All Habits</h2>
      <div className="habit-list-scroll">
        {habits.length === 0 ? (
          <p>No habits yet. Start one!</p>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className="habit-card"
              onClick={() => handleClick(habit.id)}
            >
              <span
                className="delete-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(habit.id);
                }}
              >
                ❌
              </span>
              <h3>{habit.name}</h3>
              <p>Started: {new Date(habit.startDate).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllHabit;
