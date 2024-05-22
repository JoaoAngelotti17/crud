document.querySelector('#myForm').addEventListener('submit', function(event) {
    event.preventDefault();
});

// ==================================================
// Modo Cadastrar
function cadastrar() {
    var nome = document.querySelector('#nome').value;
    var email = document.querySelector('#email').value;
    var idade = document.querySelector('#idade').value;

    var cliente = {
        "nome": nome,
        "idade": idade,
        "email": email
    };

    fetch(urlServer, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar cliente');
        }
        return response.json();
    })
    .then(() => window.location.href = '../index.html')
    .catch(error => console.error('Erro:', error));
}



// ==================================================
// Modo Editar
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get('id');

if (id) {       // está no modo "Editar"
    var nomeElemento = document.querySelector('#nome');
    var emailElemento = document.querySelector('#email');
    var idadeElemento = document.querySelector('#idade');

    fetch(`${urlServer}${id}`)
    .then(response => response.json())
    .then(data => {
        nomeElemento.value = data.nome;
        emailElemento.value = data.email;
        idadeElemento.value = data.idade;
    });

    document.querySelector('#btn-cadastrar').innerHTML = 'Atualizar';
    
    document.querySelector('#btn-cadastrar').onclick = atualizar;
}


function atualizar() {
    var nome = document.querySelector('#nome').value;
    var email = document.querySelector('#email').value;
    var idade = document.querySelector('#idade').value;

    var cliente = {
        "nome": nome,
        "idade": idade,
        "email": email
    };

    fetch(`${urlServer}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar cliente');
        }
        return response.json();
    })
    .then(() => window.location.href = '../index.html')
    .catch(error => console.error('Erro:', error));
}