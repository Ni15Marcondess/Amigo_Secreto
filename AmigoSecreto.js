let nomes = [];

// só roda quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnAdicionar").addEventListener("click", adicionarNome);
  document.getElementById("btnSortear").addEventListener("click", sortear);
});

function adicionarNome() {
  let input = document.getElementById("nomeInput");
  let nome = input.value.trim();

  if (nome === "") {
    alert("Digite um nome válido!");
    return;
  }

  nomes.push(nome);

  // limpa automaticamente o input
  input.value = "";
  input.focus();

  atualizarLista();
}

function atualizarLista() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  nomes.forEach((nome, index) => {
    let li = document.createElement("li");
    li.className = "part-item"; // adicionar classe para CSS hover

    li.textContent = nome + " "; 

    // criar container para botões
    let actions = document.createElement("div");
    actions.className = "item-actions";

    let btnEditar = document.createElement("button");
    btnEditar.textContent = "✏️";
    btnEditar.className = "icon-btn"; // opcional para estilo
    btnEditar.onclick = () => renomearNome(index);

    let btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";
    btnRemover.className = "icon-btn"; // opcional para estilo
    btnRemover.onclick = () => removerNome(index);

    actions.appendChild(btnEditar);
    actions.appendChild(btnRemover);

    li.appendChild(actions); // adiciona o container de botões ao li
    lista.appendChild(li);
  });
}


function removerNome(index) {
  nomes.splice(index, 1);
  atualizarLista();
}

function renomearNome(index) {
  let novoNome = prompt("Digite o novo nome:", nomes[index]);
  if (novoNome && novoNome.trim() !== "") {
    nomes[index] = novoNome.trim();
    atualizarLista();
  }
}

function sortear() {
  if (nomes.length < 2) {
    alert("Adicione pelo menos 2 nomes!");
    return;
  }

  let sorteados = [...nomes];

  // Embaralhar com Fisher-Yates
  for (let i = sorteados.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [sorteados[i], sorteados[j]] = [sorteados[j], sorteados[i]];
  }

  // Garantir que ninguém tire a si mesmo
  for (let i = 0; i < nomes.length; i++) {
    if (nomes[i] === sorteados[i]) {
      return sortear(); // refaz o sorteio se der conflito
    }
  }

  // Mostrar resultado
  let lista = document.getElementById("resultado");
  lista.innerHTML = "";
  for (let i = 0; i < nomes.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${nomes[i]} → ${sorteados[i]}`;
    lista.appendChild(li);
  }
}
