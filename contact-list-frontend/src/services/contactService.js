import { UserAxios } from "./helper";

export const saveContact =async (contact) =>{
    return await UserAxios.post(`/contacts`, contact);
}

export const getContacts =async (page=0, size=12) =>{
    return await UserAxios.get(`/contacts?pageNumber=${page}&pageSize=${size}`);
}

export const getContact =async (id) =>{
    return await UserAxios.get(`/contacts/${id}`);
}

export const updateContact =async (id, contact) =>{
    console.log(contact);
    return await UserAxios.put(`/contacts/${id}`, contact);
}

export const deleteContact =async (id) =>{
    return await UserAxios.delete(`/contacts/${id}`);
}

export const uploadPhoto = async (formData) => {
    return await UserAxios.put(`/contacts/photo`, formData);
}

export const getPhototUrl = async (filename) =>{
    return await UserAxios.get(`/contacts/image/${filename}`)
}

export const getSearchedContacts = async (name) =>{
    return await UserAxios.get(`/contacts/search?name=${name}`);
}