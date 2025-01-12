import { Injectable } from '@angular/core';
import { Kibbles } from '../models/kibbles';
import { AddItemToShoppingCart, DecrementQuantityFromShoppingCart, IncrementQuantityFromShoppingCart, RemoveItemFromShoppingCart } from '../actions/shoppingCart-action';
import { ShoppingCart } from '../models/shoppingCart';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';



@State<ShoppingCart>({
    name: 'shoppingCart',
    defaults: {
      kibbles: []
    },
})

@Injectable()
export class ShoppingCartState {
    @Selector()
    static getItemsFromShoppingCart(state: ShoppingCart) : Kibbles[] {
      return state.kibbles;
    }
    @Selector()
    static getNbOfItems(state: ShoppingCart) : number {
      return state.kibbles.reduce((prev, val) => prev + val.quantity, 0);
    }


    @Action(AddItemToShoppingCart) 
    add(
      stateCtx: StateContext<ShoppingCart>,
      { item } : AddItemToShoppingCart
    ) {
      const state = stateCtx.getState();

      const kibble = state.kibbles.find(kibble => kibble.name === item.name);

      if(kibble) {
        this.inc(stateCtx, {item: kibble});
      } else {
        stateCtx.patchState({
          kibbles: [...state.kibbles, item],
        });
      }
    }

    @Action(RemoveItemFromShoppingCart)
    del(
      { getState, patchState }: StateContext<ShoppingCart>,
      { item }: RemoveItemFromShoppingCart
    ) {
      const state = getState();
      patchState({
        kibbles: state.kibbles.filter(
          (x) => !(item.name == x.name)
        ),
      });
    }

    @Action(IncrementQuantityFromShoppingCart)
    inc(
      {setState}: StateContext<ShoppingCart>,
      {item} : IncrementQuantityFromShoppingCart
    ) {
      setState(
        patch({
          kibbles: updateItem(
            k => k.name === item.name,
            patch({quantity: item.quantity + 1})
          )
        })
      )
    }
    
    @Action(DecrementQuantityFromShoppingCart)
    dec(
      stateCtx: StateContext<ShoppingCart>,
      {item} : DecrementQuantityFromShoppingCart
    ) {

      const state = stateCtx.getState();
      const kibble = state.kibbles.find(kibble => kibble.name === item.name);

      if (kibble?.quantity === 1) {
        this.del(stateCtx,{item: kibble});
      } else {
        stateCtx.setState(
          patch({
            kibbles: updateItem(
              i => i.name === item.name,
              patch({quantity: item.quantity -1})
    
            )
          })
        )
      }
    }
}