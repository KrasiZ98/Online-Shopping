export const loginApi = async (userId) => {
    try {
        const response = await fetch('https://dummyjson.com/users/' + userId);


        if (response.ok === false) {
            const error = await response.json();

            throw new Error(error.message);
        }

        const user = await response.json();
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;

    } catch (error) {
        console.log('Error from loginApi:', error.message);
        throw error;
    }
}

export const getAllUsersApi = async () => {
    try {

        const response = await fetch('https://dummyjson.com/users');

        if (response.ok === false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.log('Error from getAllUsersApi:', error.message);
        throw error;
    }
}