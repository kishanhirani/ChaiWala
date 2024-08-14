import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Utils from "./utils";
import store from "../redux/Store/store";


store.subscribe(listener);

function listener() { }

export const BASE_URl = "http://ec2-3-6-126-68.ap-south-1.compute.amazonaws.com:8080/api/";

const fetchClient = () => {
    const defaultOptions = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const instance = axios.create(defaultOptions);
    instance.defaults.timeout = 30000;
    instance.interceptors.request.use(async (config) => {
        config.url = BASE_URl + config.url;
        var token = await AsyncStorage.getItem("@token");
        console.log(token);
        if (!Utils.isNull(token)) {
            config.headers["token"] = token;
        }
        return config;
    });
    return instance;
};

export default fetchClient();
