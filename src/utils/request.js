import {requestSuccessStatus} from '../constants';

const request = async (url, params = {}) => {
    try {
        const response = await fetch(url, params);

        if (response.status !== requestSuccessStatus) {
            return null;
        }

        return {
            data: await response.json(),
            status: response.status,
        };
    } catch (error) {
        console.error(error);

        return null;
    }
}

export default request;