async function cadastrarfo(event) {
    event.preventDefault();

    alert("ate aqui vai ")
    const fo = {
        turma: document.getElementById('aluno-turma').value,
        data: document.getElementById('data').value,
        tipo_fato: document.getElementById('tipoFato').value,
        obs: document.getElementById('observacao').value,
        monitor: document.getElementById('monitor').value
    };
     alert("ate ")
    try {
        const response = await fetch('/fo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fo),
        });
         alert("ate aqui  ")
        const result = await response.json();
        if (response.ok) {
            alert('Foi cadastrado com sucesso!');
            //document.getElementById('fo-form').reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
        } catch (err) {
            console.error('Erro na solicitação:', err);
            alert('Erro ao cadastrar fo.1');
        }
}

// Função para listar todos os fo
async function listarfo() {
    const turma = document.getElementById('turma').value.trim();
    // const data = document.getElementById('data').value.trim();
    // const tipo_fato = document.getElementById('tipoFato').value.trim();
    // const obs = document.getElementById('observacao').value.trim();
    // const monitor = document.getElementById('monitor').value.trim();

    let url = "/fo"; // URL padrão para todos os funcionario

    if (turma) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?turma=${turma}`;
    }

    try {
        const respo = await fetch(url);
        const fo = await respo.json();

        const tabela = document.getElementById('tabela-fo');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (!Array.isArray(fo) || fo.length === 0) {
            // Caso não encontre funcionario, exibe uma mensagem
            tabela.innerHTML =
                '<tr><td colspan="6">Nenhum fo encontrado.</td></tr>';
        } else {
            fo.forEach((foItem) => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${foItem.turma}</td>
                    <td>${foItem.data}</td>
                    <td>${foItem.monitor}</td>
                     <td>${foItem.tipo_fato}</td>
                    <td>${foItem.obs}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar fo:', error);
    }
}

// Função para atualizar as informações do funcionario
async function atualizarfo() {
    const turma = document.getElementById('turma').value;
    const data = document.getElementById('data').value;
    const tipo_fato = document.getElementById('tipoFato').value;

    const foAtualizado = {
        turma,
        data,
        tipo_fato,
    };

    try {
        const respo = await fetch(`/fo/turma/${turma}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(foAtualizado),
        });

        if (respo.ok) {
            alert('fo atualizado com sucesso!');
        } else {
            const errorMessage = await respo.text();
            alert('Erro ao atualizar fo: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar fo:', error);
        alert('Erro ao atualizar fo.');
    }
}
