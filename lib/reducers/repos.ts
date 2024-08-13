import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ReposiroryType } from '@/types/repo.type'

// Получение репов с помощью GiHub REST API
export const fetchRepositories = createAsyncThunk(
    'repos/fetchRepositories',
    async (searchInput: string, { dispatch, rejectWithValue }) => {
        try {
            const { items } = await fetch(`https://api.github.com/search/repositories?q=${searchInput}+in:name`).then(res => res.json())
            if (items.length < 1) throw new Error('Репозитории не найдены')
            dispatch(changeShownRepos(items.slice(0 * 8, (0 + 1) * 8)))
            return items
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

interface ReposState {
    error: string | null
    repos: ReposiroryType[]
    shownRepos: ReposiroryType[]
    choosenRepo: ReposiroryType | null,
    status: 'idle' | 'pending' | 'succeeded' | 'rejected'
}

const initialState: ReposState = {
    repos: [],
    shownRepos: [],
    choosenRepo: null,
    status: 'idle',
    error: null
}

const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        changeRepos(state, { payload }) {
            state.repos = payload
        },
        changeShownRepos(state, { payload }) {
            state.shownRepos = payload
        },
        changeChoosenRepo(state, { payload }) {
            state.choosenRepo = payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchRepositories.pending, (state, action) => {
                state.error = null
                state.status = 'pending'
            })
            .addCase(fetchRepositories.rejected, (state, action) => {
                state.error = action.payload as string || 'Unknown Error'
                state.status = 'rejected'
            })
            .addCase(fetchRepositories.fulfilled, (state, action) => {
                state.repos = [...action.payload]
                state.status = 'succeeded'
            })
    }
})

export const { changeRepos, changeShownRepos, changeChoosenRepo } = reposSlice.actions

export default reposSlice.reducer
