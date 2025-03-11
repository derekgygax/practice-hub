import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly",
  completedDates: string[],
  createdAt: string;
}

interface HabitState {
  habits: Habit[],
  isLoading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null
};

// Keep this separate
// It could go in extraReducers but prob just shouldn't ... it looks worse
export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockHabits: Habit[] = [
    {
      id: "1",
      name: "Read",
      frequency: "daily",
      completedDates: [],
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      name: "Exercise",
      frequency: "daily",
      completedDates: [],
      createdAt: new Date().toISOString()
    }
  ];
  return mockHabits;
});

const habitSlice = createSlice({
  name: "habits",
  initialState: initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString()
      };
      // state came in here as a copy so you can
      // just do it like this but it does make me
      // feel VERY nervous
      state.habits.push(newHabit);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      // Again I don't like how it looks like you are
      // mutating everything ...
      const habit = state.habits.find((habit: Habit) => {
        return habit.id === action.payload.id
      });
      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
    removeHabit: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      state.habits = state.habits.filter((habit: Habit) => {
        return habit.id !== action.payload.id
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch habits";
      })
  }
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;