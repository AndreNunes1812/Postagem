const initialCreatePost = []

export default function categorias(state = initialCreatePost , action  ) {
    switch (action.type) {
        case 'ADD_TODO':
            return [ ...state ,  { 
                id: Math.random(), 
                text: action.text,
            }]   
        case 'SET_CATEGORIAS':
            return action.categorias;
        default:
            return state;
    }
}