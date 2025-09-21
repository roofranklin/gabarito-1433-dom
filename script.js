function validarFormulario() {
    const nomeCompleto = document.getElementById('nomeCompleto');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const dataNascimento = document.getElementById('dataNascimento');
    const termos = document.getElementById('termos');
    const mensagem = document.getElementById('mensagem');

    // Limpa a mensagem de erro/sucesso anterior
    mensagem.textContent = '';
    mensagem.style.color = 'red'; // Cor padrão para erros

    if (nomeCompleto.value.trim() === '') {
        mensagem.textContent = 'O campo Nome Completo não pode estar vazio.';
        return;
    }

    if (!email.value.includes('@')) {
        mensagem.textContent = 'O campo E-mail deve incluir o caractere @.';
        return;
    }

    if (senha.value.length < 8) {
        mensagem.textContent = 'A senha deve ter no mínimo 8 caracteres.';
        return;
    }

    if (dataNascimento.value === '') {
        mensagem.textContent = 'O campo Data de Nascimento não pode estar vazio.';
        return;
    }

    if (!termos.checked) {
        mensagem.textContent = 'Você precisa aceitar os termos.';
        return;
    }

    mensagem.textContent = 'Cadastro realizado com sucesso!';
    mensagem.style.color = 'green';
}