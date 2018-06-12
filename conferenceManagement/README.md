Summary
In this project I learned how to create a simple conference management application using the declarative and programmatic tools provided by the Salesforce Platform. I started by creating the data model for the application, then added some business logic with Apex classes and triggers and finally, built a custom user interface using Lightning components. A brief on heroku with platform api integration, trigger tests and speakerReminderEmail batch class is bonus exercises.

#Steps
- sfdx force:project:create -n conferenceManagement
- sfdx force:apex:class:create -n EmailManager -d force-app/main/default/classes
- sfdx force:apex:trigger:create -n SendConfirmationEmail -s Session_Speaker__c -e 'after insert' -d force-app/main/default/triggers
- sfdx force:apex:trigger:create -n RejectDoubleBooking -s Session_Speaker__c -e 'before insert, before update' -d force-app/main/default/triggers
- sfdx force:lightning:component:create -n SpeakerForm -d force-app/main/default/aura
- sfdx force:lightning:component:create -n ImageUploader -d force-app/main/default/aura
- sfdx force:apex:class:create -n AttachmentController -d force-app/main/default/classes
- sfdx force:apex:class:create -n TestRejectDoubleBooking -d force-app/main/default/test
- sfdx force:apex:class:create -n SendReminderEmail -d force-app/main/default/batch

# SFDX  App

## Dev, Build and Test


## Resources


## Description of Files and Directories


## Issues


