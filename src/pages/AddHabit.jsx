import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

function AddHabit() {
  const [habitName, setHabitName] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitName) return;

    const newHabit = {
      id: Date.now(),
      name: habitName,
      startDate: startDate.toISOString(),
      completedDays: [],
    };

    const existing = JSON.parse(localStorage.getItem("habits")) || [];
    existing.push(newHabit);
    localStorage.setItem("habits", JSON.stringify(existing));

    navigate("/all");
  };

  return (
    <div className="add-habit-wrapper">
      <div className="add-habit-container">
        <h2>Start a new Habit</h2>
        <form onSubmit={handleSubmit} className="add-habit-form">
          <TextField
            label="Habit Name"
            variant="outlined"
            fullWidth
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="start Date"
              value={startDate}
              onChange={(newDate) => setStartDate(newDate)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>

          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 3, backgroundColor: "#facca7", color: "white" }}
          >
            Start Challenge
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddHabit;
