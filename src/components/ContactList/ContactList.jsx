import Proptypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onRemove }) => {
  return (
    <section className={css.list}>
      <ul>
        {contacts.map(contact => (
          <li className={css.item} key={contact.id}>
            <span className={css.text}>{contact.name}</span>
            <span className={css.text}>{contact.number}</span>
            <button
              type="button"
              className={css.button}
              onClick={() => onRemove(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

ContactList.propTypes = {
  contacts: Proptypes.array.isRequired,
  onRemove: Proptypes.func.isRequired,
};
