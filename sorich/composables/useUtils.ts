export const useUtils = () => {
    const formatPrice = (cents : number) => {
        return (cents/100).toFixed(2);
    }

    return {
        formatPrice,
    };
}