import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            Onboarding: "Onboarding",
            "Upload Aadhar Photo": "Upload Aadhar Photo",
            "What do you sell?": "What do you sell?",
            kg: "kg",
            Submit: "Submit",
            "select manufacturer": "Select Manufacturer",
            "my loans": "My Loans",
            Amount: "Amount",
            "payable amounts": "Payable Amounts",
            Requested: "Requested",
            Approved: "Approved",
            Rejected: "Rejected",
            "Repay Loans": "Repay Loans",
            Chat: "Chat",
            Home: "Home",
            "Select Manufacturer": "Select Manufacturer",
            "Select Supplier": "Select Supplier",
            "Approve Loans": "Approve Loans",
            "See Loans": "See Loans",
            "Get Loan": "Get Loan",
            "My Loans": "My Loans",
            Name: "Name",
            "Demand Units": "Demand Units",
            "Loan Id": "Loan Id",
            Interest: "Interest",
            "Loan Amount": "Loan Amount",
            Pay: "Pay",
            "Request with Loan": "Request with Loan",
            "Duration (in months)": "Duration (in months)",
            "Request Manufacturer": "Request Manufacturer",
        },
    },
    hi: {
        translation: {
            Onboarding: "ओनबोर्डिंग",
            "Upload Aadhar Photo": "आधार फोटो अपलोड करें",
            "What do you sell?": "आप क्या बेचते हो?",
            kg: "किलोग्राम",
            Submit: "सबमिट करें",
            "select manufacturer": "मैन्युफैक्चरर चुनें",
            "my loans": "मेरे ऋण",
            Amount: "राशि",
            "payable amounts": "भुगतानीय राशि",
            Requested: "अनुरोधित",
            Approved: "स्वीकृत",
            Rejected: "अस्वीकृत",
            "Repay Loans": "ऋण चुकाना",
            Chat: "चैट",
            Home: "होम",
            "Select Manufacturer": "मैन्युफैक्चरर चुनें",
            "Select Supplier": "आपूर्तिकर्ता चुनें",
            "Approve Loans": "ऋण स्वीकृत करें",
            "See Loans": "ऋण देखें",
            "Get Loan": "ऋण प्राप्त करें",
            "My Loans": "मेरे ऋण",
            Name: "नाम",
            "Demand Units": "मांग इकाइयां",
            "Loan Id": "ऋण आईडी",
            Interest: "ब्याज",
            "Loan Amount": "ऋण राशि",
            Pay: "भुगतान",
            "Request with Loan": "ऋण के साथ अनुरोध",
            "Duration (in months)": "अवधि (महीनों में)",
            "Request Manufacturer": "मैन्युफैक्चरर का अनुरोध करें",
            Wheat: "गेहूं",
            Rice: "चावल",
            Sugarcane: "शरबत",
            Cotton: "कपास",
            Soybean: "सोयाबीन",
            Maize: "मक्का",
            "Select Langauge": "भाषा चुनें",
        },
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
