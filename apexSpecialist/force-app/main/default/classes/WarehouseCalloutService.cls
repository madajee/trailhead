public with sharing class WarehouseCalloutService {

    private static final String WAREHOUSE_URL = 'https://th-superbadge-apex.herokuapp.com/equipment';
    
    // complete this method to make the callout (using @future) to the
    // REST endpoint and update equipment on hand.
    @future(callout=true)
    public static void runWarehouseEquipmentSync(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(WAREHOUSE_URL);
        request.setMethod('GET');
		HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
		if (response.getStatusCode() == 200) {
        // Deserialize the JSON string into collections of primitive data types.
    	List<Object> results = (List<Object>) JSON.deserializeUntyped(response.getBody());
        List<Product2> equipmentList = new List<Product2>();
        for (Object result: results) {
          		Map<String, Object> recordEquipment = (Map<String, Object>)result;
            	Product2 equipment = new Product2();
            	equipment = mapResultToEquipment(recordEquipment);
            	equipmentList.add(equipment);
       		}
        	System.debug('Equipment List: ' + equipmentList);
            upsert equipmentList Warehouse_SKU__c;
    	}
    }
    private static Product2 mapResultToEquipment(Map<String, Object> record) {
        	Product2 product = new Product2();
		    product.name = (String) record.get('name');
        	product.Replacement_Part__c = true;
        	product.Cost__c = (Integer)record.get('cost');
            product.Current_Inventory__c = (Integer)record.get('quantity');
			product.Maintenance_Cycle__c = (Integer)record.get('maintenanceperiod');
        	product.Lifespan_Months__c = (Integer)record.get('lifespan');
			product.Warehouse_SKU__c = (String)record.get('sku');
            return product;
        }
}
