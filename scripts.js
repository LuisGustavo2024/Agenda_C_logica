/**
 * Author : Luis Gustavo da Silva Ferreira
 * Version : 1
 * Project: Agenda de contatos com HTML5, Tailwid cc e, JavaScript es6 e Local storage
 */

// Obtem referências aos Elementos do Navegador (DOM)
const contactForm = document.getElementById("contactForm")
const flashMessage = document.getElementById("flashMessage")
const contactList = document.getElementById("contactList")

// Manipulador de eventos de envio do formulário
contactForm.addEventListener("submit", (event) => {
event.preventDefault()
const editingId = event.submitter.dataset.editingId

//  Verifica se o id existe no banco de dados
if(editingId){
    updateContact(editingId)
 } else {
    saveContact() ;
 }
})

// Função para salvar o contato no localStorage
function saveContact() {
    const name = document.getElementById("name").value
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value
    const birthdate = document.getElementById("birthdate").value

    // Criação do id do contato
    const id = date.now() .toString()
    contact = {id, name, phone, email, birthdate}

    let contacts = JSON.parse(localStorage.getElementById("contacts")) || [];
    // Salvar o contato
    contacts.push(contact)
    localStorage.setItem("contacts", JSON.stringify(contacts))
    showFlashMessage("Contato salvo com sucesso!")
    contactForm.reset()
    displayContacts()
}

// Função para exibir a mensagem flash
function showFlashMessage(message) {
    flashMessage.textContent(message)
    flashMessage.classList.remove("hidden")
    setTimeout(() =>{
        flashMessage.classList.add("hidden")
    }, 5000)
}


// Função para exibir os contatos na tabela
function displayContacts() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || []
    contactList.innerHTML = "" //Limpar a tabela antes de exibir

    
    // Cria o cabeçalho  da tabela 
["Nome", "telefone", "Email", "Data de Nascimento","Ações"].forEach(headerText => {
    const headerCell = headerRow.insert()
    headerCell.textContent = headerText
    headerCell.classList.add("px-4", "py-2", "bg-gray-200", "text-gray-800","font-bold" ) // Estilo do cabeçalho
})

contacts.forEach(contact => {
    const row = contactList.insertRow()

    // Excluimos o "Birthdate" para corrigirmos a data
    ["name", "phome", "email"].forEach(key =>{
        const cell = row.insertCell()
        cell.textContent = contact[key]
        cell.classList.add("border-t", "px-4", "py-2") // Estilização das células
    })
    // Formato a data de nascimento para o formato brasileiro
    const birthdateCell = row.insertCell()
    const [year, month, day] = contact.birthdate.split("-") // Separa os componentes da data
    const birthdate = new Date(year, month -1, day) // Formatando a data no padrão brasileiro

    const formattedBirthdate = birthdate.toLocaleDateString("pt-BR")
    birthdateCell.textContent = formattedBirthdate 
    birthdateCell.classList.add("border-t", "px-4", "py-2");

    // Insere os botões nas celulas
    const actionCell = row.insertCell()
    const editButton = document.createElement("button")
    editButton.innerHTML = "<i class='fas fa-edit'></i>"
    editButton.classList.add("bg-yellow-500", "hover:bg-yellow-700", "text-white", "font-bold", "py-2", "py-4", "rounded")
    editButton.addEventListener("click", () => editContact(contact.id))
    actionCell.appendChild(editButton)

    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>"
    deleteButton.classList.add("bg-yellow-500", "hover:bg-yellow-700", "text-white", "font-bold", "py-2", "py-4", "rounded", "ml-2")
    deleteButton.addEventListener("click", () => deleteContact(contact.id))
    actionCell.appendChild(deleteButton);
});
}

// Função para editar um contato
function editContact(id) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [] ;
    const contact = contacts.find(c => c.id === id)

  // Preenche os campos do formulario 
    document.getElementById("name").value = contact.name
    document.getElementById("phone").value = contact.phone
    document.getElementById("email").value = contact.email
    document.getElementById("birthdate").value = contact.birthdate

    const submitButton = document.querySelector("#contactForm Button [type='submit']")

    submitButton.textContent = "Atualizar"
    submitButton.dataset.editingId = id

    // Limpa o formulario 
    contactForm.addEventListener("reset").value, () => {
        submitButton.textContent = "Salvar"
        delete submitButton.dataset.editingId
    };
}

// Função para excluir contato
function delectContact() {
    const contacts = JSON.parse(localStorage.getItem(contacts)) || []

    const uptadeContacts = contacts.filter(c => c.id !== id)
    localStorage.setItem("contacts", JSON.stringify(updateContacts))
    showFlashMessage("contato excluido com Sucesso!")
    displayContacts(); // Atualiza a tabela após excluir
}

// Função para atualizar um contato existente 
function uptadeContacts(id) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [] ;
    const contact = contacts.findIndex(c => c.id === id)

  // Preenche os campos do formulario
  if(index !== -1) { 
    contact[index] = {
    name: document.getElementById("name").value = contact.name,
    phone: document.getElementById("phone").value = contact.phone,
    email: document.getElementById("email").value = contact.email,
    birthdate: document.getElementById("birthdate").value = contact.birthdate,

    }
    localStorage.setItem("contacts", JSON.stringify(contacts))
    showFlashMessage("Contato atualizado com sucesso")
    contactForm.reset() // Limpa formulario
    displayContacts() // Atualiza a tabela após atualizar o contato
  }
}

// Chama a função para exibir os contatos ao carregar a página
displayContacts();