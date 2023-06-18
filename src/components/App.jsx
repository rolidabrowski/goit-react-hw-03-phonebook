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

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const { contacts } = this.state;
    this.props.onSubmit({ ...contacts });
    this.setState({ ...contacts });
    this.saveContact();
    form.reset();
  };

  handleSearch = event => {
    this.setState({ filter: event.currentTarget.value.toLowerCase() });
  };

  saveContact = () => {
    const { contacts } = this.state;
    const contact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    if (contacts.find(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
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
    const visibleContacts = this.showContacts();
    return (
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={this.handleSearch} />
        <ContactList contacts={visibleContacts} onRemove={this.onRemove} />
      </div>
    );
  }
}
