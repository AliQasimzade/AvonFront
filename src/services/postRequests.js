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

export const AddToBasket = async (appUserId, arr) => {
    try {
        const request = await axios.post(`${process.env.REACT_APP_BASE_URL}Baskets/AddBasket?appUserId=${appUserId}`, arr)
        if (request.status == 400) {
            throw new Error("Stokda bu məhsul yoxdur !")
        } else {
            return request.data;
        }

    } catch (error) {
        return "Stokda bu məhsul yoxdur !";
    }
}