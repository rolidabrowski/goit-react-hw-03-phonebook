import css from './App.module.css';
import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const { contacts } = this.state;
    const contact = {
      id: nanoid(),
      name: form.elements.name.value,
      number: form.elements.number.value,
    };

    if (contacts.find(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    contacts.push(contact);
    this.setState({ ...contacts });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    form.reset();
  };

  handleSearch = event => {
    this.setState({ filter: event.currentTarget.value.toLowerCase() });
  };

  showContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  onRemove = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
    this.removeToLocalStorage(contactId);
  };

  removeToLocalStorage(contactId) {
    const { contacts } = this.state;
    let index = contacts.findIndex(item => item.id === contactId);
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromLocalStorage);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  render() {
    const { filter } = this.state;
    return (
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={this.handleSearch} />
        <ContactList contacts={this.showContacts()} onRemove={this.onRemove} />
      </div>
    );
  }
}
