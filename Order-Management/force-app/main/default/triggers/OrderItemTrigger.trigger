trigger OrderItemTrigger on OrderItem__c (after insert) {
    
    for(OrderItem__c oi : Trigger.new) {

        Order__c order = [SELECT TotalProductCount__c, TotalPrice__c FROM Order__c WHERE Id = :oi.OrderId__c];
        order.TotalProductCount__c += oi.Quantity__c;
        order.TotalPrice__c += oi.Price__c;

        update order;
    } 

    
}