export const SET_CATEGORIAS = 'SET_CATEGORIAS';

export function setCategorias(categorias) {
    return {
        type: SET_CATEGORIAS,
        categorias,
    }
}

export function fetchCategorias(headers) {

    return dispatch  => {
        fetch( 'http://localhost:3001/categories' , { headers })
        .then(res => res.json())
        .then(data => dispatch(setCategorias(data)));
    }
}
