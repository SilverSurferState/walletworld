import Realm from "realm";

const ExpensesSchema = {
  name: 'Expense',
  primaryKey: 'id',
  properties: {
    id: "int",
    date: 'date',
    amount: 'int',
    description: 'string',
  },
};

const CardSchema = {
  name: "Card",
  primaryKey: 'id',
  properties: {
    id: "int",
    type: "string",
    data: "string",
  },
};


const databaseOptions = {
  path: 'myrealm.realm',
  schema: [ExpensesSchema, CardSchema],
};

let realm;
try {
  realm = new Realm(databaseOptions);
} catch (e) {
  console.error("Failed to open Realm database:", e);
}


export default realm;
