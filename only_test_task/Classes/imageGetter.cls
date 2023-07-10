public with sharing class imageGetter {
    @AuraEnabled
    public static String getImage(String prodName){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('http://www.glyffix.com/api/Image?word='+prodName);
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        System.debug(response.getStatusCode());
        
        /////////////////////////////////////////////////////////////////////

        if (response.getStatusCode() == 200) {
            String jsonResponse = response.getBody();
            Map<String, Object> data = (Map<String, Object>) JSON.deserializeUntyped(jsonResponse);
            List<Object> imageData = (List<Object>) data.get('data');
            
            if (imageData != null && !imageData.isEmpty()) {
                Map<String, Object> imageInfo = (Map<String, Object>) imageData.get(0);
                String imageUrl = (String) imageInfo.get('imageurl');
                return imageUrl;
            }
        }

        return 'Image not found';

        /////////////////////////////////////////////////////////////////////
    }
}