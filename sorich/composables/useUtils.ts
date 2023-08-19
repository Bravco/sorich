export const useUtils = () => {
    const lowestPrice = (product : any) => {
        let lowestPrice : any = null;

        product.variants.forEach((variant : any) => {
            variant.prices.forEach((price : any) => {
                if (lowestPrice === null || price.amount < lowestPrice.amount)
                    lowestPrice = price;
            });
        });

        return lowestPrice;
    }

    const formatPrice = (cents : number) => {
        return (cents/100).toFixed(2);
    }

    return {
        lowestPrice,
        formatPrice,
    };
}