import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import Flex from "react-calendar/src/Flex.js";
import dayjs from "dayjs";

function HabitCalender({ selectedDate, setSelectedDate, completedDays }) {
  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const dateStr = day.format("YYYY-MM-DD");
    const isCompleted = completedDays.includes(dateStr);

    return (
      <PickersDay
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        {...other}
        sx={{
          backgroundColor: isCompleted ? "#4caf50" : undefined,
          color: isCompleted ? "#fff" : undefined,
          "&:hover": {
            backgroundColor: isCompleted ? "#388e3c" : undefined,
          },
        }}
      />
    );
  };
  return (
    <div style={{ display: "Flex", justifyContent: "center" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          slots={{ day: CustomDay }}
        />
      </LocalizationProvider>
    </div>
  );
}

export default HabitCalender;
