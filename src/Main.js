import React from "react";
import react, { useEffect, useState } from "react";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(null);
  const [active, setActive] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [newDeaths, setNewDeaths] = useState(null);
  const [vaccinated, setVaccinated] = useState(null);

  const getCovidData = async () => {
    //4be3519414744c7790a011fda6c3e440
    try {
      const res = await fetch(
        "https://api.covidactnow.org/v2/states.json?apiKey=4be3519414744c7790a011fda6c3e440"
      );
      const data = await res.json();
      console.log(data);
      console.log(data[49]);
      setActive(data[49].actuals.newCases);
      setConfirmed(data[49].actuals.cases);
      setDeaths(data[49].actuals.deaths);
      setDate(data[49].lastUpdatedDate);
      setNewDeaths(data[49].actuals.newDeaths);
      setVaccinated(data[49].actuals.vaccinesAdministered);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCovidData();
  }, []);

  const Data = (
    <div className="Data">
      <div className="Databox">Last updated date : {date}</div>
      <div className="Databox">Active cases : {active}</div>
      <div className="Databox">New Deaths : {newDeaths}</div>
      <div className="Databox">Confirmed cases : {confirmed}</div>
      <div className="Databox">Deaths : {deaths}</div>
      <div className="Databox">Vaccines Administered : {vaccinated}</div>
    </div>
  );

  return (
    <div className="Main">{isLoading ? <p>Loading Data...</p> : Data}</div>
  );
};

export default Main;
