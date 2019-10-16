getContactList();

window.addEventListener("popstate", () => {
  if(location.pathname.length < 2) {
    render()
  } else {
    renderEditContact();
  }
});

window.addEventListener('click', async e => {

  if(e.target.closest('a')){
    e.preventDefault();
    if(e.target.closest('.remove-button')){
      removeThisContact(e);
      return;
    }

    let link = e.target.closest('a')
    history.pushState(null, null, link);

    this.editContactList = getEditContactList();
    this.editInputData = insertEditContactListToEditInputData(this.editContactList);
    renderEditContact();
  }

})

async function renderOnRefresh() {
  if(location.pathname.length < 2) {
    render()
  } else {
    this.contactList = await getContactList();
    this.editContactList = getEditContactList();
    this.editInputData = insertEditContactListToEditInputData(this.editContactList);
    renderEditContact();  
  }
}


renderOnRefresh();