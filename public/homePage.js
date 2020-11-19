'use strict';

const userLogout = new LogoutButton(); 
userLogout.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}
ApiConnector.current(response => { // запрос информации о текушем пользователе
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});
const newRates = new RatesBoard(); // запрос и обновление курсов валют
const getCourses = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            newRates.clearTable();
            newRates.fillTable(response.data);
        }
    });
}
getCourses();

let updateCourses = setInterval(getCourses, 60000);

const userMoneyManager = new MoneyManager();
userMoneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            response.error = `Счёт успешно пополнен`;
        }
        userMoneyManager.setMessage(response.success, response.error);
    });
}
userMoneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            response.error = `Валюта успешно конвертирована`;
        }
        userMoneyManager.setMessage(response.success, response.error);
    });
}
userMoneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            response.error = `Перевод выполнен успешно`;
        }
        userMoneyManager.setMessage(response.success, response.error);
    });
}
const newFavorit = new FavoritesWidget();// запрос и обновление списка Избранное
const getFavorites = () => {
    ApiConnector.getFavorites(response => {
        if (response.success) {
            newFavorit.clearTable();
            newFavorit.fillTable(response.data);
            userMoneyManager.updateUsersList(response.data);
        }
    });
}
getFavorites();
newFavorit.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            response.error = 'Пользователь добавлен в список Избранное'
            getFavorites();
        }
        userMoneyManager.setMessage(response.success, response.error);
    });
}
newFavorit.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            response.error = 'Пользователь удален из списка Избранное';
            getFavorites();
        }
        userMoneyManager.setMessage(response.success, response.error);
    });
}
