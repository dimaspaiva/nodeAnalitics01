# nodeAnalitics01

Reading a CSV file and generating some statistical informations from a small database

## Objetivos

Receber uma matriz de dados e calcular o Z-score das colunas passadas dentro do código.

### Z-Score

Essa variável, surge através de uma equação estatística que nos permite olhar para a variável de modo mais limpo, normalizando a relevância, deixandao todas num mesmo patamar, o que nos garante uma escolha mais certeira daquelas que mais impactam no caso estudado.

## Executar

Para o funcionamento deste código você deve possuir uma tabela no formato .csv com dados normalizados,
não usar ponto para marcação de números maiores de mil, usar ponto para separar casas decimais.

**Instalar pacotes**

```javascript
yarn || npm install
```

**Rodar**

```javascript
node .
```

Como o arquivo principal é o index.js, pode se rodar apenas node . que ele executará o arquivo padrão

## Escalabilidade

O código não está 100% escalável, faltam ajustes de resolução de tipos de variáveis, como variáveis com vírgulas ao invés de pontos, ou então casa do milhar dividida por ponto.
Fora isso o único ponto não escalável são as arrays que armazenam os valores das tabelas, que pode ser facilmente substituida por uma matriz e o problema é solucionado.

## Passos futuros

Resolver a questão de escalabilidade e buscar métodos de melhorias para a leitura de outros tipos de variáveis no ato de ler o arquivo, ou passando especificações, algo semelhante a função do Excel.
