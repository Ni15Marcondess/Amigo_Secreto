// =====================
// Tema Claro/Escuro
// =====================
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");

    // mudar ícone
    themeToggle.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";

    // salvar no localStorage
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === "light" ? "🌞" : "🌙";
  });
}

// =====================
// Página Amigo Secreto
// =====================
const nomeInput = document.getElementById("nomeInput");
const btnAdicionar = document.getElementById("btnAdicionar");
const lista = document.getElementById("lista");
const btnSortear = document.getElementById("btnSortear");

let nomes = [];

if (nomeInput && btnAdicionar && lista) {
  // adicionar nome
  btnAdicionar.addEventListener("click", () => {
    let nome = nomeInput.value.trim();
    if (!nome) return;

    // primeira letra maiúscula
    nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

    // checar duplicado
    if (nomes.includes(nome)) {
      alert("Esse nome já foi adicionado!");
      nomeInput.value = "";
      return;
    }

    nomes.push(nome);
    atualizarLista();
    nomeInput.value = "";
  });

  // atualizar lista
  function atualizarLista() {
    lista.innerHTML = "";
    nomes.forEach((nome, index) => {
      const li = document.createElement("li");
      li.className = "part-item";
      
      const spanNome = document.createElement("span");
      spanNome.textContent = nome;
      li.appendChild(spanNome);

      // botões
      const actions = document.createElement("div");
      actions.className = "item-actions";

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "✏️";
      btnEditar.className = "icon-btn";
      btnEditar.onclick = () => renomearNome(index);

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "❌";
      btnRemover.className = "icon-btn";
      btnRemover.onclick = () => removerNome(index);

      actions.appendChild(btnEditar);
      actions.appendChild(btnRemover);
      li.appendChild(actions);

      lista.appendChild(li);
    });
  }

  // remover
  function removerNome(index) {
    const certeza = confirm(`Você tem certeza que deseja remover "${nomes[index]}"?`);
    if (certeza) {
      nomes.splice(index, 1);
      atualizarLista();
    }
  }

  // renomear
  function renomearNome(index) {
    let novoNome = prompt("Digite o novo nome:", nomes[index]);
    if (!novoNome) return;

    novoNome = novoNome.trim();
    novoNome = novoNome.charAt(0).toUpperCase() + novoNome.slice(1).toLowerCase();

    if (nomes.includes(novoNome) && novoNome !== nomes[index]) {
      alert("Esse nome já existe na lista!");
      return;
    }

    nomes[index] = novoNome;
    atualizarLista();
  }

// sortear amigos
document.getElementById("btnSortear").addEventListener("click", function() {
  if (nomes.length < 2) {
    alert("Adicione pelo menos 2 participantes para sortear!");
    return;
  }

  let sorteados = [...nomes];
  let resultado = [];

  sorteados.sort(() => Math.random() - 0.5);

  for (let i = 0; i < sorteados.length; i++) {
    let amigo = sorteados[(i + 1) % sorteados.length];
    resultado.push(`${sorteados[i]} ➝ ${amigo}`);
  }

  // 🔹 Limpar antes de salvar
  localStorage.removeItem("resultadoAmigoSecreto");

  // 🔹 Salvar novo sorteio
  localStorage.setItem("resultadoAmigoSecreto", JSON.stringify(resultado));

  // 🔹 Redirecionar
  window.location.href = "resultado.html";
});



}

