import axios from "axios";
import FormData from "form-data";

export const aadharQrToJson = async (image) => {
    const url = `https://61f2-182-76-21-121.ngrok-free.app`;

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    data.append("file", image);

    try {
        const response = await axios.post(url, data, {
            maxBodyLength: 9999999,
            headers: {
                "Content-Type": `multipart/form-data`,
            },
        });
        console.log("response:", response);
        return response;
    } catch (error) {
        console.warn("error", error);
    }
};
