public class ProductImageUpdater {
    public static void updateProductImage(Id productId, String productName) {
        String url = 'http://www.glyffix.com/api/Image?word=' + EncodingUtil.urlEncode(productName, 'UTF-8');
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(url);
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            String imageUrl = response.getBody();
            
            Product__c product = new Product__c(Id = productId, Image__c = imageUrl);
            update product;
        }
    }
}