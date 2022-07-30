import image1 from "../../images/e1.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Loading from "../loader/loading.svg";

import Highlighter from "react-highlight-words";
import "./viewEvents.css";

const Viewevents = () => {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [filter, setFilterDetail] = useState(detail);
  useEffect(() => {
    const fetchDetail = () => {
      axios.get("/api/events").then((response) => {
        setDetail(response.data);
        setFilterDetail(response.data);
        setLoading(false);
      });
    };
    fetchDetail();
  }, []);
  const searchdept = (e) => {
    if (e.target.value === "*") {
      setFilterDetail(detail);
    } else {
      console.log(e.target.value);
      setFilterDetail(
        detail.filter((x) => {
          return x.dept === e.target.value;
        })
      );
    }
  };
  const [Search, setSearch] = useState("*");
  const search = (e) => {
    console.log(e.target.value);
    if (e.target.value.length === 0) {
      setSearch("*");
    } else {
      setSearch(e.target.value);
    }
    setFilterDetail(
      detail.filter((x) => {
        console.log(x.eventName);
        return (
          Search === "*" || x.eventName.toLowerCase().includes(e.target.value)
        );
      })
    );
  };
  if (loading) {
    return (
      <div className="container d-block mx-auto">
        <div className="row mt-4">
          <div className="col">
            <h1 className="display-3">Events</h1>
          </div>
        </div>
        <div className="row mt-5 mb-5">
          <div className="col d-flex justify-content-center">
            <img
              src={Loading}
              style={{ backgroundColor: "white" }}
              className="img-fluid"
              alt="..."
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row mt-4 align-items-center">
        <div className="col-2">
          <h1 className="display-3">Events</h1>
        </div>
        <div className="col-4"></div>
        <div className="col-lg-3">
          <input
            style={{ width: "100%", height: "75%" }}
            className="form-control"
            type="text"
            id="myInput"
            onChange={search}
            placeholder="Search for events.."
            title="Type in a event"
          /></div>
        <div className="col-lg-3">
          <select
            className="form-select mb-2"
            style={{ width: "100%", marginTop: "6px" }}
            onClick={searchdept}
          >
            <option
              className=""
              value="*"
              style={{ color: "red" }}
            >
              All
            </option>
            <option value="IT">
              Information Technology
            </option>
            <option value="EEE">
              Electrical and Electronic Engineering
            </option>
            <option value="ECE">
              Electrical and Communication Engineering
            </option>
            <option value="AE">
              Aeronotical Engineering
            </option>
            <option value="AM">
              Automobile Engineering
            </option>
            <option value="PT">
              Production Technology
            </option>
            <option value="CT">
              Computer Science Engineering
            </option>
          </select>
        </div>
      </div>
      <div
        className="row mt-5 mb-5"
        style={{
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        {filter.map((item) => {
          return (
            <div
              key={item._id}
              className="card m-5 p-1 col-1 mx-auto"
              style={{ width: "18rem" }}
            >
              <img
                src={item.image ? `/api/events/image/${item._id}` : image1}
                className="card-img-top"
                style={{ maxHeight: "200px" }}
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Highlighter
                    highlightClassName="highlight"
                    searchWords={[Search]}
                    autoEscape={true}
                    textToHighlight={item.eventName}
                  />
                </h5>
                <p className="card-text">
                  {format(new Date(item.eventStartDate), "dd MMM yyyy-h:mm a")}
                </p>
                <Link to={`/eventdetails/${item._id}`}>
                  <span className="btn btn-primary">View Details</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Viewevents;
