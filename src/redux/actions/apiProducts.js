
export const getAllProductsApi = async () => {
    try {
        const resposne = await fetch("https://dummyjson.com/products");

        if (resposne.ok === false) {
            const error = await resposne.json();
            throw new Error(error.message);
        }

        const products = await resposne.json();
        return products;


    } catch (error) {
        console.error("Error from getAllProductsApi:", error.message);
        throw error;
    }
}


export const getProductByIdApi = async (productId) => {
    try {
        const resposne = await fetch(`https://dummyjson.com/products/${productId}`);

        if (resposne.ok === false) {
            const error = await resposne.json();
            throw new Error(error.message);
        }

        const product = await resposne.json();
        return product;


    } catch (error) {
        console.error("Error from getProductByIdApi:", error.message);
        throw error;
    }
}