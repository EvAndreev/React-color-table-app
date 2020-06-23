import { createStore } from 'redux'

// initial state when element is render
const initialState = {
    // color === type color rgba
    items: [
        {id: '1', name: 'Olive', type: 'RGB', color: 'rgb(184, 169, 2)', colorHex: '#b8a902', key: 'RGB'},
        {id: '2', name: 'Orange', type: 'HEX', color: '#ff9500', colorHex: '#ff9500', key: 'HEX'},
        {id: '3', name: 'Cherry', type: 'HEX', color: '#942222', colorHex: '#942222', key: 'HEX'},
        {id: '4', name: 'Mint', type: 'sRGB', color: 'rgba(55, 155, 0, 0.5)', colorHex: '#379b00', key: 'sRGB'}
    ],
    selectedItem: null
}

const colorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COLOR': {
            const newItems = [...state.items];
            const {r, g, b, a} = action.payload.color;
            newItems.push({
                name: action.payload.name,
                type: action.payload.type,
                color: `rgba(${r}, ${g}, ${b}, ${a})`,
                colorHex: action.payload.colorHex,
                id: newItems.length+1
            });
            return {
                ...state,
                items: newItems
            }
        }
        case 'EDIT_COLOR': {
            const newItems = [...state.items];
            let item = newItems.find((item) => item.id === action.payload.id);
            const {r, g, b, a} = action.payload.color;
            item.name = action.payload.name;
            item.type = action.payload.type;
            item.color = `rgba(${r}, ${g}, ${b}, ${a})`;
            item.colorHex = action.payload.colorHex;
            return {
                ...state,
                items: newItems
            }
        }
        case 'DELETE_COLOR': {
            const newItems = [...state.items];
            const index = newItems.findIndex((item) => item.id === action.payload.id);
            // findIndex method return -1 (false) if index is not finded
            if (index !== -1) {
                // splice array (with which, how much)
                newItems.splice(index, 1);
            }
            return {
                ...state,
                items: newItems
            }
        }
        default: return state;
    }
}

export const store = createStore(colorsReducer)