trigger OrderItemTrigger on OrderItem__c (after insert) {
    Set<Id> orderIds = new Set<Id>();

    // // Collect the Order Ids associated with the OrderItems
    // for (OrderItem__c orderItem : Trigger.new) {
    //             orderIds.add(orderItem.OrderId);
    //         }
}