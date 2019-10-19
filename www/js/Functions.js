
// // createElement(div, 'p', 'HELLO THERE AWESOME', 'class', 'fine-div fontsize');
// function createElement(daddyElement, element, innerHTMLString, attribute, attributeName) {
//   element = document.createElement(element);
//   element.innerHTML = innerHTMLString ? innerHTMLString : '';
//   element.setAttribute(attribute, attributeName);
//   daddyElement.append(element);
//   return element
// }

// async function getContactList() {
//   let response = await fetch('/api/contacts');
//   let data = await response.json()
//   return data;
// }

// window.addEventListener('change', async e => {
//   if(e.target.closest('.input-name')){
//     this.inputData.name = document.querySelector('.input-name').value;
//   }
//   if(e.target.closest('.input-phone')){
//     collectPhoneNbrs();
//   }
//   if(e.target.closest('.input-mail')){
//     collectMails();
//   }
// })

// window.addEventListener('click', async e => {

//   if(e.target.closest('.remove-phone-button')) {
//     e.preventDefault();
//     let idIndex = this.inputData.phoneNumbers.findIndex(obj => obj.id == e.target.id);
//     if(this.inputData.phoneNumbers.length === 1 ) { return }
//     this.inputData.phoneNumbers.splice(idIndex, 1);
//     render();
//   }

//   if(e.target.closest('.remove-mail-button')) {
//     e.preventDefault();
//     let idIndex = this.inputData.mails.findIndex(obj => obj.id == e.target.id);
//     if(this.inputData.mails.length === 1 ) { return }
//     this.inputData.mails.splice(idIndex, 1);
//     render();
//   }

//   if(e.target.closest('.add-phone-button')) {
//     e.preventDefault();
//     if(this.inputData.phoneNumbers.length === 4) { return }
//     this.inputData.phoneNumbers.push({
//       id: nbr,
//       phoneNumber: ''
//     });
//     this.nbr++;
//     render();
//   }

//   if(e.target.closest('.add-mail-button')) {
//     e.preventDefault();
//     if(this.inputData.mails.length === 4) { return }
//     this.inputData.mails.push({
//       id: nbr,
//       mail: ''
//     });
//     this.nbr++;
//     render();
//   }
  
//   if(e.target.closest('.add-contact-button')){
//     e.preventDefault();
//     collectPhoneNbrs();
//     collectMails();

//     if(this.inputData.name === '') {this.inputData.name = 'Ananymous'}
//     let contactData = {
//       name: this.inputData.name,
//       phoneNumbers: [],
//       mails: []
//     }
//     this.inputData.phoneNumbers.forEach(obj => contactData.phoneNumbers.push(obj.phoneNumber));
//     this.inputData.mails.forEach(obj => contactData.mails.push(obj.mail));
//     const response = await fetch('/api/contacts/add', {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(contactData) // body contactData type must match "Content-Type" header
//     });
//     cleanInputFields();
//     render();
//     return await response.json(); // parses JSON response into native JavaScript objects
//   }

  
//   if(e.target.closest('.remove-phone-button2')) {
//     e.preventDefault();
//     let idIndex = this.editInputData.phoneNumbers.findIndex(obj => obj.id == e.target.id);
//     if(this.editInputData.phoneNumbers.length === 1 ) { return }
//     this.editInputData.phoneNumbers.splice(idIndex, 1);
//     renderEditContact();
//   }

//   if(e.target.closest('.remove-mail-button2')) {
//     e.preventDefault();
//     let idIndex = this.editInputData.mails.findIndex(obj => obj.id == e.target.id);
//     if(this.editInputData.mails.length === 1 ) { return }
//     this.editInputData.mails.splice(idIndex, 1);
//     renderEditContact();
//   }

//   if(e.target.closest('.add-phone-button2')) {
//     e.preventDefault();
//     if(this.editInputData.phoneNumbers.length === 4) { return }
//     this.editInputData.phoneNumbers.push({
//       id: nbr,
//       phoneNumber: ''
//     });
//     this.nbr++;
//     renderEditContact();
//   }

//   if(e.target.closest('.add-mail-button2')) {
//     e.preventDefault();
//     if(this.editInputData.mails.length === 4) { return }
//     this.editInputData.mails.push({
//       id: nbr,
//       mail: ''
//     });
//     this.nbr++;
//     renderEditContact();
//   }

//   if(e.target.closest('.remove-button2')) {
//     e.preventDefault();
//     let phoneArr = [];
//     let phoneNbrs = this.data.history[e.target.id].phoneNumbers
//     for(nbr = 0; nbr < phoneNbrs.length; nbr++) {
//       let obj = {};
//       obj.id = nbr,
//       obj.phoneNumber = phoneNbrs[nbr]
//       phoneArr.push(obj)
//     }
//     let mailArr = [];
//     let mails = this.data.history[e.target.id].mails
//     for(mail = 0; mail < mails.length; mail++) {
//       let obj = {};
//       obj.id = mail,
//       obj.mail = mails[mail]
//       mailArr.push(obj)
//     }
//     this.editInputData.name = this.data.history[e.target.id].name
//     this.editInputData.phoneNumbers = phoneArr;
//     this.editInputData.mails = mailArr;

//     renderEditContact();
//   }

//   if(e.target.closest('.input-name2')){
//     this.editInputData.name = document.querySelector('.input-name2').value;
//   }
//   if(e.target.closest('.input-phone2')){
//     collectPhoneNbrs2();
//   }
//   if(e.target.closest('.input-mail2')){
//     collectMails2();
//   }
  
//   if(e.target.closest('.edit-contact-button2')){
//     e.preventDefault();
//     collectPhoneNbrs2();
//     collectMails2();

//     if(this.editInputData.name === '') {this.editInputData.name = 'Ananymous'}
//     let date = JSON.stringify(new Date())
//     date = date.slice(0,11) + ' ' + date.slice(11,20);
//     let contactData = {
//       name: this.editInputData.name,
//       phoneNumbers: [],
//       mails: [],
//       _id: location.pathname.slice(1),
//       history: []
//     }
//     let removedHistory = Object.assign(contactData);
//     delete removedHistory.history;
//     removedHistory = {...removedHistory}
//     removedHistory.date = date;
//     contactData.history = [removedHistory, ...this.data.history];
//     this.data.history.push(removedHistory)

//     this.editInputData.phoneNumbers.forEach(obj => contactData.phoneNumbers.push(obj.phoneNumber));
//     this.editInputData.mails.forEach(obj => contactData.mails.push(obj.mail));

//     const response = await fetch('/api/contacts/update', {
//       method: 'PUT', 
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(contactData) 
//     });
//     cleanInputFields2();
//     renderEditContact();
//     // return await response.json();
//   }
// })

// document.addEventListener('mouseover', e => {
//   if(e.target.closest('.contact-card')){
//     let contactCard = e.target.closest('.contact-card');
    
//   }
// })

// window.addEventListener('change', async e => {
  
//   if(e.target.closest('.input-name2')){
//     this.editInputData.name = document.querySelector('.input-name2').value;
//   }
//   if(e.target.closest('.input-phone2')){
//     collectPhoneNbrs2();
//   }
//   if(e.target.closest('.input-mail2')){
//     collectMails2();
//   }
// })

// function createPhoneNbrInput(nbr, createContactDiv, phoneNbr) { 
//   let inputPhoneDiv = createElement(createContactDiv, 'div', '', 'class', 'phone-div')
//   inputPhoneDiv.setAttribute('id', nbr);
//     let inputPhone = createElement(inputPhoneDiv, 'input', '', 'class', 'input input-phone');
//     inputPhone.setAttribute('type','text');
//     inputPhone.value = phoneNbr;
//     inputPhone.placeholder = 'Fyll i ditt telefonnummer här...';
//     let removePhoneButton = createElement(inputPhoneDiv, 'button', '-', 'class', 'button remove-phone-button');
//     removePhoneButton.setAttribute('id', nbr);
// }

// function createMailInput(nbr, createContactDiv, mail) { 
//   let inputMailDiv = createElement(createContactDiv, 'div', '', 'class', 'mail-div')
//   inputMailDiv.setAttribute('id', nbr);
//     let inputMail = createElement(inputMailDiv, 'input', '', 'class', 'input input-mail');
//     inputMail.setAttribute('type','text');
//     inputMail.value = mail;
//     inputMail.placeholder = 'Fyll i din mail här...';
//     let removeMailButton = createElement(inputMailDiv, 'button', '-', 'class', 'button remove-mail-button');
//     removeMailButton.setAttribute('id', nbr);
// }

// function exportContactList(contactListDiv, name, phoneNumbers, mails, url, idNbr) {
//   let aLink = createElement(contactListDiv, 'a', '', 'class', 'a');
//   aLink.setAttribute('href', url)
//   let contactCard = createElement(aLink, 'button', '', 'class', 'contact-card');
//   let removeButton = createElement(contactCard, 'button', 'X', 'class', 'remove-button');
//   removeButton.setAttribute('id', idNbr+999)
//   let contactLogo = createElement(contactCard, 'div', '', 'class', 'contact-logo');
//   let contactName = createElement(contactCard, 'p', name, 'class', 'contact-name');
  
//     let phoneDiv = createElement(contactCard, 'p', '', 'class', 'contact-phone-div');
//       let contactLeftPhoneSection = createElement(phoneDiv, 'div', '', 'class', 'contact-left-section'); 
//         let contactPLeftPhoneSection = createElement(contactLeftPhoneSection, 'p', 'Telefonnummer:', 'class', 'p-contact-left-phone-section');
//       let contactRightPhoneSection = createElement(phoneDiv, 'div', '', 'class', 'contact-right-section'); 
//         phoneNumbers.slice(0,2).map((phoneNbr, i) => 
//           createElement(contactRightPhoneSection, 'p', phoneNbr, 'class', `p-contact-right-phone-section last${i}`)
//         )
//     let mailDiv = createElement(contactCard, 'p', '', 'class', 'contact-mail-div');
//       let contactLeftMailSection = createElement(mailDiv, 'div', '', 'class', 'contact-left-section'); 
//         let contactPLeftMailSection = createElement(contactLeftMailSection, 'p', 'Mail:', 'class', 'p-contact-left-mail-section');
//       let contactRightMailSection = createElement(mailDiv, 'div', '', 'class', 'contact-right-section');
//         mails.slice(0,2).map((mail, i) => 
//           createElement(contactRightMailSection, 'p', mail, 'class', `p-contact-right-mail-section last${i}`)
//         )
// }

// async function createContactList(contactListDiv) {  
//   this.contactList = await getContactList();
//   this.contactList.reverse().map((contact, idNbr) => 
//     exportContactList(contactListDiv,contact.name,contact.phoneNumbers, contact.mails, contact._id, idNbr)
//   )
// }





