import axios from "axios"

export const PostMessageWithAboutUs = async (values) => {
     try {
        const request = await axios.post('http://avontest0910-001-site1.dtempurl.com/api/ContactUs/Create',{
            name: values.name,
            email: values.email,
            phone: String(values.number),
            message: values.message
        })
        if(request.status !== 200) {
            throw new Error('Sorğuda xəta baş verdi')
        }else {
             return request.data
        }
     } catch (error) {
        alert(error.message)
     }
}