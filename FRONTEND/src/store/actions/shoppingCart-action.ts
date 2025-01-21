import { KibblesDTO } from "../../app/models/KibblesDTO";

export class AddItemToShoppingCart {
  static readonly type = '[Shopping Cart] Add';

  constructor(public item: KibblesDTO) {}
}

export class RemoveItemFromShoppingCart {
  static readonly type = '[Shopping Cart] Remove';

  constructor(public item: KibblesDTO) {}
}

export class IncrementQuantityFromShoppingCart {
  static readonly type = '[Shopping Cart] Increment';

  constructor(public item: KibblesDTO) {}
}

export class DecrementQuantityFromShoppingCart {
  static readonly type = '[Shopping Cart] Decrement';

  constructor(public item: KibblesDTO) {}
}

export class ClearShoppingCart {
  static readonly type = '[ShoppingCart] Clear';
}