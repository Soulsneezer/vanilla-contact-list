class Spa {
  constructor() {
    this.addContactsPage = new AddContactsPage();
    this.editContactPage = new EditContactsPage(this.addContactsPage);
    this.listenOnEvents();
    this.renderOnRefresh();
  }
  
  listenOnEvents() {
    window.addEventListener("popstate", () => {
      if(location.pathname.length < 2) {
        this.addContactsPage.render()
      } else {
        this.editContactPage.renderEditContact(this.editInputData);
      }
    });
    
    window.addEventListener('click', async e => {
    
      if(e.target.closest('a')){
        e.preventDefault();
        if(e.target.closest('.remove-button')){
          this.addContactsPage.removeThisContact(e);
          return;
        }
    
        let link = e.target.closest('a')
        history.pushState(null, null, link);
    
        this.editContactList = await this.editContactPage.getEditContactList();
        this.editInputData = await this.editContactPage.insertEditContactListToEditInputData(this.editContactList);
        this.editContactPage.renderEditContact(this.editInputData);
      }
    
    })
  }
  
  async renderOnRefresh() {
    if(location.pathname.length < 2) {
      this.addContactsPage.render()
    } else {
      this.contactList = await this.addContactsPage.getContactList();
      this.editContactList = await this.editContactPage.getEditContactList();
      this.editInputData = await this.editContactPage.insertEditContactListToEditInputData(this.editContactList);
      this.editContactPage.renderEditContact(this.editInputData);  
    }
  }
    
}
