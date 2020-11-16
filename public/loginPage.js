'use strict';

const newUser = new UserForm();

newUserForm. loginFormCallBack = function(data) =>{
    ApiConnector.login((data, response) =>{
        if(!response.success){
            newUser.setLoginErrorMessage(response.error);
        }else {
            location.reload();
        }
    });
}

newUserForm.registerFormCallback = function (data) => {
    ApiConnector.register((data, response) =>{
        if(!response.success){
            newUser.setRegisterErrorMessage(response.error);
        }else {
            location.reload();
        }
    });
}
