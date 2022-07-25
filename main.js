var botoes = document.getElementsByClassName("botao");
var input_1 = document.getElementById("input-1");
var input_2 = document.getElementById("input-2");
var tela_1 = document.getElementById("tela-1");
var tela_2 = document.getElementById("tela-2");
var candidatos = [10, 20];
var fraude = true;
var votos = {
    10: { quantidade: 0 },
    20: { quantidade: 0 },
};
var trocaTela = function () {

    tela_1.style.display = "none";
    tela_2.style.display = "flex";
    document.getElementById("nome-candidato").innerHTML = "Candidato " + input_1.value + input_2.value
}

var click = function (value) {

    if (input_2.value) return

    if (input_1.value) {
        input_2.value = value;
        let candidato = input_1.value + input_2.value;

        if (candidatos.includes(parseInt(candidato))) {
            trocaTela(2)
        }
        return
    }

    input_1.value = value;
};

Array.from(botoes).forEach(function (element) {
    element.addEventListener('click', function () {
        click(element.value);
    });
});

var corrige = document.getElementById("corrige");
var confirma = document.getElementById("confirma");

var limpa = function () {
    input_1.value = "";
    input_2.value = "";
    tela_1.style.display = "flex";
    tela_2.style.display = "none";
}

corrige.addEventListener('click', function () {
    limpa()
})

var atualizaBarras = function () {
    let total = parseInt(votos[10].quantidade) + parseInt(votos[20].quantidade);
    per_1 = 100 / total * votos[10].quantidade;
    per_2 = 100 / total * votos[20].quantidade;

    document.getElementById("barra-1").style.background = per_1 > 50 ? `linear-gradient(to top, green ${per_1.toFixed(2)}%, transparent  ${100 - per_1.toFixed(2)}%)` : `linear-gradient(to bottom, transparent  ${100 - per_1.toFixed(2)}%, green ${per_1.toFixed(2)}%)`;
    document.getElementById("barra-2").style.background = per_2 > 50 ? `linear-gradient(to top, green ${per_2.toFixed(2)}%, transparent  ${100 - per_2.toFixed(2)}%)` : `linear-gradient(to bottom, transparent  ${100 - per_2.toFixed(2)}%, green ${per_2.toFixed(2)}%)`;

    document.getElementById("percent-1").innerHTML = `${per_1.toFixed(2)}%`;
    document.getElementById("percent-2").innerHTML = `${per_2.toFixed(2)}%`;
}

var realizaVotacao = function () {
    let voto = input_1.value + input_2.value;
    if (fraude) {
        votos[10].quantidade += 1;
    }
    votos[voto].quantidade += 1;
    atualizaBarras()
    limpa();
}

confirma.addEventListener('click', function () {
    realizaVotacao()
})


document.addEventListener('keyup', (e) => {
    let number_keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    console.log(e.key);
    if (number_keys.includes(e.key)) {
        click(e.key);
        return
    }

    if (e.key === 'Enter') {
        realizaVotacao();
        return
    }

    if (e.key === 'Backspace') {
        limpa();
        return
    }
});