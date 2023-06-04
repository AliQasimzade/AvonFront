import axios from "axios";

export const getAllOfferWeeks = async () => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}OfferOfWeeks/Manage/GetAll?isDeleted=false`)
        if (request.status !== 200) {
            throw new Error('Sorğuda xəta baş verdi')
        } else {
            const response = request.data;
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getAllSliders = async () => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}Sliders/Manage/GetAll?isDeleted=false`)
        if (request.status !== 200) {
            throw new Error('Sorğuda xəta baş verdi')
        } else {
            const response = request.data;
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getAllSliderTwos = async () => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}SliderTwos/Manage/GetAll?isDeleted=false`)
        if (request.status !== 200) {
            throw new Error('Sorğuda xəta baş verdi')
        } else {
            const response = request.data;
            return response
        }


    } catch (error) {
        return error.message
    }
}

export const getAllProducts = async () => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}Products/GetAll`)
        if (request.status !== 200) {
            throw new Error('Sorğuda xəta baş verdi')
        } else {
            const response = request.data;
            return response
        }


    } catch (error) {
        return error.message
    }
}

export const getAllSettings = async () => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}Settings/Manage/GetAll?isDeleted=false`)
        if (request.status !== 200) {
            throw new Error('Sorğuda xəta baş verdi')
        } else {
            const response = request.data;
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getProductBySkuId = async (skuId) => {
     try {
         const request = await axios.get(`${process.env.REACT_APP_BASE_URL}Products/Manage/ProductGetSkuId?SkuId=${skuId}`);

         if(request.status !== 200) {
             throw new Error('Sorğuda xəta baş verdi')
         }else {
            const response = request.data;
            return response
         }
          
     } catch (error) {
        return error.message
     }
}

export const getMyAccount = async (userId) => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}Account/MyAccount?id=${userId}`);

        if(request.status !== 200) {
            throw new Error('Sorğuda xəta baş verdi')
        }else {
           const response = request.data;
           return response
        }
         
    } catch (error) {
       return error.message
    }
}

