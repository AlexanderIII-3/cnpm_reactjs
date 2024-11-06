import axios from "../axios";
const handleLoginApi = (email, password) => {
    return axios.post(`/api/login`, { email, password }); // to connect api in backend
}// take value from client to backend server
const getAllUsers = (inputId) => {
    return axios.get(`/api/getAllUser-crud?id=${inputId}`); // to connect api in backend
}
const deletUser = (inputId) => {
    return axios.delete(`/api/deleteUser-crud?id=${inputId}`); // to connect api in
}
const createNewUserService = (data) => {

    return axios.post(`/api/create-new-user`, data);
}
const handleDeleteUserService = (InputId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: InputId
        }
    });
};
const handleDeleteDrink = (InputId) => {
    return axios.delete('/api/delete-drink', {
        data: {
            id: InputId
        }
    });
}
const EditUserService = (user) => {
    console.log('check user form server', user)
    return axios.put('/api/edit-user', user);




};
const getAllCodeService = (inPutData) => {
    return axios.get(`/api/allcodes?type=${inPutData}`)
}
const getTopDoctor = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const detailUserService = (userId) => {
    console.log('check id form service', userId)
    return axios.get(`/api/detail-user?id=${userId}`

    )
}
const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`)
}
const postInforDrink = (data) => {
    return axios.post(`/api/save-drink`, data)




}





//after
const getAllListDrinks = () => {
    return axios.get('api/get-all-list-drinks')
};
const getAllListDrinkByType = (data) => {
    console.log('check send user service', data)
    return axios.post('/api/get-all-list-drinks-byDishID', { data })

}
const getDetailDrinkById = (data) => {
    console.log('check send user service', data)
    return axios.get(`/api/detail-drink?id=${data}`)
};
const handleAddToCart = (data) => {
    return axios.post(`/api/handle-add-to-cart`, data)
}
const handleFecthCartPerCustomer = (data) => {
    console.log('check send user service', data)

    return axios.get(`/api/get-info-cart-by-Id?id=${data.id}&date=${data.date}`)

};
const handleDeleteOder = (id) => {
    return axios.post(`/api/handle-delete-oder?id=${id}`)

};

const handleSaveBill = (data) => {
    return axios.post(`/api/handle-save-bill`, data)

};
const handleGetAllBill = (data) => {
    return axios.get(`/api/handle-get-all-bill?id=${data.id}&date=${data.date}`);
};
const handleSaveCusBill = (data) => {
    return axios.post(`/api/handle-clear-bill`, data);

}
const handleGetAllBillCus = (data) => {
    return axios.get(`/api/handle-get-all-customers?id=${data.id}&date=${data.date}`);

};
const handleFecthBillPerCustomer = (data) => {
    console.log('check send user service', data)

    return axios.get(`/api/get-info-cart-by-Id?id=${data.id}&date=${data.date}`)

};














// before
const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-details-doctor?id=${id}`)

}
const bulkCreateSchedule = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data

    )

}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getMoreInforDoctor = (doctorId) => {
    return axios.get(`/api/get-more-infor-doctor?doctorId=${doctorId}`)
}
const getProfileInforDoctor = (doctorId) => {
    return axios.get(`/api/get-profile-infor-doctor?id=${doctorId}`)
}
const postPatentAppointment = (data) => {
    return axios.post(`/api/patient-booking-appointment`, data)
}
const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-booking-appointment`, data)
}




export {
    handleLoginApi, getAllUsers, deletUser, createNewUserService, handleDeleteUserService,
    EditUserService, getAllCodeService, getTopDoctor, detailUserService, getAllDoctor, postInforDrink,
    getDetailInforDoctor, bulkCreateSchedule,
    getScheduleDoctorByDate, getMoreInforDoctor,
    getProfileInforDoctor, postPatentAppointment,

    postVerifyBookingAppointment,




    getAllListDrinks, handleDeleteDrink,
    getAllListDrinkByType, getDetailDrinkById,
    handleAddToCart, handleFecthCartPerCustomer,
    handleDeleteOder, handleSaveBill,
    handleGetAllBill, handleSaveCusBill,
    handleGetAllBillCus, handleFecthBillPerCustomer

}
