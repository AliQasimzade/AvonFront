import axios from "axios"

export const deleteBasketItem = async (skuId, appUserId,count) => {
    try {
        const request = await axios.delete(`${process.env.REACT_APP_BASE_URL}Baskets/RemoveBasket?skuId=${skuId}&appUserId=${appUserId}&count=${count}`)
        return request.data
    } catch (error) {
        return error.message
    }
}