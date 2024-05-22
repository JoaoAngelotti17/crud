

function listaClientes() {
    let lista = document.querySelector("#lista");
    lista.innerHTML = "";

    fetch(urlServer)
        .then(response => response.json())
        .then(data => {
            data.forEach(cliente => {
                let li = document.createElement("li");
                let a = document.createElement("a");
                let button = document.createElement("button");

                button.innerHTML = "Excluir";
                button.classList.add("btn-excluir");
                button.onclick = () => {
                    fetch(`${urlServer}/${cliente.id}`, {
                        method: "DELETE"
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao excluir cliente');
                        }
                        return response.json();
                    })
                    .then(() => listaClientes())
                    .catch(error => console.error('Erro:', error));
                };

                a.innerHTML = `${cliente.nome} (${cliente.idade}) - ${cliente.email}`;
                a.href = `cadastrar/cadastrar.html?id=${cliente.id}`;
                a.classList.add("linkCliente");

                li.appendChild(button);
                li.appendChild(a);

                lista.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar clientes:', error));
}

listaClientes();