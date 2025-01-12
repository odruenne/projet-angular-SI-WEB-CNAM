import { Kibbles } from '../models/kibbles';

export class AddItemToShoppingCart {
  static readonly type = '[Shopping Cart] Add';

  constructor(public item: Kibbles) {}
}

export class RemoveItemFromShoppingCart {
  static readonly type = '[Shopping Cart] Remove';

  constructor(public item: Kibbles) {}
}

export class IncrementQuantityFromShoppingCart {
  static readonly type = '[Shopping Cart] Increment';

  constructor(public item: Kibbles) {}
}

export class DecrementQuantityFromShoppingCart {
  static readonly type = '[Shopping Cart] Decrement';

  constructor(public item: Kibbles) {}
}