import Grid from "@mui/material/Grid";
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";

const TopCards = () => {
  const [cardsData, setCardData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/topcards", { withCredentials: true })
      .then((res) => {
        setCardData(res.data.obj);
      });
  }, []);
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      {cardsData.map((item) => {
        return <Card key={item.title} title={item.title} value={item.count} />;
      })}
    </Grid>
  );
};

export default TopCards;
