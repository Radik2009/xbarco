  
 // Inicialização do carrossel
  document.addEventListener('DOMContentLoaded', function() {
    const myCarousel = new bootstrap.Carousel(document.getElementById('mainSlider'), {
      interval: 5000,
      wrap: true
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todas as seções com a classe "mb-4"
    const sections = document.querySelectorAll("#monte-seu-barco .mb-4");
  
    sections.forEach((section) => {
      const title = section.querySelector("h4"); // Seleciona o título da seção
      const list = section.querySelector("ul"); // Seleciona a lista de itens
  
      // Inicialmente, recolhe todas as listas, deixando apenas os títulos visíveis
      list.style.display = "none";
  
      // Adiciona um evento de clique ao título
      title.addEventListener("click", () => {
        // Recolhe todas as outras listas
        sections.forEach((otherSection) => {
          if (otherSection !== section) {
            const otherList = otherSection.querySelector("ul");
            otherList.style.display = "none";
          }
        });
  
        // Alterna a visibilidade da lista clicada
        list.style.display = list.style.display === "none" ? "block" : "none";
      });
    });
  });

// Função para atualizar a lista de itens escolhidos
   document.addEventListener('DOMContentLoaded', () => {
  // Garante que todas as seções estejam recolhidas no início
  document.querySelectorAll('.accordion-collapse').forEach(collapse => collapse.classList.remove('show'))
})

function adicionarItem(elemento) {
  const textoItem = elemento.textContent.trim();
  const lista = document.getElementById('lista-itens-escolhidos');

  // Evita duplicatas
  const itensAtuais = Array.from(lista.querySelectorAll('li')).map(li => li.dataset.item);
  if (itensAtuais.includes(textoItem)) return;

  const novoItem = document.createElement('li');
  novoItem.dataset.item = textoItem;
  novoItem.innerHTML = `
    <span>${textoItem}</span>
    <button onclick="removerItem(this)">&times;</button>
  `;
  lista.appendChild(novoItem);
}

function removerItem(botao) {
  const item = botao.closest('li');
  item.remove();
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".accordion-toggle");
  const contents = document.querySelectorAll(".accordion-content");
  const chosenList = document.getElementById("chosen-list");
  const imagePreview = document.getElementById("image-preview");

  // Recolher todas as sessões inicialmente
  contents.forEach(content => content.style.display = "none");

  // Alternar entre seções (apenas uma aberta)
  toggleButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      contents.forEach((content, i) => {
        content.style.display = i === index ? (content.style.display === "block" ? "none" : "block") : "none";
      });
    });
  });

  document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", () => {
      const itemName = item.getAttribute("data-name");
      const imagePath = item.getAttribute("data-image");
      const isAlreadyChosen = !!document.querySelector(`#chosen-list li[data-name="${itemName}"]`);
      const isAdesiva = itemName === "Faixa Adesiva";
      const isPintura = itemName === "Pintura Grafiada";

      const adesivaInList = !!document.querySelector(`#chosen-list li[data-name="Faixa Adesiva"]`);
      const pinturaInList = !!document.querySelector(`#chosen-list li[data-name="Pintura Grafiada"]`);

      // Bloqueio cruzado
      if (isAdesiva && pinturaInList) {
        alert("Retire o item 'Pintura Grafiada' para escolher 'Faixa Adesiva'.");
        return;
      } else if (isPintura && adesivaInList) {
        alert("Retire o item 'Faixa Adesiva' para escolher 'Pintura Grafiada'.");
        return;
      }

      if (!isAlreadyChosen) {
        const li = document.createElement("li");
        li.textContent = itemName;
        li.setAttribute("data-name", itemName);

        const btn = document.createElement("button");
        btn.textContent = "✖";
        btn.className = "remove-btn";
        btn.addEventListener("click", () => {
          li.remove();
          if (isAdesiva || isPintura) {
            imagePreview.innerHTML = "";
          }
        });

        li.appendChild(btn);
        chosenList.appendChild(li);

        if (imagePath) {
          imagePreview.innerHTML = `<img src="${imagePath}" alt="${itemName}" />`;
        }
      }
    });
  });
});

function adicionarItem(elemento) {
  const textoItem = elemento.textContent.trim();
  const lista = document.getElementById('lista-itens-escolhidos');
  const itensAtuais = Array.from(lista.querySelectorAll('li')).map(li => li.dataset.item);

  // Verifica se o item já foi escolhido
  if (itensAtuais.includes(textoItem)) {
    alert(`O item "${textoItem}" já foi escolhido.`);
    return;
  }

  // Restrições entre "Faixas em adesivos" e "Pintura grafitada"
  if (textoItem === "Faixas em adesivos" && itensAtuais.includes("Pintura grafitada")) {
    alert("Retire o item 'Pintura grafitada' para escolher 'Faixas em adesivos'.");
    return;
  }
  if (textoItem === "Pintura grafitada" && itensAtuais.includes("Faixas em adesivos")) {
    alert("Retire o item 'Faixas em adesivos' para escolher 'Pintura grafitada'.");
    return;
  }

  // Adiciona o item à lista
  const novoItem = document.createElement('li');
  novoItem.dataset.item = textoItem;
  novoItem.innerHTML = `
    <span>${textoItem}</span>
    <button onclick="removerItem(this)">&times;</button>
  `;
  lista.appendChild(novoItem);

  // Exibe a imagem correspondente
  const imagePreview = document.getElementById('image-preview');
  if (textoItem === "Faixas em adesivos") {
    imagePreview.innerHTML = `<img src="img/adesiva.jpg" alt="Faixa Adesiva" class="img-fluid">`;
  } else if (textoItem === "Pintura grafitada") {
    imagePreview.innerHTML = `<img src="img/pintura-grafiada.jpg" alt="Pintura Grafiada" class="img-fluid">`;
  }

  // Atualiza a visibilidade do botão de orçamento
  atualizarExibicao();
}

function removerItem(botao) {
  const item = botao.closest('li');
  const textoItem = item.dataset.item;
  item.remove();

  // Limpa a imagem se o item removido for "Faixa Adesiva" ou "Pintura Grafiada"
  const imagePreview = document.getElementById('image-preview');
  if (textoItem === "Faixas em adesivos" || textoItem === "Pintura grafitada") {
    imagePreview.innerHTML = "";
  }

  // Atualiza a visibilidade do botão de orçamento
  atualizarExibicao();
}

function atualizarExibicao() {
  const lista = document.getElementById('lista-itens-escolhidos');
  const botao = document.getElementById('botao-orcamento');
  botao.style.display = lista.children.length > 0 ? "block" : "none";
}

// Exibe formulário
function mostrarFormulario() {
  document.getElementById("formulario-orcamento").style.display = "block";
}

// whatsapp
function enviarOrcamentoWhatsApp() {
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !telefone || !email) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const itens = [...document.getElementById("lista-itens-escolhidos").children]
    .map(li => "• " + li.textContent)
    .join("\n");

  const mensagem = `
Olá, meu nome é ${nome}.

Gostaria de solicitar um orçamento com os seguintes itens escolhidos:
${itens}

📞 Telefone: ${telefone}
📧 Email: ${email}
`.trim();

  const numeroDestino = "5511983071425";
  const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}

