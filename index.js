const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.table(oneContact);
      break;
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);
      break;
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.table(deleteContact);
      break;

    default:
      console.log("Unknown action");
  }
}

invokeAction(argv);
