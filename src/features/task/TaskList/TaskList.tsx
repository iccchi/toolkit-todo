import React from 'react'
import TaskItem from '../TaskItem/TaskItem'
import styles from "./TaskList.module.scss"
import { useSelector } from 'react-redux'
import { selectTasks } from '../taskSlice'

const TaskList: React.FC = () => {
  const tasks = useSelector(selectTasks)
  const tasklists = tasks.tasks
  return (
    <div className={styles.root}>
      {tasklists.map((task)=>{
        return <TaskItem key={task.id} task={task} />
      })}
    </div>
  )
}

export default TaskList
