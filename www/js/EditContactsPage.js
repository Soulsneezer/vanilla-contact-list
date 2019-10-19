class EditContactsPage extends Component{
  constructor(addContactsPage) {
    super();
    this.addContactsPage = addContactsPage;
    this.eventListener2();
    this.editInputData = {};
    this.nbr = 0;
  }

  async getContact() {
    let response = await fetch('/api/contacts/' + location.pathname.slice(1));
    this.data = await response.json()
    return this.data;
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
    let inputPhoneDiv = this.createElement(createContactDiv, 'div', '', 'class', 'phone-div2')
    inputPhoneDiv.setAttribute('id', nbr);
      let inputPhone = this.createElement(inputPhoneDiv, 'input', '', 'class', 'input input-phone2');
      inputPhone.setAttribute('type','text');
      inputPhone.value = phoneNbr;
      inputPhone.placeholder = 'Fyll i ditt telefonnummer här...';
      let removePhoneButton = this.createElement(inputPhoneDiv, 'button', '-', 'class', 'button remove-phone-button2');
      removePhoneButton.setAttribute('id', nbr);
  }
  
  createMailInput2(nbr, createContactDiv, mail) { 
    let inputMailDiv = this.createElement(createContactDiv, 'div', '', 'class', 'mail-div2')
    inputMailDiv.setAttribute('id', nbr);
      let inputMail = this.createElement(inputMailDiv, 'input', '', 'class', 'input input-mail2');
      inputMail.setAttribute('type','text');
      inputMail.value = mail;
      inputMail.placeholder = 'Fyll i din mail här...';
      let removeMailButton = this.createElement(inputMailDiv, 'button', '-', 'class', 'button remove-mail-button2');
      removeMailButton.setAttribute('id', nbr);
  }

  async createContactList2(contactListDiv2) {
    this.data = await this.getContact();
    this.data.history.map((contact, idNbr) => 
      this.exportContactList2(contactListDiv2,contact.name,contact.phoneNumbers, contact.mails, contact.date, idNbr)
    )
  }

  exportContactList2(contactListDiv2, name, phoneNumbers, mails, date, idNbr) {
    let contactCard = this.createElement(contactListDiv2, 'button', '', 'class', 'contact-card2');
    let removeButton = this.createElement(contactCard, 'button', 'Redigera', 'class', 'remove-button2');
    removeButton.setAttribute('id', idNbr)
    let contactLogo = this.createElement(contactCard, 'div', '', 'class', 'contact-logo2');
    let contactName = this.createElement(contactCard, 'p', name, 'class', 'contact-name2');
    let contactDate = this.createElement(contactCard, 'p', 'Senast redigerad: ' + date, 'class', 'p-date');
    
      let phoneDiv = this.createElement(contactCard, 'p', '', 'class', 'contact-phone-div2');
        let contactLeftPhoneSection = this.createElement(phoneDiv, 'div', '', 'class', 'contact-left-section2'); 
          let contactPLeftPhoneSection = this.createElement(contactLeftPhoneSection, 'p', 'Telefonnummer:', 'class', 'p-contact-left-phone-section2');
        let contactRightPhoneSection = this.createElement(phoneDiv, 'div', '', 'class', 'contact-right-section2'); 
          phoneNumbers.slice(0,6).map((phoneNbr, i) => 
            this.createElement(contactRightPhoneSection, 'p', phoneNbr, 'class', `p-contact-right-phone-section last${i}2`)
          )
      let mailDiv = this.createElement(contactCard, 'p', '', 'class', 'contact-mail-div2');
        let contactLeftMailSection = this.createElement(mailDiv, 'div', '', 'class', 'contact-left-section2'); 
          let contactPLeftMailSection = this.createElement(contactLeftMailSection, 'p', 'Mail:', 'class', 'p-contact-left-mail-section2');
        let contactRightMailSection = this.createElement(mailDiv, 'div', '', 'class', 'contact-right-section2');
          mails.slice(0,6).map((mail, i) => 
            this.createElement(contactRightMailSection, 'p', mail, 'class', `p-contact-right-mail-section last${i}2`)
          )
  }

  async renderEditContact(editInputData) {
    this.editInputData = editInputData;
  
    document.body.innerHTML = '';
    let body = document.querySelector('body');
    let outerDiv2 = this.createElement(body, 'div', '', 'class', 'outerDiv2');
      let createContactDiv2 = this.createElement(outerDiv2, 'div', '', 'class', 'create-contact2');
        let h2 = this.createElement(createContactDiv2, 'h2', 'Redigera dina kontaktuppgifter:', 'class', 'h2');
  
  
        let inputName = this.createElement(createContactDiv2, 'input', '', 'class', 'input input-name2');
          inputName.setAttribute('type','text');
          inputName.value = this.editInputData.name;
          inputName.placeholder = 'Fyll i ditt namn här...';
        
        this.editInputData.phoneNumbers.map((obj) => 
          this.createPhoneNbrInput2(obj.id, createContactDiv2, obj.phoneNumber)
        )
        this.editInputData.mails.map((obj) => 
          this.createMailInput2(obj.id, createContactDiv2, obj.mail)
        )
        let addPhoneButton = this.createElement(createContactDiv2, 'button', 'Lägg till fler telefonnummer', 'class', 'button add-phone-button2');
        let addMailButton = this.createElement(createContactDiv2, 'button', 'Lägg till fler mail-adresser', 'class', 'button add-mail-button2');
        let addContactButton = this.createElement(createContactDiv2, 'button', 'Spara ändringar', 'class', 'button edit-contact-button2');
  
      let contactListDiv2 = this.createElement(outerDiv2, 'div', '', 'class', 'contact-list2');
        this.createContactList2(contactListDiv2);
  
  }
}
