import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import PopUp from "./PopUp";
import "./style.css";
function Cars() {
  const [search, setSearch] = useState("");

  let newSet = new Set();
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [clickDetails, setClickDetails] = useState({
    companyName: "",
    head: "",
    Address: "",
    state: "",
  });
  const [searchFullData, setSearchFUllData] = useState({
    name: "",
    country: "",
    type: "",
  });
  useEffect(() => {
    axios
      .get(
        "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=1"
      )
      .then((res) => {
        setData(res.data.Results);
      })

      .catch((error) => console.log(error));
  }, [clickDetails]);
  function handleClick(details) {
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${details.Mfr_ID}?format=json`
      )
      .then((res) => {
        console.log(res.data.Results[0]);
        console.log(res.data.Results[0].Mfr_Name);
        setClickDetails({
          ...clickDetails,
          companyName: res.data.Results[0].Mfr_Name,
          head: res.data.Results[0].PrincipalFirstName,
          Address: res.data.Results[0].Address,
          state: res.data.Results[0].StateProvince,
        });
        setFlag(true);
      })
      .catch((error) => console.log(error));
    console.log(clickDetails);
  }
  function searchClick() {
    let eachSearch = data.map((ele) => {
      if (
        ele !== undefined &&
        ele.Mfr_CommonName &&
        ele.Mfr_CommonName !== null &&
        ele.Country &&
        ele.VehicleTypes.length !== 0
      ) {
        return ele;
      }
    });
    console.log(eachSearch);
    let newSearch = eachSearch.map((ele) => {
      if (ele != undefined && ele.Mfr_CommonName.includes(search)) {
        let techVeh = ele.VehicleTypes[0].Name;
        setSearchFUllData({
          name: ele.Mfr_CommonName,
          country: ele.Country,
          type: techVeh,
        });
      }
    });
  }
  return (
    <div className="container big">
      {flag && (
        <div className="popup">
          <PopUp props={clickDetails} />
          <button onClick={() => setFlag(false)}>Cancel</button>
        </div>
      )}
      <h1>Vehicle Manufacturers</h1>
      <div className="rowsInTop">
        <div class="input-group mb-3 inputsFrom">
          <input
            type="text"
            class="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Car name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <span
            class="input-group-text"
            onClick={() => searchClick()}
            id="basic-addon2"
          >
            <FcSearch />
          </span>
        </div>
        <select
          class="form-select inputsFrom"
          aria-label="Default select example"
        >
          {/* <option selected>Filter Vehicle</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option> */}
          {newSet.forEach((ele) => {
            <option value={ele}>{ele}</option>;
          })}
        </select>
      </div>
      <table style={{ marginTop: "10px" }} class="table table-info">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Country</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {searchFullData.country.length === 0 ? (
            <>
              {data.map((details) => {
                if (
                  details.Country &&
                  details.Mfr_CommonName &&
                  details.VehicleTypes.length !== 0
                ) {
                  newSet.add(details.VehicleTypes[0].Name);
                  return (
                    <tr onClick={() => handleClick(details)}>
                      <td>{details.Mfr_CommonName}</td>
                      <td>{details.Country}</td>

                      <td>{details.VehicleTypes[0].Name}</td>
                    </tr>
                  );
                }
              })}
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setSearchFUllData({
                    name: "",
                    country: "",
                    type: "",
                  });
                }}
              >
                Clear
              </button>
              <tr>
                <td>{searchFullData.name}</td>
                <td>{searchFullData.country}</td>
                <td>{searchFullData.type}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Cars;

/*
 {data
            .filter(
              (fields) =>
                fields.Mfr_CommonName.length !== 0 &&
                fields.Country.length !== 0 &&
                fields.VehicleTypes.length !== 0
            )
            .map((details) => {
              const typeOfVechicle = details.VehicleTypes.filter(
                (ele) => ele.IsPrimary === true
              );
              if (typeOfVechicle.length !== 0)
                console.log(typeOfVechicle[0].Name);
              else console.log(details.VehicleTypes);
              return (
                <tr>
                  <td>{details.Mfr_CommonName}</td>
                  <td>{details.Country}</td>
                  {typeOfVechicle.length !== 0 ? (
                    <td>{typeOfVechicle[0].Name}</td>
                  ) : (
                    <td>{details.VehicleTypes[0].Name}</td>
                  )}
                </tr>
              );
            })}
*/
