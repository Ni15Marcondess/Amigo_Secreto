//alternar o tema 
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");

    // mudar o icone
    if (document.body.classList.contains("light")) {
      themeToggle.textContent = "🌞";
    } else {
      themeToggle.textContent = "🌙";
    }

    // salvar a escolha no localStorage
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  // carrega o tema salvo
  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === "light" ? "🌞" : "🌙";
  });
}

let nomes = [];

// 🔹 adicionar nome
document.getElementById("btnAdicionar").addEventListener("click", function() {
  let nome = document.getElementById("nomeInput").value.trim();

  if (nome === "") return;

  // primeira letra maiúscula
  nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

  // checar duplicados
  if (nomes.includes(nome)) {
    alert("Esse nome já foi adicionado!");
    document.getElementById("nomeInput").value = "";
    return;
  }

  nomes.push(nome);
  atualizarLista();
  document.getElementById("nomeInput").value = "";
});

// 🔹 atualizar lista na tela
function atualizarLista() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  nomes.forEach((nome, index) => {
    let li = document.createElement("li");
    li.className = "part-item";

    let spanNome = document.createElement("span");
    spanNome.textContent = nome;
    li.appendChild(spanNome);

    // container para botões de ação
    let actions = document.createElement("div");
    actions.className = "item-actions";

    let btnEditar = document.createElement("button");
    btnEditar.textContent = "✏️";
    btnEditar.className = "icon-btn";
    btnEditar.onclick = () => renomearNome(index);

    let btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";
    btnRemover.className = "icon-btn";
    btnRemover.onclick = () => removerNome(index);

    actions.appendChild(btnEditar);
    actions.appendChild(btnRemover);
    li.appendChild(actions);

    lista.appendChild(li);
  });
}

// 🔹 remover nome
function removerNome(index) {
  nomes.splice(index, 1);
  atualizarLista();
}

function removerNome(index) {
  const nome = nomes[index];
  const certeza = confirm(`Você tem certeza que deseja remover "${nome}" da lista?`);
  
  if (certeza) {
    nomes.splice(index, 1);
    atualizarLista();
  }
}

// 🔹 renomear nome
function renomearNome(index) {
  let novoNome = prompt("Digite o novo nome:", nomes[index]);

  if (novoNome) {
    novoNome = novoNome.trim();
    novoNome = novoNome.charAt(0).toUpperCase() + novoNome.slice(1).toLowerCase();

    // impedir duplicado ao renomear
    if (nomes.includes(novoNome) && novoNome !== nomes[index]) {
      alert("Esse nome já existe na lista!");
      return;
    }

    nomes[index] = novoNome;
    atualizarLista();
  }
}

// 🔹 sortear amigos
document.getElementById("btnSortear").addEventListener("click", function() {
  if (nomes.length < 2) {
    alert("Adicione pelo menos 2 participantes para sortear!");
    return;
  }

  let sorteados = [...nomes];
  let resultado = [];

  // embaralhar
  sorteados.sort(() => Math.random() - 0.5);

  for (let i = 0; i < sorteados.length; i++) {
    let amigo = sorteados[(i + 1) % sorteados.length];
    resultado.push(`${sorteados[i]} ➝ ${amigo}`);
  }

  // salvar no localStorage
  localStorage.setItem("resultadoAmigoSecreto", JSON.stringify(resultado));

  // redirecionar
  window.location.href = "resultado.html";
});
