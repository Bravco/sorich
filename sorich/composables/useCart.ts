export const useCart = () => {
    const medusaClient = useMedusaClient();

    const cart = () => useState<any>("cart", () => null);
    
    const setCart = (newCart : any) => cart().value = newCart;

    onMounted(() => {
        const cartId = localStorage.getItem("cart_id");

        if (cartId) {
            medusaClient.carts.retrieve(cartId).then(({ cart }) => {
                setCart(cart);
            });
        } else {
            medusaClient.carts.create().then(({ cart }) => {
                localStorage.setItem("cart_id", cart.id);
                setCart(cart);
            });   
        }
    });

    return {
        cart,
        setCart,
    };
}