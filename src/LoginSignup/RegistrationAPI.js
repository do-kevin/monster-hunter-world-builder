import axios from 'axios';

export async function registerEmail(userEmail) {
  if (typeof userEmail !== 'string') console.warn('userEmail parameter is not a string.');

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/users/`, {
			email: userEmail
    })
    return response;
  } catch (error) {
    console.log('Error in RegistrationAPI:', error)
  }
}
