import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

function TrackHabit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);

  useEffect(() => {
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    const current = habits.find((h) => String(h.id) === id);
    if (current) setHabit(current);
  }, [id]);

  const today = dayjs().format("YYYY-MM-DD");

  const handleMarkComplete = () => {
    if (!habit.completedDays.includes(today)) {
      const updated = {
        ...habit,
        completedDays: [...habit.completedDays, today],
      };
      const allHabits = JSON.parse(localStorage.getItem("habits")) || [];
      const updatedAll = allHabits.map((h) =>
        h.id === habit.id ? updated : h
      );

      localStorage.setItem("habits", JSON.stringify(updatedAll));
      setHabit(updated);
    }
  };
  const handleRestart = () => {
    const updated = {
      ...habit,
      completedDays: [],
    };
    const allHabits = JSON.parse(localStorage.getItem("habits")) || [];
    const updatedAll = allHabits.map((h) => (h.id === habit.id ? updated : h));

    localStorage.setItem("habits", JSON.stringify(updatedAll));
    setHabit(updated);
  };

  if (!habit) return <p>Loding habit...</p>;

  const daysRemaining = 21 - habit.completedDays.length;
  return (
    <div className="track-wrapper">
      <h2>{habit.name}</h2>
      <p>{daysRemaining} days remaining</p>

      <div className="days-grid">
        {[...Array(21)].map((_, i) => {
          const day = dayjs(habit.startDate).add(i, "day").format("YYYY-MM-DD");
          const isCompleted = habit.completedDays.includes(day);
          return (
            <div
              key={i}
              className={`day-circle ${isCompleted ? "completed" : ""}`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>

      <div className="habit-actions">
        <button className="mark-done" onClick={handleMarkComplete}>
          ✔️ Mark as Completed{" "}
        </button>
        <button className="restart" onClick={handleRestart}>
          🔄 Restart Challenge
        </button>
      </div>
    </div>
  );
}

export default TrackHabit;
