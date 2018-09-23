# Projeto Leitura

Este projeto atende ao segundo modulo do **Programa Nanodegree - Desenvolvimento React** da Udacity.

## Objetivo

O sistema consiste em gerenciar postagem / comentarios, os usuarios podem criar novas postagens bem como comentar suas postagens.

## Especificação do projeto:

#### Configuração do Projeto
A aplicação foi criada com o create-react-app, após a aplicação criada, entrar dentro do projeto e digitar o comando npm install para instalar todas as dependencia necessarias e após digitar npm start para que a aplicação seja iniciada (ou com yarn).<br />
O arquivo README descreve todas as funcionalidades do projeto.

####  Página principal 
A página principal esta dividida em três areas, sendo a exibição das postagens, controle de exibição das categorias
e a ordenação por data / score.
Ainda é possível criar novas postagens, após a criação das postagens você poderar criar comentarios para as postagens criadas

#### Página de Postagem - Formulário basico de cadastro contendo as seguintes informações

1)Título do Post<br />
2)Comentário<br />
3)Autor<br />
4)Categoria<br />

####  Página de Comentários - Formulário basico de cadastro contendo as seguintes informações

1)Comentário<br />
2)Autor

#### Página de Postagem / Comentários

Pode-se criar quantas postagens necessárias bem como avaliar positivamente ou negativamente cada postagem / comentario.<br />
Pode-se excluir os comentarios das postagens e excluir as postagens.

### Funcionalidade do código
#### O código do projeto lida com o gerenciamento de estado de forma adequada?
O estado componente é passado dos componentes pais para os filhos. A variável de estado não é modificada diretamente - a função setState() é usada de forma correta.

Os livros possuem o mesmo estado tanto na página de busca como na página principal da aplicação: se um livro está na estante, isso é refletido nos dois locais.

#### O JSX é formatado de maneira adequada?
Todos os códigos JSX são formatados de maneira adequada e funcional.


#### Lembrete:

Foi disponibilizado um modelo do projeto contendo informações basicas de layout e css, **Não** informando nenhuma aplicabilidade sobre "REACT".

* Para a instalação das dependencia do projeto é necessario está dentro da pasta do projeto e      digitar `npm install`

* Para executar a aplicação: `npm start`

## O Projeto MyReads oferece a seguinte estrutura:
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── ListBooks.js # Class showing the books on the shelf
    ├── SearchBooks # Class that manages book searches directly from the API (BooksAPI)
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Uma boa pratica é documentar todo(s) arquivo(s) criado(s) dentro da estrutura informada acima.

## Recursos Utilizados:
### Expressões regulares:
São padrões utilizados para selecionar combinações de caracteres em uma string. Em JavaScript, expressões regulares também são objetos.<br />
Elas podem ser utilizadas com os métodos exec e test do objeto RegExp, e com os métodos match, replace, search, e split do objeto String. Este capítulo descreve o uso de expressões regulares em JavaScript.[`clique aqui`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions)

### Debounce:
O Debounce, assim como o throttle, limita a quantidade de vezes que um determinado trecho de código é executado em relação ao tempo. Mas diferentemente do throttle — que assegura que aconteçam no máximo 1 execução a cada X milisegundos —, o debounce irá postergar a execução do código caso ele seja invocado novamente em menos de X segundos.
[`clique aqui`](https://www.npmjs.com/package/debounce)

## Pesquisa de Livro(s)

Para simplificar o desenvolvimento da pesquisa foi fornecida uma API **BOOKSAPI** para integrar ao projeto, conforme descrito abaixo em *inglês*.

We've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Importante

A API de back-end usa um conjunto fixo de resultados de pesquisa em cache e é limitada a um conjunto específico de termos de pesquisa, que podem ser encontrados em SEARCH_TERMS.md. Essa lista de termos são os únicos termos que funcionarão com o back-end, por isso não se surpreenda se suas pesquisas por Basket Weaving ou Bubble Wrap não retornarem nenhum resultado.

## Create React App

Este projeto foi inicializado com o [Create React App](https://github.com/facebookincubator/create-react-app). Você pode encontrar mais informações sobre como executar tarefas comuns [aqui](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contribuição

Esté repositório é para atender os alunos da Udacity
para maiores detalhes, clique aqui [CONTRIBUTING.md](CONTRIBUTING.md).


