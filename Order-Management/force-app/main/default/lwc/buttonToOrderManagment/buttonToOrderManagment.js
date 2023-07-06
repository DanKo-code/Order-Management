import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'

export default class ButtonToOrderManagment extends NavigationMixin(LightningElement) {
    handleClickNavigation() {

        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Main'
            }
        })

    }
}