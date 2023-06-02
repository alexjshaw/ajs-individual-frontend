const API_URL = "http://localhost:3001"

async function post(endpoint, data) {
	return await request('POST', endpoint, data)
}

async function get(endpoint) {
	return await request('GET', endpoint, null)
}

async function patch(endpoint, data) {
	return await request('PATCH', endpoint, data)
}

async function deleted(endpoint, data) {
	return await request('DELETE', endpoint, data)
}

async function request(method, endpoint, data) {
	const opts = {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
	}

	if (method.toUpperCase() !== 'GET') {
		opts.body = JSON.stringify(data)
	}

	const response = await fetch(`${API_URL}/${endpoint}`, opts)

	return response.json()
}

export {
    post,
    get,
    patch,
    deleted
}