class AddContactsPage{

  constructor() {
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
    this.getContactList();
    this.wrapsUpAllEventListeners2();
    this.render();
  }
  
  async getContactList() {
    let response = await fetch('/api/contacts');
    let data = await response.json()
    return data;
  }
  
  createElement(daddyElement, element, innerHTMLString, attribute, attributeName) {
    element = document.createElement(element);
    element.innerHTML = innerHTMLString ? innerHTMLString : '';
    element.setAttribute(attribute, attributeName);
    daddyElement.append(element);
    return element
  }
  
  createPhoneNbrInput(nbr, createContactDiv, phoneNbr) { 
    let inputPhoneDiv = this.createElement(createContactDiv, 'div', '', 'class', 'phone-div')
    inputPhoneDiv.setAttribute('id', nbr);
      let inputPhone = this.createElement(inputPhoneDiv, 'input', '', 'class', 'input input-phone');
      inputPhone.setAttribute('type','text');
      inputPhone.value = phoneNbr;
      inputPhone.placeholder = 'Fyll i ditt telefonnummer här...';
      let removePhoneButton = this.createElement(inputPhoneDiv, 'button', '-', 'class', 'button remove-phone-button');
      removePhoneButton.setAttribute('id', nbr);
  }

  createMailInput(nbr, createContactDiv, mail) { 
    let inputMailDiv = this.createElement(createContactDiv, 'div', '', 'class', 'mail-div')
    inputMailDiv.setAttribute('id', nbr);
      let inputMail = this.createElement(inputMailDiv, 'input', '', 'class', 'input input-mail');
      inputMail.setAttribute('type','text');
      inputMail.value = mail;
      inputMail.placeholder = 'Fyll i din mail här...';
      let removeMailButton = this.createElement(inputMailDiv, 'button', '-', 'class', 'button remove-mail-button');
      removeMailButton.setAttribute('id', nbr);
  }

  wrapsUpAllEventListeners2() {
    window.addEventListener('change', async e => {
      if(e.target.closest('.input-name')){
        this.inputData.name = document.querySelector('.input-name').value;
      }
      if(e.target.closest('.input-phone')){
        this.collectPhoneNbrs();
      }
      if(e.target.closest('.input-mail')){
        this.collectMails();
      }
    })
  
    window.addEventListener('click', async e => {

      if(e.target.closest('.remove-phone-button')) {
        e.preventDefault();
        let idIndex = this.inputData.phoneNumbers.findIndex(obj => obj.id == e.target.id);
        if(this.inputData.phoneNumbers.length === 1 ) { return }
        this.inputData.phoneNumbers.splice(idIndex, 1);
        this.render();
      }
    
      if(e.target.closest('.remove-mail-button')) {
        e.preventDefault();
        let idIndex = this.inputData.mails.findIndex(obj => obj.id == e.target.id);
        if(this.inputData.mails.length === 1 ) { return }
        this.inputData.mails.splice(idIndex, 1);
        this.render();
      }
    
      if(e.target.closest('.add-phone-button')) {
        e.preventDefault();
        if(this.inputData.phoneNumbers.length === 4) { return }
        this.inputData.phoneNumbers.push({
          id: this.nbr,
          phoneNumber: ''
        });
        this.nbr++;
        this.render();
      }
    
      if(e.target.closest('.add-mail-button')) {
        e.preventDefault();
        if(this.inputData.mails.length === 4) { return }
        this.inputData.mails.push({
          id: this.nbr,
          mail: ''
        });
        this.nbr++;
        this.render();
      }
      
      if(e.target.closest('.add-contact-button')){
        e.preventDefault();
        this.collectPhoneNbrs();
        this.collectMails();
        if(this.inputData.name === '') {this.inputData.name = 'Ananymous'}
        let contactData = {
          name: this.inputData.name,
          phoneNumbers: [],
          mails: []
        }
        this.inputData.phoneNumbers.forEach(obj => contactData.phoneNumbers.push(obj.phoneNumber));
        this.inputData.mails.forEach(obj => contactData.mails.push(obj.mail));
        const response = await fetch('/api/contacts/add', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contactData)
        });
        this.cleanInputFields();
        this.render();
        // return await response.json();
      }
    
    })
  
    document.addEventListener('mouseover', e => {
      if(e.target.closest('.contact-card')){
        let contactCard = e.target.closest('.contact-card');
        
      }
    })
  }

  
  collectPhoneNbrs() {
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
  
  collectMails() {
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
  
  cleanInputFields(){
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
  
  async removeThisContact(e) {
    e.preventDefault();
    let contactCard = e.target.closest('a');
    let contactObjId = contactCard.href.slice(22);      
  
    let contactIndex = this.contactList.findIndex(contact => contact._id == contactObjId);
    let contactObj = this.contactList.splice(contactIndex, 1)[0];
  
    const response = await fetch('/api/contacts/delete/' + contactObj._id, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json"
      }      
    });
    this.cleanInputFields();
    this.render();
    return await response.json();
  }


  exportContactList(contactListDiv, name, phoneNumbers, mails, url, idNbr) {
    let aLink = this.createElement(contactListDiv, 'a', '', 'class', 'a');
    aLink.setAttribute('href', url)
    let contactCard = this.createElement(aLink, 'button', '', 'class', 'contact-card');
    let removeButton = this.createElement(contactCard, 'button', 'X', 'class', 'remove-button');
    removeButton.setAttribute('id', idNbr+999)
    let contactLogo = this.createElement(contactCard, 'div', '', 'class', 'contact-logo');
    let contactName = this.createElement(contactCard, 'p', name, 'class', 'contact-name');
    
      let phoneDiv = this.createElement(contactCard, 'p', '', 'class', 'contact-phone-div');
        let contactLeftPhoneSection = this.createElement(phoneDiv, 'div', '', 'class', 'contact-left-section'); 
          let contactPLeftPhoneSection = this.createElement(contactLeftPhoneSection, 'p', 'Telefonnummer:', 'class', 'p-contact-left-phone-section');
        let contactRightPhoneSection = this.createElement(phoneDiv, 'div', '', 'class', 'contact-right-section'); 
          phoneNumbers.slice(0,2).map((phoneNbr, i) => 
            this.createElement(contactRightPhoneSection, 'p', phoneNbr, 'class', `p-contact-right-phone-section last${i}`)
          )
      let mailDiv = this.createElement(contactCard, 'p', '', 'class', 'contact-mail-div');
        let contactLeftMailSection = this.createElement(mailDiv, 'div', '', 'class', 'contact-left-section'); 
          let contactPLeftMailSection = this.createElement(contactLeftMailSection, 'p', 'Mail:', 'class', 'p-contact-left-mail-section');
        let contactRightMailSection = this.createElement(mailDiv, 'div', '', 'class', 'contact-right-section');
          mails.slice(0,2).map((mail, i) => 
            this.createElement(contactRightMailSection, 'p', mail, 'class', `p-contact-right-mail-section last${i}`)
          )
  }
  
  async createContactList(contactListDiv) {  
    this.contactList = await this.getContactList();
    this.contactList.reverse().map((contact, idNbr) => 
      this.exportContactList(contactListDiv,contact.name,contact.phoneNumbers, contact.mails, contact._id, idNbr)
    )
  }
  
  
  render() { 
    document.body.innerHTML = '';
  
    let body = document.querySelector('body');
    let outerDiv = this.createElement(body, 'div', '', 'class', 'outerDiv');
      let createContactDiv = this.createElement(outerDiv, 'div', '', 'class', 'create-contact');
        let h2 = this.createElement(createContactDiv, 'h2', 'Fyll i dina kontaktuppgifter:', 'class', 'h2');
        let inputName = this.createElement(createContactDiv, 'input', '', 'class', 'input input-name');
          inputName.setAttribute('type','text');
          inputName.value = this.inputData.name;
          inputName.placeholder = 'Fyll i ditt namn här...';
        
        this.inputData.phoneNumbers.map(obj => 
          this.createPhoneNbrInput(obj.id, createContactDiv, obj.phoneNumber)
        )
        this.inputData.mails.map((obj) => 
          this.createMailInput(obj.id, createContactDiv, obj.mail)
        )
        let addPhoneButton = this.createElement(createContactDiv, 'button', 'Lägg till fler telefonnummer', 'class', 'button add-phone-button');
        let addMailButton = this.createElement(createContactDiv, 'button', 'Lägg till fler mail-adresser', 'class', 'button add-mail-button');
        let addContactButton = this.createElement(createContactDiv, 'button', 'Lägg till kontakt', 'class', 'button add-contact-button');
  
      let contactListDiv = this.createElement(outerDiv, 'div', '', 'class', 'contact-list');
        this.createContactList(contactListDiv);
  }
  
}





