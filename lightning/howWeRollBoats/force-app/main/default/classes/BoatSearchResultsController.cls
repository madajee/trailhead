public with sharing class BoatSearchResults {
	public BoatSearchResults() {

    }
    
    @AuraEnabled
    public static List<Boat__c> getBoats(String boatTypeId){
        if ((!Schema.sObjectType.Boat__c.fields.Name.isAccessible()) && (!Schema.sObjectType.Boat__c.fields.Id.isAccessible())){
    			throw new System.NoAccessException();
    				//return null;
    		}
    		//They have access so let the data go through
    		List<Boat__c> boats = new List<Boat__c>();
        	if(String.isEmpty(boatTypeId)){
                boats = [select Id,Name,Picture__c,contact__r.Name,Geolocation__Latitude__s,Geolocation__Longitude__s from Boat__c];
            }else{
                boats = [select Id,Name,Picture__c,contact__r.Name,Geolocation__Latitude__s,Geolocation__Longitude__s  from Boat__c where BoatType__c =: boatTypeId];
                //System.debug('GEO ' + boats);
            }
        
        		System.debug('Boats: ' + boats);
    			return boats;
    }
}