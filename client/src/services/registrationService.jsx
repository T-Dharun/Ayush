import axios  from 'axios';

const API_URL = 'http://localhost:5000/api/startups';

export const putEntityDetails = async (data) => {
    let a=JSON.parse(localStorage.getItem('user'));
    let d=JSON.parse(localStorage.getItem('data'));
    console.log(data);
    const response = await axios.post(`${API_URL}/createStartup`,
        {
            step:data.step+1,
            data:{...data,userId:d._id}
        },
        {
            headers: {
                'x-auth-token':`${a.token}`
            }
        }
    );
    console.log(response);
    return response.data;
};