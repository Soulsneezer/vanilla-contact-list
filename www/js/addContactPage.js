
this.inputData = {
  name: '',
  phoneNumbers: [{
    id: 0,
    phoneNumber: ''
  }],
  mails: [{
    id: 1,
    mail: ''
  }]
}
this.nbr = 2;

async function getContactList() {
  let response = await fetch('/api/contacts');
  let data = await response.json()
  return data;
}


// createElement(div, 'p', 'HELLO THERE AWESOME', 'class', 'fine-div fontsize');
function createElement(daddyElement, element, innerHTMLString, attribute, attributeName) {
  element = document.createElement(element);
  element.innerHTML = innerHTMLString ? innerHTMLString : '';
  element.setAttribute(attribute, attributeName);
  daddyElement.append(element);
  return element
}

window.addEventListener('change', async e => {
  if(e.target.closest('.input-name')){
    this.inputData.name = document.querySelector('.input-name').value;
  }
  if(e.target.closest('.input-phone')){
    collectPhoneNbrs();
  }
  if(e.target.closest('.input-mail')){
    collectMails();
  }
})

function collectPhoneNbrs() {
  let selectedPhoneNbrs = document.querySelectorAll('.input-phone');
  let phoneNbrsArray = [];
  selectedPhoneNbrs.forEach((phoneNbr, i) => (
    phoneNbrsArray.push({
      id: selectedPhoneNbrs[i].parentElement.id,
      phoneNumber: phoneNbr.value.slice(0,15)
    })
  ));
  this.inputData.phoneNumbers = phoneNbrsArray;
}

function collectMails() {
  let selectedMails = document.querySelectorAll('.input-mail');
  let mailsArray = [];
  selectedMails.forEach((mail, i) => (
    mailsArray.push({
      id: selectedMails[i].parentElement.id,
      mail: mail.value.slice(0,25)
    })
  ));
  this.inputData.mails = mailsArray;
}

function cleanInputFields(){
  this.inputData.name = document.querySelector('.input-name').value;
  this.inputData.name = '';

  let selectedPhoneNbrs = document.querySelectorAll('.input-phone');
  let phoneNbrsArray = [];
  selectedPhoneNbrs.forEach((phoneNbr, i) => (
    phoneNbrsArray.push({
      id: selectedPhoneNbrs[i].parentElement.id,
      phoneNumber: ''
    })
  ));
  this.inputData.phoneNumbers = phoneNbrsArray;
  this.inputData.phoneNumbers.length = 1;
  let selectedMails = document.querySelectorAll('.input-mail');
  let mailsArray = [];
  selectedMails.forEach((mail, i) => (
    mailsArray.push({
      id: selectedMails[i].parentElement.id,
      mail: ''
    })
  ));
  this.inputData.mails = mailsArray;
  this.inputData.mails.length = 1;
}

window.addEventListener('click', async e => {

  if(e.target.closest('.remove-phone-button')) {
    e.preventDefault();
    let idIndex = this.inputData.phoneNumbers.findIndex(obj => obj.id == e.target.id);
    if(this.inputData.phoneNumbers.length === 1 ) { return }
    this.inputData.phoneNumbers.splice(idIndex, 1);
    render();
  }

  if(e.target.closest('.remove-mail-button')) {
    e.preventDefault();
    let idIndex = this.inputData.mails.findIndex(obj => obj.id == e.target.id);
    if(this.inputData.mails.length === 1 ) { return }
    this.inputData.mails.splice(idIndex, 1);
    render();
  }

  if(e.target.closest('.add-phone-button')) {
    e.preventDefault();
    if(this.inputData.phoneNumbers.length === 4) { return }
    this.inputData.phoneNumbers.push({
      id: nbr,
      phoneNumber: ''
    });
    this.nbr++;
    render();
  }

  if(e.target.closest('.add-mail-button')) {
    e.preventDefault();
    if(this.inputData.mails.length === 4) { return }
    this.inputData.mails.push({
      id: nbr,
      mail: ''
    });
    this.nbr++;
    render();
  }
  
  if(e.target.closest('.add-contact-button')){
    e.preventDefault();
    collectPhoneNbrs();
    collectMails();

    if(this.inputData.name === '') {this.inputData.name = 'Ananymous'}
    let contactData = {
      name: this.inputData.name,
      phoneNumbers: [],
      mails: []
    }
    this.inputData.phoneNumbers.forEach(obj => contactData.phoneNumbers.push(obj.phoneNumber));
    this.inputData.mails.forEach(obj => contactData.mails.push(obj.mail));
    const response = await fetch('/api/contacts/add', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData) // body contactData type must match "Content-Type" header
    });
    cleanInputFields();
    render();
    return await response.json(); // parses JSON response into native JavaScript objects
  }

})

async function removeThisContact(e) {
  e.preventDefault();
  let contactCard = e.target.closest('a');
  let contactObjId = contactCard.href.slice(22);      

  let contactIndex = this.contactList.findIndex(contact => contact._id == contactObjId);
  let contactObj = this.contactList.splice(contactIndex, 1)[0];

  const response = await fetch('/api/contacts/delete/' + contactObj._id, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json"
    }      
  });
  cleanInputFields();
  render();
  return await response.json();
}

document.addEventListener('mouseover', e => {
  if(e.target.closest('.contact-card')){
    let contactCard = e.target.closest('.contact-card');
    
  }
})


function createPhoneNbrInput(nbr, createContactDiv, phoneNbr) { 
  let inputPhoneDiv = createElement(createContactDiv, 'div', '', 'class', 'phone-div')
  inputPhoneDiv.setAttribute('id', nbr);
    let inputPhone = createElement(inputPhoneDiv, 'input', '', 'class', 'input input-phone');
    inputPhone.setAttribute('type','text');
    inputPhone.value = phoneNbr;
    inputPhone.placeholder = 'Fyll i ditt telefonnummer här...';
    let removePhoneButton = createElement(inputPhoneDiv, 'button', '-', 'class', 'button remove-phone-button');
    removePhoneButton.setAttribute('id', nbr);
}

function createMailInput(nbr, createContactDiv, mail) { 
  let inputMailDiv = createElement(createContactDiv, 'div', '', 'class', 'mail-div')
  inputMailDiv.setAttribute('id', nbr);
    let inputMail = createElement(inputMailDiv, 'input', '', 'class', 'input input-mail');
    inputMail.setAttribute('type','text');
    inputMail.value = mail;
    inputMail.placeholder = 'Fyll i din mail här...';
    let removeMailButton = createElement(inputMailDiv, 'button', '-', 'class', 'button remove-mail-button');
    removeMailButton.setAttribute('id', nbr);
}

function exportContactList(contactListDiv, name, phoneNumbers, mails, url, idNbr) {
  let aLink = createElement(contactListDiv, 'a', '', 'class', 'a');
  aLink.setAttribute('href', url)
  let contactCard = createElement(aLink, 'button', '', 'class', 'contact-card');
  let removeButton = createElement(contactCard, 'button', 'X', 'class', 'remove-button');
  removeButton.setAttribute('id', idNbr+999)
  let contactLogo = createElement(contactCard, 'div', '', 'class', 'contact-logo');
  let contactName = createElement(contactCard, 'p', name, 'class', 'contact-name');
  
    let phoneDiv = createElement(contactCard, 'p', '', 'class', 'contact-phone-div');
      let contactLeftPhoneSection = createElement(phoneDiv, 'div', '', 'class', 'contact-left-section'); 
        let contactPLeftPhoneSection = createElement(contactLeftPhoneSection, 'p', 'Telefonnummer:', 'class', 'p-contact-left-phone-section');
      let contactRightPhoneSection = createElement(phoneDiv, 'div', '', 'class', 'contact-right-section'); 
        phoneNumbers.slice(0,2).map((phoneNbr, i) => 
          createElement(contactRightPhoneSection, 'p', phoneNbr, 'class', `p-contact-right-phone-section last${i}`)
        )
    let mailDiv = createElement(contactCard, 'p', '', 'class', 'contact-mail-div');
      let contactLeftMailSection = createElement(mailDiv, 'div', '', 'class', 'contact-left-section'); 
        let contactPLeftMailSection = createElement(contactLeftMailSection, 'p', 'Mail:', 'class', 'p-contact-left-mail-section');
      let contactRightMailSection = createElement(mailDiv, 'div', '', 'class', 'contact-right-section');
        mails.slice(0,2).map((mail, i) => 
          createElement(contactRightMailSection, 'p', mail, 'class', `p-contact-right-mail-section last${i}`)
        )
}

async function createContactList(contactListDiv) {  
  this.contactList = await getContactList();
  this.contactList.reverse().map((contact, idNbr) => 
    exportContactList(contactListDiv,contact.name,contact.phoneNumbers, contact.mails, contact._id, idNbr)
  )
}



function render() { 
  document.body.innerHTML = '';

  let body = document.querySelector('body');
  let outerDiv = createElement(body, 'div', '', 'class', 'outerDiv');
    let createContactDiv = createElement(outerDiv, 'div', '', 'class', 'create-contact');
      let h2 = createElement(createContactDiv, 'h2', 'Fyll i dina kontaktuppgifter:', 'class', 'h2');
      let inputName = createElement(createContactDiv, 'input', '', 'class', 'input input-name');
        inputName.setAttribute('type','text');
        inputName.value = this.inputData.name;
        inputName.placeholder = 'Fyll i ditt namn här...';
      
      this.inputData.phoneNumbers.map(obj => 
        createPhoneNbrInput(obj.id, createContactDiv, obj.phoneNumber)
      )
      this.inputData.mails.map((obj) => 
        createMailInput(obj.id, createContactDiv, obj.mail)
      )
      let addPhoneButton = createElement(createContactDiv, 'button', 'Lägg till fler telefonnummer', 'class', 'button add-phone-button');
      let addMailButton = createElement(createContactDiv, 'button', 'Lägg till fler mail-adresser', 'class', 'button add-mail-button');
      let addContactButton = createElement(createContactDiv, 'button', 'Lägg till kontakt', 'class', 'button add-contact-button');

    let contactListDiv = createElement(outerDiv, 'div', '', 'class', 'contact-list');
      createContactList(contactListDiv);

}

render();





