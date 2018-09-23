# Projeto Leitura

Este projeto atende ao segundo modulo do **Programa Nanodegree - Desenvolvimento React** da Udacity.

## Objetivo

O sistema gerencia postagem / comentários, os usuarios podem criar novas postagens bem como comentar suas propias postagens.

## Especificação do projeto:

#### Configuração do Projeto
A aplicação foi criada com o create-react-app, após a aplicação criada entrar dentro do projeto gerado e digitar o comando npm install para instalar todas as dependência necessárias e após, digitar npm start para que a aplicação seja iniciada.<br />
O arquivo README descreve todas as funcionalidades do projeto.

####  Página principal 
A página principal foi dividida em três areas, sendo a exibição das postagens, controle de exibição das categorias e a ordenação das postagens por data / score.
Ainda é possível criar novas postagens, após a criação das postagens você poderar criar comentarios para as postagens criadas.

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
Pode-se excluir os comentários das postagens bem como excluir as postagens.<br />
Pode-se editar o conteúdo dos comentários

### Gerenciamento do estado
#### O estado do aplicativo é gerenciado pelo Redux?

A maioria dos estados do aplicativo são gerenciados pela Redux Store. Props state-based são mapeadas a partir da store e não armazenadas como um estado do componente.<br />

Inputs de formulário e componentes controlados podem ter algum estado controlado pelo componente.

#### O estado do aplicativo é atualizado corretamente?

As atualizações são desencadeadas pelo dispatch de action creators aos reducers.<br />

Os reducers e actions são escritos de maneira adequada e retornam corretamente o estado de atualização para a store.

### Funcionalidade do código
#### As postagens são listadas corretamente e possuem as funcionalidades desejadas de uma visualização em lista?
Postagens listadas são exibidas com os seguintes itens:<br />
1) Título<br />
2) Autor<br />
3) Número de comentários<br />
4) Pontuação atual<br />
5) Mecanismo de voto para votar post com positivo ou negativo<br />
6) Mecanismo para ordená-las por data ou pontuação (não obrigatório ter ambos)<br />

Os recursos de contador de comentários, edit/delete, e upvote/downvote são necessários nesta página para permitir que o usuário gerencie os posts sem navegar para outras páginas.<br />

O mecanismo de votos funciona e exibe corretamente a nova pontuação dos votos após um clique.<br />

As postagens em lista possuem um link que levam à página de detalhes daquela postagem.<br />

Todas as postagens estão listadas na raíz (/).<br />

Todas as postagens de uma categoria estão listadas em /:category<br />

As páginas de lista das postagens (raíz / e categoria /:category) incluem um mecanismo para ordená-las por data ou pontuação (não obrigatório ter ambos), e essa ordenação funciona corretamente.<br />

As páginas de lista de postagens incluem um botão para adicionar um novo post.<br />

Todas as categorias disponíveis são visíveis em qualquer página de lista de postagens.<br />

#### A página de detalhes da postagem possui a funcionalidade desejada?
Os detalhes da postagem estão disponíveis em /:category/:post_id<br />

A postagem é exibida com os seguintes itens:<br />
1) Título<br />
2) Corpo<br />
3) Autor<br />
4) Número de comentários<br />
5) Pontuação atual<br />
6) Mecanismo de voto para votar positiva ou negativamente o post<br />
7) Botões ou links para que o post possa ser editado ou removido.<br />

Comentários listados são exibidos com os seguintes itens:<br />
1) Autor<br />
2) Pontuação atual<br />
3) Mecanismo de voto para votar positiva ou negativamente o comentário<br />

O mecanismo de voto funciona e exibe corretamente a nova pontuação de votos ao clicar para votar na postagem e nos comentários.<br />

Todos os comentários de uma postagem são exibidos abaixo do corpo de texto da postagem.<br />

Um mecanismo para a adição de novos comentários está visível na página de detalhes e funciona.<br />

### Os usuários podem adicionar novas postagens?

O aplicativo possui um formulário para criação de novas postagens. Enviar o formulário adiciona corretamente a postagem à categoria correta.

### Os usuários podem adicionar comentários?

O aplicativo possui um formulário para adicionar comentários novos a uma postagem. Enviar o formulário corretamente adiciona um comentário à postagem em questão.

### Os usuários podem editar postagens/comentários?

Botões de edição de postagens/comentários abrem um formulário com os dados existentes já pré-preenchidos. O envio do formulário atualiza corretamente os dados do comentário/postagem.

### Os usuários podem remover postagens/comentários?

Existe um mecanismo para a remoção de postagens e comentários. Clicar no botão/link exclui corretamente a postagem/comentário da view de lista e faz com que não seja mais possível acessá-lo(a) pela URL. Quando o usuário vai para a URL de um post deletado, uma página 404 é exibida.

### O aplicativo é navegável?

O usuário é capaz de navegar entre as páginas de detalhes da postagem, página principal e categorias sem que seja preciso digitar seu endereço na barra de endereços.

#### Lembrete:

* Para a instalação das dependência do projeto é necessário está dentro da pasta do projeto e digitar `npm install`

* Para executar a aplicação: `npm start`

## O Projeto Leitura oferece a seguinte estrutura:
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
│   └── manifest.json # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.    
    ├── actions # Class showing the books on the shelf
    ├── pages # Class showing the books on the shelf
    ├── reducers # Class showing the books on the shelf
    ├── routes # Class showing the books on the shelf
    ├── store # Class showing the books on the shelf
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
    └── history.js # You should not need to modify this file. It is used for DOM     
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


