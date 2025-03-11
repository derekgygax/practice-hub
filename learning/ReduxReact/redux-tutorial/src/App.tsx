import { Provider } from 'react-redux'
import './App.css'

// redux
import store from './store/store'
import { Container, Typography } from '@mui/material'
import { AddHabitForm } from './components/AddHabitForm'
import { HabitList } from './components/HabitList'
import { HabitStats } from './components/HabitStats'

function App() {

  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant='h2'
          align='center'
        >
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitList />
        <HabitStats />
      </Container>
    </Provider>
  )
}

export default App
