import React from 'react'
import styles from "./App.module.scss"
import Header from './components/header/Header'
import TaskForm from './features/task/TaskForm/TaskForm'
import TaskList from './features/task/TaskList/TaskList'
const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header />
        <TaskForm />
        <TaskList />
      </div>
    </div>
  )
}

export default App
