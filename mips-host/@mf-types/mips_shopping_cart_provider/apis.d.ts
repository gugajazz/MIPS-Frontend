
    export type RemoteKeys = 'mips_shopping_cart_provider/ShoppingCart';
    type PackageType<T> = T extends 'mips_shopping_cart_provider/ShoppingCart' ? typeof import('mips_shopping_cart_provider/ShoppingCart') :any;