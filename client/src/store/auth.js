import { createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        getUser:(state)=>{
            state.user = {name: 'ishini'};
            state.isAuthenticated = true;
        }
    }

});

export const {getUser} = authSlice.actions;
export default authSlice.reducer;