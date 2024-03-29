import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

interface TaskState {
  //タスクが何個あるか
  idCount: number;
  //storeに保存するタスクの一覧
  tasks: {id:number; title: string; completed: boolean}[]
  //taskのtitleを編集する際にどのtaskを選択されているか
  selectedTask: { id:number; title: string; completed: boolean}
  //Modalを開くか判定
  isModalOpen: boolean;
}

const initialState: TaskState= {
  idCount: 1,
  tasks: [{id: 1, title: "TaskA", completed: false}],
  selectedTask: {id: 0, title: "", completed: false},
  isModalOpen: false
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const taskSlice = createSlice({
  //action typeのprefex
  name: 'task',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //taskの作成
    createTask:(state, action) => {
      state.idCount++;
      const newTask = {
        id:state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    //Modalを開くか閉じるかのフラグ管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
    //どのタスクを選択しているか
    selectTask: (state, action)=>{
      state.selectedTask = action.payload
    },
    //タスクの編集
    editTask:(state, action) => {
      //state.tasksから指定したtaskを抜き出す
      const task = state.tasks.find((t)=>t.id===action.payload.id)
      if (task) {
        //抜き出したtaskのtitleを書き換える
        task.title = action.payload.title
      }
    },
    //タスク完了かどうか
    completeTask: (state, action) => {
      const task = state.tasks.find(t=>t.id===action.payload.id)
      if(task){
        //抜き出したタスクの反転
        task.completed = !task.completed
      }
    },
    //タスクの削除
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t=> t.id !== action.payload.id)
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  
});
//type: "task/createTaskが生成"
export const { createTask, handleModalOpen, selectTask, editTask, completeTask, deleteTask } = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTasks = (state: RootState):TaskState => state.task;
export const selectSelectedTask = (state: RootState):TaskState['selectedTask'] => state.task.selectedTask;
export const selectIsModalOpen = (state: RootState):TaskState['isModalOpen'] => state.task.isModalOpen



// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default taskSlice.reducer;
