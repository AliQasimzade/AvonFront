import axios from "axios"

export const PostMessageWithAboutUs = async (values) => {
    try {
        const request = await axios.post(`${process.env.REACT_APP_BASE_URL}ContactUs/Create`, {
            name: values.name,
            email: values.email,
            phone: String(values.number),
            message: values.message
        })
        if (request.status !== 200) {
            throw new Error('Sorğuda xəta baş verdi')
        } else {
            return request.data
        }
    } catch (error) {
        return error.message
    }
}

export const AddToBasket = async (skuId, appUserId) => {
    try {
        const request = await axios.post(`${process.env.REACT_APP_BASE_URL}Baskets/AddBasket?skuId=${skuId}&appUserId=${appUserId}`, {
            skuId,
            appUserId
        })
        return request.data
    } catch (error) {
        return error.message
    }
}