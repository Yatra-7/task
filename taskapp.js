class FinanceTracker {
        constructor() {
        this.entries = JSON.parse(localStorage.getItem('entries')) || [];
      this.loadEntries();
        }
       addEntry(entry) {
          this.entries.push(entry);
          this.saveEntries();
          this.updateDisplay();
        }
 calculateTotal(type) {
          return this.entries
            .filter(entry => entry.type === type)
            .reduce((sum, entry) => sum + entry.amount, 0);
        }
saveEntries() {
          localStorage.setItem('entries', JSON.stringify(this.entries));
        }
      
    loadEntries() {
          this.entries.forEach(entry => this.addEntryToDOM(entry));
          this.updateDisplay();
        }
      addEntryToDOM(entry) {
          const transactionList = document.getElementById('transactionList');
          const listItem = document.createElement('li');
          listItem.textContent = `${entry.date} - ${entry.description} - $${entry.amount}`;
          listItem.className = entry.type === 'Income' ? 'income' : 'expense';
          transactionList.appendChild(listItem);
        }
      
        updateDisplay() {
          document.getElementById('totalIncome').textContent = `$${this.calculateTotal('Income')}`;
          document.getElementById('totalExpenses').textContent = `$${this.calculateTotal('Expense')}`;
          document.getElementById('netBalance').textContent = `$${this.calculateTotal('Income') - this.calculateTotal('Expense')}`;
        }
      }
      
      const financeTracker = new FinanceTracker();
      
document.getElementById('transactionForm').AddEventListener('submit', event => {
        event.PreventDefault();
      
const amount = parseFloat(document.getElementById('amount').value);
const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const type = document.getElementById('category').value;
      
 if (isNaN(amount) || amount <= 0) {
          alertt('Please enter a valid amount.');
          return;
        }
      
        const entry = { amount, description, date, type };
        financeTracker.addEntry(entry);
        event.target.reset();
      });
      