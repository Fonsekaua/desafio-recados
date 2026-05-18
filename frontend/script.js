const content = document.querySelector(".content")
const createMessage = (id, titulo, descricao, lido) => {

    const message = document.createElement("div")
    message.classList.add("message")

    const title = document.createElement("small")
    title.textContent = titulo

    const description = document.createElement("p")
    description.textContent = descricao

    const editOptions = document.createElement("div")
    editOptions.classList.add("edit-options")

    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete")
    deleteButton.textContent = "deletar"

    const readButton = document.createElement("button")
    readButton.classList.add("read")
    readButton.textContent = lido ? "lido" : "marcar como lido"

    editOptions.appendChild(deleteButton)
    editOptions.appendChild(readButton)

    deleteButton.addEventListener("click", () => {
        deleteMessage(id)
        message.remove();
    })
    readButton.addEventListener("click", () => {
        readMessage(id)
        readButton.textContent = "lido"
    })
    message.appendChild(title)
    message.appendChild(description)
    message.appendChild(editOptions)

    content.appendChild(message)
}

const all = document.querySelector("#all")
const read = document.querySelector("#read")
const unread = document.querySelector("#unread")

const deleteMessage = async (id) => {

    try {

        const response = await fetch(
            `http://localhost:3456/messages/${id}`,
            {
                method: "DELETE"
            }
        )

        if (response.ok) {

            console.log('Mensagem apagada com sucesso')

        } else {

            console.log('Ocorreu um erro ao apagar mensagem')
        }

    } catch (err) {

        console.log(err)
    }
}
const readMessage = async (id) => {

    try {

        const response = await fetch(
            `http://localhost:3456/messages/${id}/read`,
            {
                method: "PATCH"
            }
        )

        if (response.ok) {

            console.log('Mensagem marcada como lida')

        } else {

            console.log('Ocorreu um erro ao marcar mensagem')
        }

    } catch (err) {

        console.log(err)
    }
}


const getMessages = async (url) => {

    try {

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("Erro ao buscar mensagens")
        }

        const data = await response.json()

        content.innerHTML = ""
        if (data.length > 0) {
            data.forEach(element => {

                createMessage(
                    element.id,
                    element.titulo,
                    element.descricao,
                    element.lido
                )
            })
        }else {
                createMessage(
                    "random",
                    "Erro",
                    "Nenhum recado registrado nesta categoria",
                    true
                )
        }


    } catch (err) {

        console.log(err)
    }
}

const radios = document.querySelectorAll(
    'input[type="radio"]'
)

radios.forEach(radio => {
    getMessages('http://localhost:3456/messages')
    radio.addEventListener("change", () => {

        if (all.checked) {
            getMessages('http://localhost:3456/messages')
        }

        if (read.checked) {
            getMessages('http://localhost:3456/messages/read')
        }

        if (unread.checked) {
            getMessages('http://localhost:3456/messages/unread')
        }
    })
})

const newMessage = async (title, describle) => {

    const response = await fetch(
        'http://localhost:3456/messages',
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                titulo: title,
                descricao: describle
            })
        }
    )

    if (response.ok) {

        const data = await response.json()
        getMessages('http://localhost:3456/messages')

    } else {

        console.log('Erro ao criar mensagem')
    }
}

const button = document.querySelector(".create-button");


button.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value
    const describle = document.querySelector("#describle").value
    if (title.trim() != "" && describle.trim() != "") {
        newMessage(title, describle);
        document.querySelector("#open").checked = false
        document.querySelector("#close").checked = true
        document.querySelector("#all").checked = true
    }
})