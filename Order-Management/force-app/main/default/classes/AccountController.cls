public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static Account getAccountDetails(String accountId) {
        return [SELECT Name, AccountNumber FROM Account WHERE Id = :accountId];
    }
}