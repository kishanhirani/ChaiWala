import { Alert, Appearance, Platform } from "react-native";
export default class Utils {
    // static async isNetworkAvailable() {
    //     const response = await NetInfo.fetch();
    //     try {
    //         return response.isConnected;
    //     } catch {
    //         Alert.alert("Alert", "Please Connect Your Internet Connections");
    //     }
    //     return true;
    // }

    // static async isNetworkConnected() {
    //     var isConnected = false;

    //     try {
    //         var network = await NetInfo.fetch();
    //         isConnected = network.isConnected;
    //     } catch (error) { }

    //     if (!isConnected) {
    //         alert("Please check your internet connection.");
    //     } else {
    //     }
    //     return isConnected;
    // }

    static DialogBox = (text, text1) => {
        setTimeout(() => {
            Alert.alert(text, text1);
        }, 0);
    };

    static messageDialog = (message) => {
        setTimeout(
            () => {
                Alert.alert(message);
            },
            Platform.OS === "ios" ? 500 : 0
        );
    };

    static isStringNull = (text) => {
        const namev = /^[a-zA-Z\s]+$/;

        if (text === "" || text === null || text === "[]" || text === "null") {
            return true;
        } else if (namev.test(text) === false) {
            return false;
        } else {
            return false;
        }
    };

    static isValueStringNull = (text) => {
        const namev = /^[a-zA-Z\s]+$/;

        if (
            text === "" ||
            text === null ||
            text === "[]" ||
            text === "null" ||
            text === "undefined"
        ) {
            return true;
        } else if (namev.test(text) === false) {
            return false;
        } else {
            return false;
        }
    };

    static isNull(value) {
        return value === "" || value === undefined;
    }

    static isAlphanumeric(value) {
        const lines = value.split("\n");

        const singleLine = lines.map((line) => line.trim()).join("");
        const numericRegex = /^[0-9\s]*$/;
        return !numericRegex.test(singleLine);
    }

    static isEmailValid(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email);
    }

    static isPasswordValid(password) {
        return password.length >= 6;
    }

    static isPhoneNumberValid(phoneNumber) {
        return phoneNumber.length >= 10;
    }

    static restrictEmojiTextInput(text) {
        return text.trim().length === 0 ? "" : text;
    }
    static getLocationType(locationCode) {
        switch (locationCode) {
            case 0:
                return "hybrid";
            case 1:
                return "remote";
            case 2:
                return "onsite";
        }
    }
    static getTheme() {
        const theme = Appearance.getColorScheme();
        return theme;
    }
}
