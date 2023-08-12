export const useCart = () => {
    const medusaClient = useMedusaClient();

    const cart = ref<any>(null);
    const setCart = (newCart : any) => cart.value = newCart;

    const getCartFromLocalStorage = () => {
        const cartId = localStorage.getItem("cart_id");

        if (cartId) {
            medusaClient.carts.retrieve(cartId).then(({ cart: storedCart }) => {
                setCart(storedCart);
            });
        }
    }

    onMounted(() => {
        getCartFromLocalStorage();
    });

    return {
        cart,
        setCart,
    };
}