import axios from 'axios';

export async function registerEmail(userEmail) {
	if (typeof userEmail !== 'string') console.warn('userEmail parameter is not a string.');
	await axios
		.post(`${process.env.REACT_APP_API_SERVER_URL}/users/`, {
			email: userEmail
		})
		.then((response) => {
			const { status, statusText, data } = response;
			if (status === 201) {
				console.log(statusText);
				console.log(data.id);
			}
			console.log(response);
		})
		.catch((error) => {
			console.error(error);
    });
}
