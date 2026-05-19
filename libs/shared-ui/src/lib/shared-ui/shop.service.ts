import { Injectable, signal} from '@angular/core';
import { ShopGrid } from 'shared-ui'

@Injectable({
    providedIn: 'root'
})
export  class ShopGridService {
    ShopGridyOdpoved  = signal<ShopGrid[]>([]); //na injectovanie 
}