import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        draggableElements: [],
        pinnedElements: [],
        },
    reducers: {
        addDragggableElement: (state, action) => {
            state.draggableElements.push(action.payload)
        },
        removeDraggableElement: (state, action) => {
            state.draggableElements = state.draggableElements.filter(element => element !== action.payload);
        },
        togglePinElement: (state, action) => {
            const index = state.pinnedElements.indexOf(action.payload);
            if (index >= 0) {
              state.pinnedElements.splice(index, 1); // Remove if it's already pinned
            } else {
              state.pinnedElements.push(action.payload); // Add to pinned if it's not
            }
          },
    }

})

export const {addDragggableElement, removeDraggableElement, togglePinElement} = appSlice.actions;

export default appSlice.reducer;