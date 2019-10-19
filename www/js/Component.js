class Component {

  createElement(daddyElement, element, innerHTMLString, attribute, attributeName) {
    element = document.createElement(element);
    element.innerHTML = innerHTMLString ? innerHTMLString : '';
    element.setAttribute(attribute, attributeName);
    daddyElement.append(element);
    return element
  }

  // AddContactsPage
  eventListener() {
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
      }
    
    })
  
    document.addEventListener('mouseover', e => {
      if(e.target.closest('.contact-card')){
        let contactCard = e.target.closest('.contact-card');
        
      }
    })
  }

  // EditContactsPage
  eventListener2() {
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

      if(e.target.closest('.input-name2')){
        this.editInputData.name = document.querySelector('.input-name2').value;
      }
      if(e.target.closest('.input-phone2')){
        this.collectPhoneNbrs2();
      }
      if(e.target.closest('.input-mail2')){
        this.collectMails2();
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
        let removedHistory = contactData;
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
  }
}
