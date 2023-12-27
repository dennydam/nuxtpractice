import httpRequest from '../server/index'
const URL = '/staff'
const getStaffInfoByPage = () => {
  return httpRequest.get('https://jsonplaceholder.typicode.com/users')
}

const updateStaffInfo = (data: any) => {
  return httpRequest.post(URL, data)
}

export { getStaffInfoByPage, updateStaffInfo }
