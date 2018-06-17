({
    createExpense: function(component, expense) {
        var theExpenses = component.get("v.expenses");
        
        // Copy the expense to a new object
        // THIS IS A DISGUSTING, TEMPORARY HACK
        var newExpense = JSON.parse(JSON.stringify(expense));
        
        theExpenses.push(newExpense);
        component.set("v.expenses", theExpenses);
        var newExpense = { 'sobjectType': 'Expense__c',
                          'Name': '',
                          'Amount__c': 0,
                          'Client__c': '',
                          'Date__c': '',
                          'Reimbursed__c': false };
        component.set("v.newExpense", newExpense);
    }
})