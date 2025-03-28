import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface FetchAddCountProps {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const fetchAddCount = createAsyncThunk<FetchAddCountProps, number>(
  'counter/fetchAddCount',
  // args：调用fetchAddCount时传入的参数；store：store对象 [!code ++]
  async (args, store) => {
    console.log(`args:${args}`, store)
    const random = Math.floor(Math.random() * (9 + 1 - 3)) + 3

    // 方法1 在
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${random}`,
    )
    const data: FetchAddCountProps = await response.json()
    return data

    // 方法2 直接调用store.dispatch
    // try {
    //   const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/todos/${random}`,
    //   );
    //   const data: FetchAddCountProps = await response.json();
    //   store.dispatch(add(data.id));
    // } catch (e) {
    //   console.log(e);
    // }
  },
)

const counterSlice = createSlice({
  name: 'counter',
  initialState: 99,
  reducers: {
    add(state, action) {
      return state + action.payload
    },
    subtract(state, action) {
      return state - action.payload
    },
  },

  // 方法1
  extraReducers: (builder) => {
    builder.addCase(fetchAddCount.fulfilled, (state, { payload, meta }) => {
      console.log('fetchAddCount.fulfilled', state, meta) // meta.arg === fetchAddCount的args
      return state + payload.id
    })
  },
  // extraReducers也有另一种写法（计算属性名）
})

export const { add, subtract } = counterSlice.actions
export default counterSlice.reducer
