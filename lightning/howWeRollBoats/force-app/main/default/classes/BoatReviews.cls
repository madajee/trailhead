public with sharing class BoatReviews {
	public BoatReviews() {
    }
    
    @AuraEnabled
    public static List<BoatReview__c> getAll(Id boatId){
        if ((!Schema.sObjectType.BoatReview__c.fields.Name.isAccessible()) && (!Schema.sObjectType.BoatReview__c.fields.Id.isAccessible())){
    			throw new System.NoAccessException();
    				//return null;
    		}
        List<BoatReview__c> boatReviews = new List<BoatReview__c>();
        if(String.isEmpty(boatId)){
                boatReviews = [SELECT Id, Name, Comment__c, Rating__c,
                               LastModifiedDate, CreatedDate, CreatedBy.Name, 
                               CreatedBy.SmallPhotoUrl, CreatedBy.CompanyName
                               FROM BoatReview__c];
            }else{
                boatReviews = [SELECT Id, Name, Comment__c, Rating__c,
                               LastModifiedDate, CreatedDate, CreatedBy.Name, 
                               CreatedBy.SmallPhotoUrl, CreatedBy.CompanyName 
                               FROM BoatReview__c where Boat__c =: boatId];
            }
    			return boatReviews;
    }
}