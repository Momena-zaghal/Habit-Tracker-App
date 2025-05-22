import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HabitCalender from "../components/HabitCalender";
import dayjs from "dayjs";

function Home() {
  const [selectedDate, setselectedDate] = useState(dayjs());
  const navigate = useNavigate();
  const [AllHabits, setAllHabits] = useState([]);

  const [currentHabit, setcurrentHabit] = useState(null);

  useEffect(() => {
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    setAllHabits(habits);
    if (habits.length > 0) {
      setcurrentHabit(habits[0]);
    }
  }, []);

  const handleStartClick = () => {
    navigate("/add");
  };
  const handleViewAllClick = () => {
    navigate("/all");
  };

  const handleMarkComplete = (habitId) => {
    const today = dayjs().format("YYYY-MM-DD");
    const updatedHabits = AllHabits.map((habit) => {
      if (habit.id === habitId) {
        if (!habit.completedDays.includes(today)) {
          return {
            ...habit,
            completedDays: [...habit.completedDays, today],
          };
        }
      }
      return habit;
    });
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setAllHabits(updatedHabits);
    const updated = updatedHabits.find((h) => h.id === habitId);
    setcurrentHabit(updated);
  };
  const handleRestart = (habitId) => {
    const updatedHabits = AllHabits.map((habit) => {
      if (habit.id === habitId) {
        return {
          ...habit,
          completedDays: [],
          startDate: dayjs().format("YYYY-MM-DD"),
        };
      }
      return habit;
    });
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setAllHabits(updatedHabits);
    setcurrentHabit(updatedHabits.find((h) => h.id === habitId));
  };
  return (
    <div className="home-container">
      <h1>✨ 21-Day Habit Challenge ✨</h1>

      <button onClick={handleStartClick} className="start-button">
        Start a New Habit
      </button>
      <button onClick={handleViewAllClick} className="view-all-button">
        View All Habits
      </button>

      {currentHabit && (
        <div className="current-habit-box">
          <h2>📌 {currentHabit.name}</h2>
          <p>
            {" "}
            Day {dayjs().diff(dayjs(currentHabit.startDate), "day") + 1} of 21
          </p>

          <HabitCalender
            selectedDate={selectedDate}
            setSelectedDate={setselectedDate}
            completedDays={currentHabit.completedDays}
          />

          <div className="habit-actions">
            <button
              className="mark-done"
              onClick={() => handleMarkComplete(currentHabit.id)}
            >
              ✔️ Mark as Completed
            </button>
            <button
              className="restart"
              onClick={() => handleRestart(currentHabit.id)}
            >
              🔄 Restart Challenge
            </button>
          </div>
        </div>
      )}
      {!currentHabit && (
        <p>No habits yet. Click "Start a New Habit" to begin!</p>
      )}
    </div>
  );
}

export default Home;
