import { useState, useEffect } from "react";
import CardItem from "../components/CardItem";
import Loader from "../components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [])

  if (!loading) {
    return (
      <>
          <CardItem  />
      </>
    );
  }
  return <Loader />;
};

export default Home;
