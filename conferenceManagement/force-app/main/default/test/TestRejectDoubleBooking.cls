@isTest
private class TestRejectDoubleBooking {
    
    // Create a session - testSession1 at a specific time
    // create a session - testSession2 at the same time
    // Create a speaker - testSpeaker1
    // Assign testSpeaker1 to testSession1
    // Assert Success
    // Assign testSpeake2 to testSession2
    // Assert Failure
    static testmethod void TestSingleBooking() {
        Datetime now = System.now();
        Speaker__c speaker = new Speaker__c(First_Name__c='John', Last_Name__c='Smith');
        insert speaker;
        Session__c session = new Session__c(Name='some session', Session_Date__c=now);
        insert session;
        Session_Speaker__c assignment = new Session_Speaker__c(Session__c=session.ID, Speaker__c=speaker.ID);
        Database.SaveResult result = Database.insert(assignment, false);
    	System.assert(result.isSuccess());
    }
    static testMethod void TestDoubleBooking() {
        Datetime now = System.now();
        Speaker__c speaker = new Speaker__c(First_Name__c='John', Last_Name__c='Smith');
        insert speaker;
        Session__c session1 = new Session__c(Name='Session 1', Session_Date__c=now);
        insert session1;
        Session__c session2 = new Session__c(Name='Session 2', Session_Date__c=now);
    	insert session2;
        Session_Speaker__c assignment1 = new Session_Speaker__c(Session__c=session1.ID, Speaker__c=speaker.ID);
        Database.SaveResult result = Database.insert(assignment1, false);
    	System.assert(result.isSuccess());
        Session_Speaker__c assignment2 =
        new Session_Speaker__c(Session__c=session2.Id, Speaker__c=speaker.Id);
        result = Database.insert(assignment2, false);
        System.assert(!result.isSuccess());
    }
}