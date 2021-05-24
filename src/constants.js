export const apiRoot = "http://localhost:3001/";
export const access = {
    annonymous: 0,
    user: 1,
    admin: 2
};

let date = new Date();
date.setDate(date.getDate() + 7);
date.toLocaleDateString("en-US") + 7;
// .replace(/\./g, "/")

export const routes = ["Грузія 520км", "Анталія 300км", "Венеція 200км"];
export const genders = ["Чол", "Жін"];
export const propGenders = { male: "Чол", female: "Жін" };
export const difficulties = ["Легка", "Середня", "Складна"];
export const validators = {
    required: value => (value ? undefined : "Required"),
    maxLength: max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined),

    number: value => (value && isNaN(Number(value)) ? "Must be a number" : undefined),
    minValue: min => value => (value && value < min ? `Must be at least ${min}` : undefined),

    email: value =>
        value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined,
    tooOld: value => (value && value > 65 ? "You might be too old for this" : undefined),
    aol: value => (value && /.+@aol\.com/.test(value) ? "Really? You still use AOL for your email?" : undefined)
};
