const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("db", "contacts.json");

/**
 * Asynchronously reads the contacts of the contacts file and parses it into an array of objects.
 *
 * @async
 * @function
 * @returns {Promise<Object[] | null>} A promise that resolves to an array of contact objects
 *                                      if the file is successfully read and parsed, or null if
 *                                      an error occurs during the process.
 *
 * @throws {Error} If there is an error reading or parsing the contacts file, an error object
 *                 with a descriptive message will be thrown.
 *
 * @author Nazarii Yovenko
 */

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.log(`Something went wrong: ${err.message}`);
    return null;
  }
}

/**
 * Asynchronously get a contact by id from the contacts file.
 *
 * @async
 * @function
 * @param {string} contactId - The id of the contact to get.
 * @returns {Promise<Object | null>} A promise that resolves to the contact object
 *                                    if found, or null if the contact with the specified
 *                                    identifier is not present or an error occurs.
 *
 * @throws {Error} If there is an error while retrieving the contact or the contacts file.
 *
 * @author Nazarii Yovenko
 */

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(({ id }) => id === contactId) || null;
  } catch (err) {
    console.log(`Something went wrong: ${err.message}`);
    return null;
  }
}

/**
 * Asynchronously removes a contact by id from the contacts file.
 *
 * @async
 * @function
 * @param {string} contactId - The id of the contact to remove.
 * @returns {Promise<Object | null>} A promise that resolves to the removed contact object
 *                                    if successful, or null if the contact with the specified
 *                                    identifier is not present or an error occurs.
 *
 * @throws {Error} If there is an error while removing the contact or updating the contacts file.
 *
 * @author Nazarii Yovenko
 */

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

/**
 * Asynchronously adds a new contact with the provided details to the contacts file.
 *
 * @async
 * @function
 * @param {string} name - The name of the new contact.
 * @param {string} email - The email address of the new contact.
 * @param {string} phone - The phone number of the new contact.
 * @returns {Promise<Object | null>} A promise that resolves to the added contact object
 *                                    if successful, or null if an error occurs.
 *
 * @throws {Error} If there is an error while adding the contact or updating the contacts file.
 *
 * @author Nazarii Yovenko
 */

async function addContact(name, email, phone) {
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
