import css from './App.module.css';
import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
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
  };

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
