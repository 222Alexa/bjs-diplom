'use strict';

const newUserForm = new UserForm();

newUserForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (!response.success) {
            newUser.setLoginErrorMessage(response.error);
        }
        else {
            location.reload();
        }
    });
}
newUserForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if (!response.success) {
            newUser.setRegisterErrorMessage(response.error);
        }
        else {
            location.reload();
        }
    });
}