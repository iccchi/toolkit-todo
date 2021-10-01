import React from 'react'
import styles from "./TaskForm.module.scss"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import {createTask, handleModalOpen, selectSelectedTask, editTask} from "../taskSlice";
import {useDispatch, useSelector} from "react-redux"

type Inputs = {
  taskTitle: string;
}

type PropTypes = {
  edit? :boolean;
}

const TaskForm: React.FC<PropTypes> = ({edit}) => {
  const dispatch = useDispatch()
  const selectdTask = useSelector(selectSelectedTask)
  const { register, handleSubmit, reset} = useForm()
  const handleCreate = (data: Inputs) => {
    dispatch(createTask(data.taskTitle))
    reset()
  }
  const handleEdit=(data: Inputs)=>{
    const sendData = {...selectdTask, title: data.taskTitle}
    dispatch(editTask(sendData))
    dispatch(handleModalOpen(false))
  }
  return (
    <div className={styles.root}>
      <Box
        onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
        className={styles.form}
        component="form"
      >
        <TextField
          id="outlined-basic"
          label={edit ? "Edit Task" : "New Task"}
          variant="outlined"
          defaultValue={edit ? selectdTask.title: ""}
          className={styles.text_field}
          {...register("taskTitle", {
            required: true
          })}
        />
        {edit ? (
          <div className={styles.button_wrapper}> 
            <button type="submit" className={styles.submit_button}>Submit</button>
            <button type="button" className={styles.cancel_button} onClick={()=>dispatch(handleModalOpen(false))}>Cancel</button>
          </div>
        ):null}
      </Box>
    </div>
  )
}

export default TaskForm
