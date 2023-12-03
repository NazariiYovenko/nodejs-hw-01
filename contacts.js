const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("db", "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.log(`Something went wrong: ${err.message}`);
    return null;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(({ id }) => id === contactId) || null;
  } catch (err) {
    console.log(`Something went wrong: ${err.message}`);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contatForDelete = getContactById(contactId);

    if (contatForDelete === null) {
      return null;
    }

    const contacts = await listContacts();
    const filtredContacts = contacts.filter(({ id }) => id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(filtredContacts));

    return contatForDelete;
  } catch (err) {
    console.log(`Something went wrong: ${err.message}`);
  }
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: nanoid() };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (err) {
    console.log(`Something went wrong: ${err.message}`);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
