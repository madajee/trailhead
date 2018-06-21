({
    onFormSubmit:function (component, event, helper) {
        console.log("Receiving FormSubmit Event");
        var searchData = event.getParam("formData");
        var boatTypeId = searchData.boatTypeId;	
        //var params = event.getParam('arguments');
        	console.log("boatTypeId extracted: " + boatTypeId);
            //helper.onSearch(component);
        var BSRcmp = component.find("BSRcmp");
        var auraMethodResult = BSRcmp.search(boatTypeId);
        console.log("auraMethodResult: " + auraMethodResult);
    }
})