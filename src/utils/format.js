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

export const removeAccents = (str) => {
    var from =
            "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
        to =
            "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], "gi"), to[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, "-")
        .replace(/-+/g, "-");

    return str;
};

export const capitalizeFirstLetter = (string) => {
    if (typeof string === "string") {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};

// Can only use with url worng on project cfd shop
export const wrongUrlImg = (string) => {
    if (typeof string === "string") {
        let correctUrl = string;
        if (string.indexOf("http", 2) === -1) return correctUrl;
        return (correctUrl = string.slice(string.indexOf("https", 2)));
    } else return false;
};
