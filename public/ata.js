async function cadastrarata(event) {
    event.preventDefault();

    const ata = {
        aluno: document.getElementById("ataAluno").value,
        data: document.getElementById("ataData").value,
        assunto: document.getElementById("ataAssunto").value,
        conteudo: document.getElementById("ataConteudo").value,
        encaminhamento: document.getElementById("ataEncaminhamento").value,
        participantes: document.getElementById("ataParticipantes").value,

    };

    try {
        const response = await fetch("/ata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ata),
        });

        const result = await response.json();
        if (response.ok) {
            alert("ata cadastrado com sucesso!");
            //document.getElementById('ata-atarm').reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar");
    }
}

// Função para listar todos os ata
async function listarata() {
    const aluno = document.getElementById("ataAluno").value.trim();
    const participantes = document.getElementById("ataParticipantes").value.trim();
    const encaminhamento = document.getElementById("ataEncaminhamento").value.trim();
    const assunto = document.getElementById("ataAssunto").value.trim();
    const data = document.getElementById("ataData").value.trim();
    const conteudo = document.getElementById("ataConteudo").value.trim();
    
    let url = "/ata"; // URL padrão para todos os ata

    if (aluno) {
        // Se aluno atai digitado, adiciona o parâmetro de consulta
        url += `?aluno=${aluno}`;
    }

    try {
        const respo = await fetch(url);
        const ata = await respo.json();

        const tabela = document.getElementById("tabela-ata");
        tabela.innerHTML = ""; // Limpa a tabela antes de preencher

        if (!Array.isArray(ata) || ata.length === 0) {
            // Caso não encontre ata, exibe uma mensagem
            tabela.innerHTML =
                '<tr><td colspan="6">Nenhum ata encontrado.</td></tr>';
        } else {
          ata.forEach((ataItem) =>  {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                  <td>${ataItem.aluno}</td>
                  <td>${ataItem.participantes}</td>
                  <td>${ataItem.encaminhamento}</td>
                  <td>${ataItem.assunto}</td>
                  <td>${ataItem.data}</td>
                  <td>${ataItem.conteudo}</td>
              `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error("Erro ao listar ata:", error);
    }
}

// Função para atualizar as inatarmações do ata
async function atualizarata() {
        const aluno = document.getElementById("ataAluno").value;
        const data = document.getElementById("ataData").value;
        const assunto = document.getElementById("ataAssunto").value;
        const conteudo = document.getElementById("ataConteudo").value;
        const participantes = document.getElementById("ataParticipantes").value;
        
    const ataAtualizado = {
        aluno,
        data,
        conteudo,
        participantes
    };

    try {
        const respo = await fetch(`/ata/aluno/${aluno}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ataAtualizado),
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