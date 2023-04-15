import { AppBar, Box, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ManufacturerCard from "../../components/ManufacturerCard";
import { db } from "../../config/firebase";
import CustomCard from "../../components/CustomCard";
import CustomAppBar from "../../components/AppBar";
import { useTranslation } from "react-i18next";

function SelectManufacturer() {
    const [mList, setMList] = useState([]);
    const { t, i18n } = useTranslation();
    useEffect(() => {
        const getData = async () => {
            const snapshot = await getDocs(collection(db, "Manufacturer"));
            let tData = [];
            snapshot.forEach((doc) => {
                tData.push({ id: doc.id, ...doc.data() });
            });
            setMList(tData);
        };
        getData();
    }, []);
    return (
        <>
            <CustomAppBar
                title={t("Select Manufacturer")}
                onBackUrl={"/supplier/home"}
            />
            <Box sx={{margin : '2rem 1rem'}}>
                {mList.map((m) => {
                    return (
                        <ManufacturerCard
                            id={m.id}
                            name={m.name}
                            demandUnits={m.demandUnits}
                        />
                    );
                })}
            </Box>
        </>
    );
}

export default SelectManufacturer;
