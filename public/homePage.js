'use strict';
const userLogout = new LogoutButton(); // запрос деавторизации. почему-то не работает
userLogout.action = () => {
    ApiConnector.logout(response => {
        if (response.success === true) {
            location.reload();
        }
    });
}
ApiConnector.current((response) => { // запрос информации о текушем пользователе
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});
const newRates = RatesBoard(); // запрос курсов валют
const getCourses = () => {
    ApiConnector.getStock((response) => {
        if (response.success) {
            newRates.clearTable();
            newRates.fillTable(response.data);
        }
    });
    newRates();
    setInterval(newRates, 60000);
}