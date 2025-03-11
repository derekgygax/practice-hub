
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";
import { Habit, toggleHabit, removeHabit } from "../store/habit-slice";
import { CheckCircle, Delete } from "@mui/icons-material";



export const HabitList = () => {

  const habits = useSelector((state: RootState) => {
    return state.habits.habits
  });

  // Extremely important
  // Triggers the redux action
  const dispatch = useDispatch<AppDispatch>();

  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    // so i think this goes through the days stepping back from current to previous
    // always increasing the streak. Until you don't see the date and then
    // it breaks away and returns the streak
    // Doing it this way it makes it so a streak can never be missed by a day
    // So the past doesn't ifluence the current
    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];

      if (habit.completedDates.includes(dateString)) {
        streak++;

        // reduce the day by 1 and check the previous day
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4
      }}
    >
      {habits.map((habit: Habit) => {
        return (
          <Paper
            key={habit.id}
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Box>
                <Typography component="h3" variant="h4">
                  {habit.name}
                </Typography>
                <Typography>
                  {habit.frequency}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1
                }}
              >
                <Button
                  variant="outlined"
                  color={
                    habit.completedDates.includes(today)
                      ? "success"
                      : "primary"
                  }
                  startIcon={<CheckCircle />}
                  onClick={() => {
                    dispatch(toggleHabit({
                      id: habit.id,
                      date: today
                    }))
                  }}
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => {
                    dispatch(removeHabit({
                      id: habit.id
                    }))
                  }}
                >
                  Remove
                </Button>
              </Box>
            </Box>
            <Box>
              <Typography>
                Current Streak: {getStreak(habit)} days
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(getStreak(habit) / 30) * 100}
                sx={{
                  mt: 1
                }}
              />
            </Box>
          </Paper>
        )
      })}
    </Box>
  )
}
