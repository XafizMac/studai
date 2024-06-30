interface RegistrationErrorResponse {
    response: {
        data: {
            email: string[];
        };
    };
}

function isRegistrationErrorResponse(error: any): error is RegistrationErrorResponse {
    return error && error.response && error.response.data && Array.isArray(error.response.data.email);
}
