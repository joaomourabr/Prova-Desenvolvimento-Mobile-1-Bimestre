# Gerenciador Dinâmico de Listas em React Native

Este projeto é uma aplicação em React Native que demonstra o gerenciamento dinâmico de listas com funcionalidades de filtragem, ordenação e manipulação de itens entre múltiplas listas. A interface é simples e intuitiva, utilizando componentes do React Native.

## Funcionalidades

- **Listas Dinâmicas:** Gerencie três listas com a capacidade de mover itens entre elas.
- **Filtragem de Itens:** Filtre itens na "Lista 1" utilizando um campo de texto.
- **Ordenação:** Ordene as listas em ordem crescente ou decrescente com base no título dos itens.
- **Contador de Cliques:** Acompanhe e exiba o número de cliques em cada item.
- **Adicionar Novos Itens:** Adicione itens únicos à "Lista 1" através de um campo de entrada.
- **Lógica de Movimentação de Itens:** 
  - Mova itens da "Lista 1" para a "Lista 2" ao clicar.
  - Mova itens da "Lista 2" para a "Lista 3" com base no número de cliques ou interação.
- **Interface Limpa:** Layout organizado com componentes reutilizáveis.

## Componentes

- **`ItemComponent`**: Renderiza itens individuais, exibindo detalhes e o contador de cliques.
- **`ListComponent`**: Exibe uma lista utilizando `FlatList` para melhor desempenho.
- **`MapListComponent`**: Renderiza uma lista utilizando `map` para maior flexibilidade.
- **`InputField`**: Lida com entrada de texto para filtrar e adicionar novos itens.
- **`SortButton`**: Oferece funcionalidade de ordenação para as listas.
