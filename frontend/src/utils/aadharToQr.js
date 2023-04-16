import axios from "axios";
import FormData from "form-data";

export const aadharQrToJson = async (image) => {
    const url = `http://127.0.0.1:5001`;

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
