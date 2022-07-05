import request from '@/utils/request';
// import qs from 'qs';


export function queryProductList(para) {
    let formData = new FormData();
    for (let item in para) {
        formData.append(item, para[item]);
    }
    return request({
        url: "/web/communication/add",
        method: "post",
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}