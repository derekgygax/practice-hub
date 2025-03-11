
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { useEffect } from "react";
import { fetchHabits, Habit } from "../store/habit-slice";
import { LinearProgress, Paper, Typography } from "@mui/material";

export const HabitStats = () => {
  const { habits, isLoading, error } = useSelector((state: RootState) => {
    return state.habits;
  });

  // Extremely important
  // Triggers the redux action
  const dispatch = useDispatch<AppDispatch>();

  const getNumberHabitsCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit: Habit) => {
      return habit.completedDates.includes(today)
    }).length;
  }

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

  const getLongestStreak = () => {
    // This gets the streak for all the habits and retuns the max, with min being 0
    return Math.max(...habits.map(getStreak), 0);
    // return Math.max(...habits.map((habit: Habit) => {
    //   return getStreak(habit);
    // }));
  }


  useEffect(() => {
    dispatch(fetchHabits())
  }, []);


  if (isLoading) {
    return (
      <LinearProgress />
    );
  }
  if (error) {
    return (
      <Typography color="error">{error}</Typography>
    )
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mt: 4
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
      >
        Habits Statistics
      </Typography>
      <Typography variant="body1">
        Total Habits: {habits.length}
      </Typography>
      <Typography variant="body1">
        Completed Today: {getNumberHabitsCompletedToday()}
      </Typography>
      <Typography variant="body1">
        Longest Streak: {getLongestStreak()}
      </Typography>
    </Paper>
  )
}
