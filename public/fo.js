async function cadastrarfo(event) {
    event.preventDefault();

    const fo = {
        nome: document.getElementById('func-nome').value,
        data_de_nascimento: document.getElementById('func-data-nascimento').value,
        cpf:document.getElementById('func-cpf').value,
        rg: document.getElementById('func-rg').value,
        genero: document.getElementById('func-genero').value,
        estado_civil: document.getElementById('func-estado-civil').value,
        email: document.getElementById('func-email').value,
        email_institucional: document.getElementById('func-email-institucional').value,
        telefone: document.getElementById('func-telefone').value,
        telefone_alternativo: document.getElementById('func-telefone-alternativo').value,
        cep: document.getElementById('func-cep').value,
        logradouro: document.getElementById('func-logradouro').value,
        numero: document.getElementById('func-numero').value,
        complemento: document.getElementById('func-complemento').value,
        bairro: document.getElementById('func-bairro').value,
        cidade: document.getElementById('func-cidade').value,
        estado: document.getElementById('func-estado').value,
        data_adimissão: document.getElementById('func-data-admissao').value,
        cgm: document.getElementById('func-matricula').value,
        cargo: document.getElementById('func-cargo').value,
        carga_horaria: document.getElementById('func-carga-horaria').value,
        contrato: document.getElementById('func-tipo-contrato').value
    };
       
    try {
        const response = await fetch('/fo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fo)
        });

        const result = await response.json();
        if (response.ok) {
            alert('fo cadastrado com sucesso!');
            //document.getElementById('fo-form').reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error('Erro na solicitação:', err);
        alert('Erro ao cadastrar cliente.');
    }
}

// Função para listar todos os funcionario ou buscar funcionario por CPF
async function listarfo() {
    // const cpf = document.getElementById('cpf').value.trim();  // Pega o valor do CPF digitado no input
    const nome = document.getElementById('func-nome').value.trim();
    const cpf = document.getElementById('func-cpf').value.trim();
    const email = document.getElementById('func-email').value.trim();
    const telefone = document.getElementById('func-telefone').value.trim();

    let url = '/fo';  // URL padrão para todos os funcionario

    if (cpf) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?cpf=${cpf}`;
    }

    try {
        const respo = await fetch(url);
        const fo = await respo.json();

        const tabela = document.getElementById('tabela-fo');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (!Array.isArray(fo) || fo.length === 0) {
            // Caso não encontre funcionario, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="6">Nenhum fo encontrado.</td></tr>';
        } else {
            fo.forEach(foItem => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${foItem.nome}</td>
                    <td>${foItem.cpf}</td>
                    <td>${foItem.email}</td>
                    <td>${foItem.telefone}</td>
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
    const nome = document.getElementById('func-nome').value;
    const cpf = document.getElementById('func-cpf').value;
    const email = document.getElementById('func-email').value;
    const telefone = document.getElementById('func-telefone').value;

    const foAtualizado = {
        nome,
        cpf,
        email,
        telefone,
    };

    try {
        const respo = await fetch(`/fo/cpf/${cpf}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foAtualizado)
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