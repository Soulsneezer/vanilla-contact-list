class EditContactsPage{
  constructor(addContactsPage) {
    this.addContactsPage = addContactsPage;
    this.wrapsUpAllEventListeners();
    this.editInputData = {};
    this.nbr = 0;
  }

  async getContact() {
    let response = await fetch('/api/contacts/' + location.pathname.slice(1));
    this.data = await response.json()
    return this.data;
  }

  wrapsUpAllEventListeners() {
    window.addEventListener('click', async e => {
      this.data = await this.getContact();
  
      if(e.target.closest('.remove-phone-button2')) {
        e.preventDefault();
        if(this.editInputData.phoneNumbers) {
          if(this.editInputData.phoneNumbers.length === 1 ) { return }
          let idIndex = this.editInputData.phoneNumbers.findIndex(obj => obj.id == e.target.id);
          this.editInputData.phoneNumbers.splice(idIndex, 1);
          this.renderEditContact(this.editInputData);
        }
      }
    
      if(e.target.closest('.remove-mail-button2')) {
        e.preventDefault();
        if(this.editInputData.mails) {
          if(this.editInputData.mails.length === 1 ) { return }
          let idIndex = this.editInputData.mails.findIndex(obj => obj.id == e.target.id);
          this.editInputData.mails.splice(idIndex, 1);
          this.renderEditContact(this.editInputData);
        }
      }
    
      if(e.target.closest('.add-phone-button2')) {
        e.preventDefault();
        if(this.editInputData.phoneNumbers) {
          if(this.editInputData.phoneNumbers.length === 4) { return }
          this.editInputData.phoneNumbers.push({
            id: this.nbr,
            phoneNumber: ''
          });
          this.nbr++;
          this.renderEditContact(this.editInputData);
        }
      }
    
      if(e.target.closest('.add-mail-button2')) {
        e.preventDefault();
        if(this.editInputData.mails) {
          if(this.editInputData.mails.length === 4) { return }
          this.editInputData.mails.push({
            id: this.nbr,
            mail: ''
          });
          this.nbr++;
          this.renderEditContact(this.editInputData);
        }
      }
    
      if(e.target.closest('.remove-button2')) {
        e.preventDefault();
        let phoneArr = [];
        let phoneNbrs = this.data.history[e.target.id].phoneNumbers
        for(let nbr = 0; nbr < phoneNbrs.length; nbr++) {
          let obj = {};
          obj.id = nbr,
          obj.phoneNumber = phoneNbrs[nbr]
          phoneArr.push(obj)
        }
        let mailArr = [];
        let mails = this.data.history[e.target.id].mails
        for(let mail = 0; mail < mails.length; mail++) {
          let obj = {};
          obj.id = mail,
          obj.mail = mails[mail]
          mailArr.push(obj)
        }
        this.editInputData.name = this.data.history[e.target.id].name
        this.editInputData.phoneNumbers = phoneArr;
        this.editInputData.mails = mailArr;
    
        this.renderEditContact(this.editInputData);
      }
      
      if(e.target.closest('.edit-contact-button2')){
        e.preventDefault();
        this.collectPhoneNbrs2();
        this.collectMails2();
    
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
        this.cleanInputFields2();
        this.renderEditContact(this.editInputData);
      }
    })
    
    window.addEventListener('change', async e => {
    
      if(e.target.closest('.input-name2')){
        this.editInputData.name = document.querySelector('.input-name2').value;
      }
      if(e.target.closest('.input-phone2')){
        this.collectPhoneNbrs2();
      }
      if(e.target.closest('.input-mail2')){
        this.collectMails2();
      }
    })
    
    window.addEventListener('click', async e => {
      if(e.target.closest('.input-name2')){
        this.editInputData.name = document.querySelector('.input-name2').value;
      }
      if(e.target.closest('.input-phone2')){
        this.collectPhoneNbrs2();
      }
      if(e.target.closest('.input-mail2')){
        this.collectMails2();
      }
    })
  }

  collectPhoneNbrs2() {
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

  collectMails2() {
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

  cleanInputFields2(){
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

  async getEditContactList(){
    this.contactList = await this.addContactsPage.getContactList()
    let idIndex2 = this.contactList.findIndex(obj => obj._id == location.pathname.substr(1));
    let editContactList = this.contactList[idIndex2];
  
    return editContactList;
  }

  insertEditContactListToEditInputData(editContactList) {
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

  createPhoneNbrInput2(nbr, createContactDiv, phoneNbr) { 
    let inputPhoneDiv = this.addContactsPage.createElement(createContactDiv, 'div', '', 'class', 'phone-div2')
    inputPhoneDiv.setAttribute('id', nbr);
      let inputPhone = this.addContactsPage.createElement(inputPhoneDiv, 'input', '', 'class', 'input input-phone2');
      inputPhone.setAttribute('type','text');
      inputPhone.value = phoneNbr;
      inputPhone.placeholder = 'Fyll i ditt telefonnummer här...';
      let removePhoneButton = this.addContactsPage.createElement(inputPhoneDiv, 'button', '-', 'class', 'button remove-phone-button2');
      removePhoneButton.setAttribute('id', nbr);
  }
  
  createMailInput2(nbr, createContactDiv, mail) { 
    let inputMailDiv = this.addContactsPage.createElement(createContactDiv, 'div', '', 'class', 'mail-div2')
    inputMailDiv.setAttribute('id', nbr);
      let inputMail = this.addContactsPage.createElement(inputMailDiv, 'input', '', 'class', 'input input-mail2');
      inputMail.setAttribute('type','text');
      inputMail.value = mail;
      inputMail.placeholder = 'Fyll i din mail här...';
      let removeMailButton = this.addContactsPage.createElement(inputMailDiv, 'button', '-', 'class', 'button remove-mail-button2');
      removeMailButton.setAttribute('id', nbr);
  }

  async createContactList2(contactListDiv2) {
    this.data = await this.getContact();
    this.data.history.map((contact, idNbr) => 
      this.exportContactList2(contactListDiv2,contact.name,contact.phoneNumbers, contact.mails, contact.date, idNbr)
    )
  }

  exportContactList2(contactListDiv2, name, phoneNumbers, mails, date, idNbr) {
    let contactCard = this.addContactsPage.createElement(contactListDiv2, 'button', '', 'class', 'contact-card2');
    let removeButton = this.addContactsPage.createElement(contactCard, 'button', 'Redigera', 'class', 'remove-button2');
    removeButton.setAttribute('id', idNbr)
    let contactLogo = this.addContactsPage.createElement(contactCard, 'div', '', 'class', 'contact-logo2');
    let contactName = this.addContactsPage.createElement(contactCard, 'p', name, 'class', 'contact-name2');
    let contactDate = this.addContactsPage.createElement(contactCard, 'p', 'Senast redigerad: ' + date, 'class', 'p-date');
    
      let phoneDiv = this.addContactsPage.createElement(contactCard, 'p', '', 'class', 'contact-phone-div2');
        let contactLeftPhoneSection = this.addContactsPage.createElement(phoneDiv, 'div', '', 'class', 'contact-left-section2'); 
          let contactPLeftPhoneSection = this.addContactsPage.createElement(contactLeftPhoneSection, 'p', 'Telefonnummer:', 'class', 'p-contact-left-phone-section2');
        let contactRightPhoneSection = this.addContactsPage.createElement(phoneDiv, 'div', '', 'class', 'contact-right-section2'); 
          phoneNumbers.slice(0,6).map((phoneNbr, i) => 
            this.addContactsPage.createElement(contactRightPhoneSection, 'p', phoneNbr, 'class', `p-contact-right-phone-section last${i}2`)
          )
      let mailDiv = this.addContactsPage.createElement(contactCard, 'p', '', 'class', 'contact-mail-div2');
        let contactLeftMailSection = this.addContactsPage.createElement(mailDiv, 'div', '', 'class', 'contact-left-section2'); 
          let contactPLeftMailSection = this.addContactsPage.createElement(contactLeftMailSection, 'p', 'Mail:', 'class', 'p-contact-left-mail-section2');
        let contactRightMailSection = this.addContactsPage.createElement(mailDiv, 'div', '', 'class', 'contact-right-section2');
          mails.slice(0,6).map((mail, i) => 
            this.addContactsPage.createElement(contactRightMailSection, 'p', mail, 'class', `p-contact-right-mail-section last${i}2`)
          )
  }

  async renderEditContact(editInputData) {
    this.editInputData = editInputData;
  
    document.body.innerHTML = '';
    let body = document.querySelector('body');
    let outerDiv2 = this.addContactsPage.createElement(body, 'div', '', 'class', 'outerDiv2');
      let createContactDiv2 = this.addContactsPage.createElement(outerDiv2, 'div', '', 'class', 'create-contact2');
        let h2 = this.addContactsPage.createElement(createContactDiv2, 'h2', 'Redigera dina kontaktuppgifter:', 'class', 'h2');
  
  
        let inputName = this.addContactsPage.createElement(createContactDiv2, 'input', '', 'class', 'input input-name2');
          inputName.setAttribute('type','text');
          inputName.value = this.editInputData.name;
          inputName.placeholder = 'Fyll i ditt namn här...';
        
        this.editInputData.phoneNumbers.map((obj) => 
          this.createPhoneNbrInput2(obj.id, createContactDiv2, obj.phoneNumber)
        )
        this.editInputData.mails.map((obj) => 
          this.createMailInput2(obj.id, createContactDiv2, obj.mail)
        )
        let addPhoneButton = this.addContactsPage.createElement(createContactDiv2, 'button', 'Lägg till fler telefonnummer', 'class', 'button add-phone-button2');
        let addMailButton = this.addContactsPage.createElement(createContactDiv2, 'button', 'Lägg till fler mail-adresser', 'class', 'button add-mail-button2');
        let addContactButton = this.addContactsPage.createElement(createContactDiv2, 'button', 'Spara ändringar', 'class', 'button edit-contact-button2');
  
      let contactListDiv2 = this.addContactsPage.createElement(outerDiv2, 'div', '', 'class', 'contact-list2');
        this.createContactList2(contactListDiv2);
  
  }
}
