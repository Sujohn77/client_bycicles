export const apiRoot = "http://localhost:3001";
export const access = {
    annonymous: 0,
    user: 1,
    admin: 2
};

let date = new Date();
date.setDate(date.getDate() + 7);
date.toLocaleDateString("en-US") + 7;
// .replace(/\./g, "/")
export const guides = ["Aндрійко К.М.", "Бобро У.Е.", "Динилор А.Й."];
export const routes = ["Грузія 520км", "Анталія 300км", "Венеція 200км"];
export const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Назва", width: 110 },
    { field: "price", headerName: "Ціна", width: 60 },
    { field: "dateFrom", headerName: "Дата початку", width: 135 },
    { field: "dateTo", headerName: "Дата закінчення", width: 145 },
    {
        field: "countBicycle",
        headerName: "Кількість велосипедів",
        type: "number",
        width: 150,
        sortable: false
    },
    {
        field: "difficulty",
        headerName: "Складність",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 120
    },
    { field: "guide", headerName: "Керівник", width: 120 },
    { field: "route", headerName: "Маршрут", width: 110 },
    { field: "tourists", headerName: "Туристи", width: 120 },
    { field: "img", headerName: "Фото", width: 90 },
    { field: "comments", headerName: "Коментарі", width: 120 },
    { field: "actions", headerName: "Дії", width: 170, elem: "button" }
];
