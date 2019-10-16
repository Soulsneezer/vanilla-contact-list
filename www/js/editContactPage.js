async function getContact() {
  let response = await fetch('/api/contacts/' + location.pathname.slice(1));
  this.data = await response.json()
  return this.data;
}

window.addEventListener('click', async e => {

  if(e.target.closest('.remove-phone-button2')) {
    e.preventDefault();
    let idIndex = this.editInputData.phoneNumbers.findIndex(obj => obj.id == e.target.id);
    if(this.editInputData.phoneNumbers.length === 1 ) { return }
    this.editInputData.phoneNumbers.splice(idIndex, 1);
    renderEditContact();
  }

  if(e.target.closest('.remove-mail-button2')) {
    e.preventDefault();
    let idIndex = this.editInputData.mails.findIndex(obj => obj.id == e.target.id);
    if(this.editInputData.mails.length === 1 ) { return }
    this.editInputData.mails.splice(idIndex, 1);
    renderEditContact();
  }

  if(e.target.closest('.add-phone-button2')) {
    e.preventDefault();
    if(this.editInputData.phoneNumbers.length === 4) { return }
    this.editInputData.phoneNumbers.push({
      id: nbr,
      phoneNumber: ''
    });
    this.nbr++;
    renderEditContact();
  }

  if(e.target.closest('.add-mail-button2')) {
    e.preventDefault();
    if(this.editInputData.mails.length === 4) { return }
    this.editInputData.mails.push({
      id: nbr,
      mail: ''
    });
    this.nbr++;
    renderEditContact();
  }

  if(e.target.closest('.remove-button2')) {
    e.preventDefault();
    let phoneArr = [];
    let phoneNbrs = this.data.history[e.target.id].phoneNumbers
    for(nbr = 0; nbr < phoneNbrs.length; nbr++) {
      let obj = {};
      obj.id = nbr,
      obj.phoneNumber = phoneNbrs[nbr]
      phoneArr.push(obj)
    }
    let mailArr = [];
    let mails = this.data.history[e.target.id].mails
    for(mail = 0; mail < mails.length; mail++) {
      let obj = {};
      obj.id = mail,
      obj.mail = mails[mail]
      mailArr.push(obj)
    }
    this.editInputData.name = this.data.history[e.target.id].name
    this.editInputData.phoneNumbers = phoneArr;
    this.editInputData.mails = mailArr;

    renderEditContact();
  }
  
  if(e.target.closest('.edit-contact-button2')){
    e.preventDefault();
    collectPhoneNbrs2();
    collectMails2();

    if(this.editInputData.name === '') {this.editInputData.name = 'Ananymous'}
    let date = JSON.stringify(new Date())
    date = date.slice(0,11) + ' ' + date.slice(11,20);
    let contactData = {
      name: this.editInputData.name,
      phoneNumbers: [],
      mails: [],
      _id: location.pathname.slice(1),
      history: []
    }
    let removedHistory = Object.assign(contactData);
    delete removedHistory.history;
    removedHistory = {...removedHistory}
    removedHistory.date = date;
    contactData.history = [removedHistory, ...this.data.history];
    this.data.history.push(removedHistory)

    this.editInputData.phoneNumbers.forEach(obj => contactData.phoneNumbers.push(obj.phoneNumber));
    this.editInputData.mails.forEach(obj => contactData.mails.push(obj.mail));

    const response = await fetch('/api/contacts/update', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData) 
    });
    cleanInputFields2();
    renderEditContact();
    // return await response.json();
  }
})

window.addEventListener('change', async e => {

  if(e.target.closest('.input-name2')){
    this.editInputData.name = document.querySelector('.input-name2').value;
  }
  if(e.target.closest('.input-phone2')){
    collectPhoneNbrs2();
  }
  if(e.target.closest('.input-mail2')){
    collectMails2();
  }
})

window.addEventListener('click', async e => {
  if(e.target.closest('.input-name2')){
    this.editInputData.name = document.querySelector('.input-name2').value;
  }
  if(e.target.closest('.input-phone2')){
    collectPhoneNbrs2();
  }
  if(e.target.closest('.input-mail2')){
    collectMails2();
  }
})

function cleanInputFields2(){
  this.editInputData.name = document.querySelector('.input-name2').value;
  this.editInputData.name = '';

  let selectedPhoneNbrs = document.querySelectorAll('.input-phone2');
  let phoneNbrsArray = [];
  selectedPhoneNbrs.forEach((phoneNbr, i) => (
    phoneNbrsArray.push({
      id: selectedPhoneNbrs[i].parentElement.id,
      phoneNumber: ''
    })
  ));
  this.editInputData.phoneNumbers = phoneNbrsArray;
  this.editInputData.phoneNumbers.length = 1;
  let selectedMails = document.querySelectorAll('.input-mail2');
  let mailsArray = [];
  selectedMails.forEach((mail, i) => (
    mailsArray.push({
      id: selectedMails[i].parentElement.id,
      mail: ''
    })
  ));
  this.editInputData.mails = mailsArray;
  this.editInputData.mails.length = 1;
}

function collectPhoneNbrs2() {
  let selectedPhoneNbrs = document.querySelectorAll('.input-phone2');
  let phoneNbrsArray = [];
  selectedPhoneNbrs.forEach((phoneNbr, i) => (
    phoneNbrsArray.push({
      id: selectedPhoneNbrs[i].parentElement.id,
      phoneNumber: phoneNbr.value.slice(0,15)
    })
  ));
  this.editInputData.phoneNumbers = phoneNbrsArray;
}

function collectMails2() {
  let selectedMails = document.querySelectorAll('.input-mail2');
  let mailsArray = [];
  selectedMails.forEach((mail, i) => (
    mailsArray.push({
      id: selectedMails[i].parentElement.id,
      mail: mail.value.slice(0,25)
    })
  ));
  this.editInputData.mails = mailsArray;
}


function createPhoneNbrInput2(nbr, createContactDiv, phoneNbr) { 
  let inputPhoneDiv = createElement(createContactDiv, 'div', '', 'class', 'phone-div2')
  inputPhoneDiv.setAttribute('id', nbr);
    let inputPhone = createElement(inputPhoneDiv, 'input', '', 'class', 'input input-phone2');
    inputPhone.setAttribute('type','text');
    inputPhone.value = phoneNbr;
    inputPhone.placeholder = 'Fyll i ditt telefonnummer här...';
    let removePhoneButton = createElement(inputPhoneDiv, 'button', '-', 'class', 'button remove-phone-button2');
    removePhoneButton.setAttribute('id', nbr);
}

function createMailInput2(nbr, createContactDiv, mail) { 
  let inputMailDiv = createElement(createContactDiv, 'div', '', 'class', 'mail-div2')
  inputMailDiv.setAttribute('id', nbr);
    let inputMail = createElement(inputMailDiv, 'input', '', 'class', 'input input-mail2');
    inputMail.setAttribute('type','text');
    inputMail.value = mail;
    inputMail.placeholder = 'Fyll i din mail här...';
    let removeMailButton = createElement(inputMailDiv, 'button', '-', 'class', 'button remove-mail-button2');
    removeMailButton.setAttribute('id', nbr);
}


function getEditContactList(){
  console.log(this.contactList)
  let idIndex2 = this.contactList.findIndex(obj => obj._id == location.pathname.substr(1));
  let editContactList = this.contactList[idIndex2];

  return editContactList;
}

function insertEditContactListToEditInputData(editContactList) {
  let editInputData = {
    name: '',
    phoneNumbers: [],
    mails: []
  }
  editInputData.name = editContactList.name;
  for(let phoneNbr = 0; phoneNbr < editContactList.phoneNumbers.length; phoneNbr ++) {
    let obj = {};
    let phoneNumber = editContactList.phoneNumbers[phoneNbr];
    obj.id = phoneNbr + 111;
    obj.phoneNumber = phoneNumber
    editInputData.phoneNumbers.push(obj)
  }
  for(let email = 0; email < editContactList.mails.length; email ++) {
    let obj = {};
    let mail = editContactList.mails[email];
    obj.id = email + 211;
    obj.mail = mail
    editInputData.mails.push(obj)
  }
  return editInputData;
}

function exportContactList2(contactListDiv2, name, phoneNumbers, mails, date, idNbr) {
  let contactCard = createElement(contactListDiv2, 'button', '', 'class', 'contact-card2');
  let removeButton = createElement(contactCard, 'button', 'Redigera', 'class', 'remove-button2');
  removeButton.setAttribute('id', idNbr)
  let contactLogo = createElement(contactCard, 'div', '', 'class', 'contact-logo2');
  let contactName = createElement(contactCard, 'p', name, 'class', 'contact-name2');
  let contactDate = createElement(contactCard, 'p', 'Senast redigerad: ' + date, 'class', 'p-date');
  
    let phoneDiv = createElement(contactCard, 'p', '', 'class', 'contact-phone-div2');
      let contactLeftPhoneSection = createElement(phoneDiv, 'div', '', 'class', 'contact-left-section2'); 
        let contactPLeftPhoneSection = createElement(contactLeftPhoneSection, 'p', 'Telefonnummer:', 'class', 'p-contact-left-phone-section2');
      let contactRightPhoneSection = createElement(phoneDiv, 'div', '', 'class', 'contact-right-section2'); 
        phoneNumbers.slice(0,6).map((phoneNbr, i) => 
          createElement(contactRightPhoneSection, 'p', phoneNbr, 'class', `p-contact-right-phone-section last${i}2`)
        )
    let mailDiv = createElement(contactCard, 'p', '', 'class', 'contact-mail-div2');
      let contactLeftMailSection = createElement(mailDiv, 'div', '', 'class', 'contact-left-section2'); 
        let contactPLeftMailSection = createElement(contactLeftMailSection, 'p', 'Mail:', 'class', 'p-contact-left-mail-section2');
      let contactRightMailSection = createElement(mailDiv, 'div', '', 'class', 'contact-right-section2');
        mails.slice(0,6).map((mail, i) => 
          createElement(contactRightMailSection, 'p', mail, 'class', `p-contact-right-mail-section last${i}2`)
        )
}

function createContactList2(contactListDiv2) {  
  this.data.history.map((contact, idNbr) => 
    exportContactList2(contactListDiv2,contact.name,contact.phoneNumbers, contact.mails, contact.date, idNbr)
  )
}

async function renderEditContact() {
  await getContact();

  document.body.innerHTML = '';

  let body = document.querySelector('body');
  let outerDiv2 = createElement(body, 'div', '', 'class', 'outerDiv2');
    let createContactDiv2 = createElement(outerDiv2, 'div', '', 'class', 'create-contact2');
      let h2 = createElement(createContactDiv2, 'h2', 'Redigera dina kontaktuppgifter:', 'class', 'h2');


      let inputName = createElement(createContactDiv2, 'input', '', 'class', 'input input-name2');
        inputName.setAttribute('type','text');
        inputName.value = this.editInputData.name;
        inputName.placeholder = 'Fyll i ditt namn här...';
      
      this.editInputData.phoneNumbers.map((obj) => 
        createPhoneNbrInput2(obj.id, createContactDiv2, obj.phoneNumber)
      )
      this.editInputData.mails.map((obj) => 
        createMailInput2(obj.id, createContactDiv2, obj.mail)
      )
      let addPhoneButton = createElement(createContactDiv2, 'button', 'Lägg till fler telefonnummer', 'class', 'button add-phone-button2');
      let addMailButton = createElement(createContactDiv2, 'button', 'Lägg till fler mail-adresser', 'class', 'button add-mail-button2');
      let addContactButton = createElement(createContactDiv2, 'button', 'Spara ändringar', 'class', 'button edit-contact-button2');

    let contactListDiv2 = createElement(outerDiv2, 'div', '', 'class', 'contact-list2');
      createContactList2(contactListDiv2);

}

