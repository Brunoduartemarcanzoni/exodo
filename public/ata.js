async function cadastrarfo(event) {
    event.preventDefault();

    const ata = {
        turma: document.getElementById("turma").value,
        aluno: document.getElementById("aluno").value,
        data: document.getElementById("data").value,
        assunto: document.getElementById("assunto").value,
        conteudo: document.getElementById("conteudo").value,
        encaminhamento: document.getElementById("encaminhamento").value,
        cgm: document.getElementById("cgm").value,
        prof: document.getElementById("prof").value,
        fato: document.getElementById("fato").value,
        participantes: document.getElementById("participantes").value,
    };

    try {
        const response = await fetch("/ata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fo),
        });

        const result = await response.json();
        if (response.ok) {
            alert("ata cadastrado com sucesso!");
            //document.getElementById('fo-form').reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar");
    }
}

// Função para listar todos os fo
async function listarata() {
    const nome = document.getElementById("func-nome").value.trim();
    const cgm = document.getElementById("func-cgm").value.trim();
    const email = document.getElementById("func-email").value.trim();
    const telefone = document.getElementById("func-telefone").value.trim();

    let url = "/ata"; // URL padrão para todos os funcionario

    if (cgm) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?cgm=${cgm}`;
    }

    try {
        const respo = await fetch(url);
        const ata = await respo.json();

        const tabela = document.getElementById("tabela-ata");
        tabela.innerHTML = ""; // Limpa a tabela antes de preencher

        if (!Array.isArray(fo) || fo.length === 0) {
            // Caso não encontre funcionario, exibe uma mensagem
            tabela.innerHTML =
                '<tr><td colspan="6">Nenhum fo encontrado.</td></tr>';
        } else {
            fo.forEach((foItem) => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                  <td>${ataItem.nome}</td>
                  <td>${ataItem.cgm}</td>
                  <td>${ataItem.email}</td>
                  <td>${ataItem.telefone}</td>
              `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error("Erro ao listar ata:", error);
    }
}

// Função para atualizar as informações do funcionario
async function atualizarfo() {
    const nome = document.getElementById("func-nome").value;
    const cgm = document.getElementById("func-cgm").value;
    const email = document.getElementById("func-email").value;
    const telefone = document.getElementById("func-telefone").value;

    const ataAtualizado = {
        nome,
        cgm,
        email,
        telefone,
    };

    try {
        const respo = await fetch(`/ata/cgm/${cgm}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(foAtualizado),
        });

        if (respo.ok) {
            alert("ata atualizado com sucesso!");
        } else {
            const errorMessage = await respo.text();
            alert("Erro ao atualizar ata: " + errorMessage);
        }
    } catch (error) {
        console.error("Erro ao atualizar ata:", error);
        alert("Erro ao atualizar ata.");
    }
}