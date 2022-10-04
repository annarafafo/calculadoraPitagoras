import { MouseEvent, useState } from "react";

let valores = new Map<string, number>(); //objeto do tipo Map onde guardaremos os valores para calculo

export function Calculadora() {
  let [visor, setVisor] = useState({ side: "Lado", num: "0" }); //estado do React que define o que será exibido em tela

  function enter(e: MouseEvent<HTMLButtonElement>) {
    //essa função é o que acontecerá quando o usuário apertar o botão "Enter"
    e.preventDefault();
    const sides = ["A", "B", "C"];
    if (sides.indexOf(visor.side) != -1) {
      valores.set(visor.side, parseFloat(visor.num)); //checamos se o usuario selecionou um lado, e, caso sim, armazenamos o lado selecionado e o valor inserido
    }

    setVisor({ side: "Lado", num: "0" }); //"reinicializamos" o visor

    if (valores.size == 2) {
      //se dois lados já tiverem sido inseridos, determinamos o terceiro
      let res = 0; // inicializamos uma variavel res para armazenar o resultado calculo
      let lado = ""; //inicializamos uma variavel lado para armazenar o lado que será determinado
      let err = ""; //mensagem de erro
      if (!valores.has("A")) {
        //se nenhum dos lados for a hipotenusa do triangulo, usamos a formula para calcular a hipotenusa a^2 = b^2 + c^2

        lado = "A"; //selecionamos a hipotenusa como lado que será determinado

        valores.forEach((valor) => {
          //iteramos sobre todos os valores armazenados
          res += valor ** 2; //adicionamos o valor dos catetos^2 a soma para obter b^2 + c^2
        });
        res = Math.sqrt(res); //obtemos o resultado final calculando a raiz quadrada da soma de b^2 + c^2
      } else {
        // se um dos lados for a hipotenusa, usamos a formula para calcular um cateto b^2 = a^2 - c^2
        let hipotenusa = 0; //inicializamos uma variavel para armazenar o tamanho da hipotenusa
        let cateto = 0; //inicializamos uma variavel para armazenar o tamanho do cateto

        for (const [key, value] of valores) {
          //iteramos sobre a variavel valores para determinar os tamanhos dos lados
          {
            key == "A" ? (hipotenusa = value) : (cateto = value);
          } //se a key for A, o lado será a hipotenusa, caso não será cateto, e armazenamos seu value na variavel correspondente
        }
        if (cateto > hipotenusa) {
          //o cateto não pode ser maior que a hipotenusa, se isso ocorrer, será imprimida uma mensagem de erro
          lado = "Lado";
          const err = "ERRO!";
        } else {
          res = Math.sqrt(hipotenusa ** 2 - cateto ** 2); //se o cateto não for maior que a hipotenusa, calculamos b^2 = a^2 - c^2
          {
            valores.has("B") ? (lado = "C") : (lado = "B"); //se o cateto inserido for o b, o lado calculado sera c e vice-versa
          }
        }
      }
      setVisor({
        //setamos os resutados na tela
        side: lado,
        num: err != "" ? err : res.toString(), //se não houver erro, imprimimos o resultado obtido
      });
      valores.clear(); //deletamos todos os elementos da variavel valores
    }
  }

  function selectSide(e: MouseEvent<HTMLButtonElement>) {
    //essa função é para quando o usuário selecionar o lado
    e.preventDefault();
    setVisor({
      //ao selecionar um lado, indicamos o lado selecionado por meio do id do componente do React selecionado e zeramos o valor
      side: e.currentTarget.id,
      num: "0",
    });
  }

  function selectNumber(e: MouseEvent<HTMLButtonElement>) {
    //essa função é para quando o usuário selecionar um número
    e.preventDefault();

    let exibe = e.currentTarget.id; //obtemos o id do componente do React selecionado, para determinar o dígito a ser exibido

    if (visor.num.length < 16) {
      // se o numero exibido no visor tem menos de 16 dígitos
      if (visor.num == "0") {
        // bloco a ser executado se o visor estiver no seu estado inicial, ou seja, exibindo 0
        switch (exibe) {
          case "0": //se o dígito selecionado for zero, continuaremos a exibir "0" na tela
            exibe = visor.num;
            break;
          case ".": // se o dígito selecionado for ".", aparecerá na tela "0."
            exibe = "0.";
            break;
          default: //se for um dos outros dígitos, aparecerá o dígito selecionado
            break;
        }
      } else {
        // bloco a ser executado se o visor estiver não estiver no seu estado inicial, ou seja, não exibindo 0
        if (!visor.num.includes(".")) {
          exibe = visor.num + exibe; // se o numero exibido pelo visor ainda não tiver um ".", simplesmente "adicionaremos" o dígito selecionado ao número no visor
        } else if (visor.num.includes(".") && exibe != ".") {
          exibe = visor.num + exibe; // se o numero exibido pelo visor já tiver um ".", "adicionaremos" o dígito selecionado ao número no visor, apenas se o dígito for diferente de "."
        }
      }
      setVisor({
        //exibindo o número determinado pelas condicionais
        ...visor,
        num: exibe,
      });
    }
  }

  return (
    //esse componente é composto por:
    //1)um indicador do lado(texto em vermelho)
    //2)o "visor"(caixa deinput) onde serão exibidos os números. Como em uma calculadora real, só é possível usar o numpad abaixo para entrar valores
    //3) o numpad onde estarão os números para serem selecionador e o botão de enter

    <div>
      <div className="text-red-500 text-xl flex justify-start">
        {visor.side}
      </div>
      <input
        value={visor.num}
        readOnly
        className="mb-2 rounded-lg border-[1px] border-[#1a1a1a] h-[40px] bg-white text-[#1a1a1a] caret-transparent"
      />
      <div className="grid grid-cols-3 gap-1">
        <button id="A" onClick={selectSide}>
          A
        </button>
        <button id="B" onClick={selectSide}>
          B
        </button>
        <button id="C" onClick={selectSide}>
          C
        </button>
        <button id="1" onClick={selectNumber}>
          1
        </button>
        <button id="2" onClick={selectNumber}>
          2
        </button>
        <button id="3" onClick={selectNumber}>
          3
        </button>
        <button id="4" onClick={selectNumber}>
          4
        </button>
        <button id="5" onClick={selectNumber}>
          5
        </button>
        <button id="6" onClick={selectNumber}>
          6
        </button>
        <button id="7" onClick={selectNumber}>
          7
        </button>
        <button id="8" onClick={selectNumber}>
          8
        </button>
        <button id="9" onClick={selectNumber}>
          9
        </button>
      </div>
      <div className="flex flex-row justify-evenly mt-1">
        <button id="." onClick={selectNumber}>
          .
        </button>
        <button id="0" onClick={selectNumber}>
          0
        </button>
        <button onClick={enter}> Enter </button>
      </div>
    </div>
  );
}
