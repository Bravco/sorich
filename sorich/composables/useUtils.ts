export const useUtils = () => {
    const lowestPrice = (product : any, currencyCode : string) => {
        let lowestPrice : any = null;

        product.variants.forEach((variant : any) => {
            variant.prices.forEach((price : any) => {
                if (currencyCode == price.currency_code)
                    if (lowestPrice === null || price.amount < lowestPrice.amount)
                        lowestPrice = price;
            });
        });

        return lowestPrice;
    }

    const highestPrice = (product : any, currencyCode : string) => {
        let highestPrice : any = null;

        product.variants.forEach((variant : any) => {
            variant.prices.forEach((price : any) => {
                if (currencyCode == price.currency_code)
                    if (highestPrice === null || price.amount > highestPrice.amount)
                        highestPrice = price;
            });
        });

        return highestPrice;
    }

    const formatPrice = (cents : number) => {
        return (cents/100).toFixed(2);
    }

    return {
        lowestPrice,
        highestPrice,
        formatPrice,
    };
}