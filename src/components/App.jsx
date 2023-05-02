// import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Container, Title, Subtitle } from './App.styled';

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

  // Під час завантаження застосунку контакти, якщо такі є, зчитуються
  //  з локального сховища і записуються у стан.
  componentDidMount() {
    const contactsItem = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsItem);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  // Під час додавання та видалення контакту контакти зберігаються
  // у локальне сховище localStorage.
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // contactAdd = ({ name, number }) => {
  //   this.setState(({ contacts }) => ({
  //     contacts: [{ id: nanoid(), name, number }, ...contacts],
  //   }));
  // }; --- старий варіант

  // Додає новий контакт та перевіряє на дубляж контактів який
  //  вводить користувач порівнюючи новий контакт із тим який вже є
  contactAdd = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = { id: nanoid(), name, number };

    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`This name "${name}" is already exist!`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  // checkedDublicateName = name =>
  //   this.state.contacts.some(
  //     contact => contact.name.toLowerCase() === name.toLowerCase()
  //   ); ------додала цю функцію яка перевіряє на дубляж імен в
  //----------- масиві контактів у функцію contactAdd

  // Видаляє контакти по кліку на кнопку
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  //  Оновлює властивість filter у стані компонента на значення,
  // яке було введене в полі фільтрації event.target.value. Функція,
  // викликається при кожному введенні нового символу в поле фільтрації.
  filterUpdate = event => {
    this.setState({ filter: event.target.value });
  };

  // Функція filteredContacts забезпечує фільтрацію списку контактів
  //  на основі введеного користувачем рядка фільтру.
  filteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalize = filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalize);
    });
  };

  render() {
    // console.log(this.state.filter);
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm
          contactAdd={this.contactAdd}
          // checkedDublicateName={this.checkedDublicateName} --- старий варіант
        />
        <Subtitle>Contacts</Subtitle>
        <Filter
          filterValue={this.state.filter}
          filterUpdate={this.filterUpdate}
        />
        <ContactList
          filteredContacts={this.filteredContacts()}
          deleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
