import axios from "axios";


export const getAllCategories = async () => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}Categories/Manage/GetAll?isDeleted=false`)
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

export const getAllSubCategories = async () => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}SubCatigories/Manage/GetAll?isDeleted=false`)
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

export const getAllDeliveryServices = async () => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}DeliveryAddresses/Get`)
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



export const getAllBrands = async () => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}Brands/Manage/GetAll?isDeleted=false`)
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

export const getAllProducts = async (page) => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}Products/GetAll?page=${page}&count=30&isDelete=false`)
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


export const getProfile = async (userId) => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}Account/Profile?id=${userId}`);

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


export const getUsersWithTeam = async (referalId, day, month,year) => {
     try {

        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}Account/Manage/UsersWithTeam?referalId=${referalId}&day=${day}&month=${month}&year=${year}`);

        if(request.status != 200) {
            throw new Error('Sorğuda xəta baş verdi')
        }else {
            const response = request.data;
            return response
        }

     }catch(error) {
        return error.message
     }
}




export const getAllBasket = async (userId) => {
    try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}Baskets/GetAll?appUserId=${userId}`)
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