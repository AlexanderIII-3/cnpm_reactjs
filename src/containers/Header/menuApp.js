export const adminMenu = [
    { //quản lý người dùng 
        name: 'menu.admin.manage-user',
        menus: [

            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'

            },

            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'

            // },
            // quản lý kế hoạch khám bệnh của bác sĩ





        ]
    },
    {
        name: 'menu.admin.manage-drink',
        menus: [
            {
                name: 'menu.admin.manage-drink', link: '/system/manage-drinks'

            },


        ]
    }




];
export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            // quản lý kế hoạch khám bệnh của bác sĩ

            {
                name: 'menu.doctor.manage-shedule', link: '/doctor/manage-schedule'

            },

            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'

            },



        ]
    },

];
export const dishMenu = [
    {
        name: 'Giao diện người dùng',
        menus: [
            {
                name: 'Tải Trang Chủ', link: '/home'
            }
        ]
    }
];