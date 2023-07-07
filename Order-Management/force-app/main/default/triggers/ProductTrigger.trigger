trigger ProductTrigger on Product__c (after insert) {
    public static void updateProductImages(List<Product__c> newProducts) {
        List<Product__c> productsToUpdate = new List<Product__c>();
        
        for (Product__c product : newProducts) {
            if (String.isBlank(product.Image__c)) {
                ProductImageUpdater.updateProductImage(product.Id, product.Name);
            }
        }
    }
}