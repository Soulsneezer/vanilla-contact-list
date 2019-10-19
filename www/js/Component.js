// class Component {
//   constructor(){
//     this.listenOnEvents();
//     // this.createElement();
//   }

//   // createElement(div, 'p', 'HELLO THERE AWESOME', 'class', 'fine-div fontsize');
//   createElement(daddyElement, element, innerHTMLString, attribute, attributeName) {
//     element = document.createElement(element);
//     element.innerHTML = innerHTMLString ? innerHTMLString : '';
//     element.setAttribute(attribute, attributeName);
//     daddyElement.append(element);
//     return element
//   }

//   listenOnEvents() {
//     window.addEventListener('change', async e => {
//       if(e.target.closest('.input-name')){
//         this.inputData.name = document.querySelector('.input-name').value;
//       }
//       if(e.target.closest('.input-phone')){
//         collectPhoneNbrs();
//       }
//       if(e.target.closest('.input-mail')){
//         collectMails();
//       }
//     })

//     window.addEventListener('click', async e => {
  
//       if(e.target.closest('.remove-phone-button')) {
//         e.preventDefault();
//         let idIndex = this.inputData.phoneNumbers.findIndex(obj => obj.id == e.target.id);
//         if(this.inputData.phoneNumbers.length === 1 ) { return }
//         this.inputData.phoneNumbers.splice(idIndex, 1);
//         render();
//       }
    
//       if(e.target.closest('.remove-mail-button')) {
//         e.preventDefault();
//         let idIndex = this.inputData.mails.findIndex(obj => obj.id == e.target.id);
//         if(this.inputData.mails.length === 1 ) { return }
//         this.inputData.mails.splice(idIndex, 1);
//         render();
//       }
    
//       if(e.target.closest('.add-phone-button')) {
//         e.preventDefault();
//         if(this.inputData.phoneNumbers.length === 4) { return }
//         this.inputData.phoneNumbers.push({
//           id: nbr,
//           phoneNumber: ''
//         });
//         this.nbr++;
//         render();
//       }
    
//       if(e.target.closest('.add-mail-button')) {
//         e.preventDefault();
//         if(this.inputData.mails.length === 4) { return }
//         this.inputData.mails.push({
//           id: nbr,
//           mail: ''
//         });
//         this.nbr++;
//         render();
//       }
      
//       if(e.target.closest('.add-contact-button')){
//         e.preventDefault();
//         collectPhoneNbrs();
//         collectMails();
    
//         if(this.inputData.name === '') {this.inputData.name = 'Ananymous'}
//         let contactData = {
//           name: this.inputData.name,
//           phoneNumbers: [],
//           mails: []
//         }
//         this.inputData.phoneNumbers.forEach(obj => contactData.phoneNumbers.push(obj.phoneNumber));
//         this.inputData.mails.forEach(obj => contactData.mails.push(obj.mail));
//         const response = await fetch('/api/contacts/add', {
//           method: 'POST', // *GET, POST, PUT, DELETE, etc.
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(contactData) // body contactData type must match "Content-Type" header
//         });
//         cleanInputFields();
//         render();
//         return await response.json(); // parses JSON response into native JavaScript objects
//       }
//     })

//     document.addEventListener('mouseover', e => {
//       if(e.target.closest('.contact-card')){
//         let contactCard = e.target.closest('.contact-card');
        
//       }
//     })


//   }



// }