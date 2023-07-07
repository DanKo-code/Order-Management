public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static Account getLoggedInAccount() {
        String userId = UserInfo.getUserId();
        return [SELECT Name, AccountNumber FROM Account WHERE Id = :userId];    
    }
}