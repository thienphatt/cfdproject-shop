export const MESSAGE = {
    required: "Please fill in this field",
    email: "Please enter the correct format email",
    phone: "Please enter the correct format phone",
};

export const REGREX = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};
