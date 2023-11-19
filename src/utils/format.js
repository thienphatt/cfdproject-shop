import moment from "moment";
import { DATE_FORMAT } from "../constants/format";

export const formatCurrency = (data, decimals = 3) => {
    if (!data) return 0;
    return data.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};

export const formatDate = (date, format = DATE_FORMAT) => {
    if (!!!date) return "";
    return moment(date).format(format);
};

export const transformNumberToPrecent = (number) => {
    if (!number) return 0;
    return (number * 100) / 5;
};
