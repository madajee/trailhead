public with sharing class BoatController {
    public BoatController() {

    }
	@AuraEnabled
    public static List<BoatType__c> getBoatTypes(){

    		if ((!Schema.sObjectType.BoatType__c.fields.Name.isAccessible()) && (!Schema.sObjectType.BoatType__c.fields.Id.isAccessible())){
    			throw new System.NoAccessException();
    				//return null;
    		}
    		//They have access so let the data go through
    		
    			List<BoatType__c> boats = [SELECT Id, Name FROM BoatType__c];
    			return boats;
	}
    
}
