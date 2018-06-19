({
    saveExpense: function(component, expense, callback) {
        var action = component.get("c.saveExpense");
        action.setParams({
            "expense": expense
        });
        if (callback) {
            action.setCallback(this, callback);
        }
        $A.enqueueAction(action);
    },
    createExpense: function(component, expense) {
        var newExpense = JSON.parse(JSON.stringify(expense));
        this.saveExpense(component, expense, function(response){
           var state = response.getState();
           if (state === "SUCCESS") {
                var expenses = component.get("v.expenses");
                expenses.push(response.getReturnValue());
                component.set("v.expenses", expenses);
               
                var newExpense = { 'sobjectType': 'Expense__c',
                          'Name': '',
                          'Amount__c': 0,
                          'Client__c': '',
                          'Date__c': '',
                          'Reimbursed__c': false };
        		component.set("v.newExpense", newExpense);
            } 
        });
    }
})