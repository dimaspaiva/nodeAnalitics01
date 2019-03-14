/*/
 *   Ler um arquivo csv e realizar alguns calculos estátistico
 *   Dimas Paiva - Muzambinho - 27/028/2019 início
/*/

/*/
 *   Calcular o desvio padrão das colunas salário, cargo e lucratividade
 *  Código não genérico, mas bem flexívo conforme a demanda
/*/

/*/ Módulo de leitura de arquivos nativo do nodejs/*/
const fs = require("fs");

lerCsv = link => {
  /*/
   *   Retorna a tabela separada em arrays de arrays, semelhante a 
   *  matrizes
  /*/
  const data = fs.readFileSync(link, { encoding: "utf-8" }).split("\r\n");

  const itens = [];

  for (i in data) {
    itens.push(data[i].split(","));
  }
  return itens;
};

lerColuna = (dados, col) => {
  /*/
   *   Retorna a coluna transformada em float
   *  em caso de coluna inexistente já quebra o fluxo
  /*/

  const i = dados[0].indexOf(col);
  if (i === -1) {
    return console.log("Coluna informada inexistente");
  }

  const coluna = [];
  for (j in dados) {
    if (j > "0" && !isNaN(parseFloat(dados[j][i]))) {
      coluna.push(parseFloat(dados[j][i]));
    }
  }
  return { valores: coluna, index: i };
};

desvioPadrao = col => {
  /*/
   *   Calcula o desvio padrão da coluna
   *  S = √E(x-m)²/n-1
  /*/

  /*/ Realiza a soma de todos os valores da coluna /*/

  const soma = col.reduce((next, item) => {
    return item + next;
  });

  /*/ Calcula a média, simples, dos valores /*/
  const media = soma / col.length;

  /*/  
   *   Regra do somatório, adicionando o 0 como valor inicial,
   *  garantindo o funcionamento correto da função reduce
  /*/

  const somatorio = col.reduce((next, item) => (item - media) ** 2 + next, 0);

  return { desvio: Math.sqrt(somatorio / (col.length - 1)), media, soma };
};

scoreZ = (item, media, desvio) => {
  /*/
   *   Calcula o score-z
   *  Z = (x - μ) / σ
   *  σ -> desvio padrão
   *  μ -> média aritmética
  /*/
  return (item - media) / desvio;
};

allScoreZ = async (coluna, dados) => {
  const { valores } = await lerColuna(dados, coluna);
  const { desvio, media } = desvioPadrao(valores);
  const zScore = [];
  const newCol = [];

  /*/ Cria uma array com os valores calculados na formula do score-Z /*/
  for (i in valores) {
    /*/ Arredonda os valores par 4 casas decimais /*/
    zScore.push(Math.round(scoreZ(valores[i], media, desvio) * 10000) / 10000);
  }

  for (i in dados) {
    if (i === "0") {
      newCol.push(`Z-${coluna}`);
    } else if (dados.length - 1 !== parseInt(i)) {
      newCol.push(zScore[parseInt(i) - 1]);
    }
  }
  return newCol;
};

// allScoreZ("lucratividade", dados);
async function main() {
  const dados = lerCsv("./base.csv");
  const result = [];

  const colCarga = await allScoreZ("carga", dados);
  const colSalario = await allScoreZ("salario", dados);
  const colPratos = await allScoreZ("pratos", dados);

  for (i in colCarga) {
    /*/
     *   Concatena os itens em linhas que farão a composição da planilha
     *  Caso tenha a necessidade, para salvar em csv, basta substituir o
     *  \n por vírgulas e a extensão do arquivo
    /*/
    result.push(
      colCarga[i] + "\t" + colSalario[i] + "\t" + colPratos[i] + "\n"
    );
  }

  console.log(result);
  fs.writeFileSync("./result.xls", result.join(""));
}

main();
