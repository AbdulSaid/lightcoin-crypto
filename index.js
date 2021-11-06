class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense
    this.transactions = [];
  }

  get balance() {
    // calculate the balance using the transaction objects
    let balance = 0
    for (let tr of this.transactions) {
      balance += tr.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction)
  }

}

class Transaction {

  constructor(amount,account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}
// will take the Transactions constructors above so it not duplicate code, no need to write super().
class Withdrawal extends Transaction{

  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction{
  // Update the balance in the account
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}





// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
console.log('Starting Balance:', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(5.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);

// t1 = new Withdrawal(50.25);
// t1.commit();
// console.log('Transaction 1:', t1);

// t2 = new Withdrawal(9.99);
// t2.commit();
// console.log('Transaction 2:', t2);

// console.log('Balance:', balance);

// t3 = new Deposit(120.00);
// t3.commit();
// console.log("Transaction 3:",t3)
