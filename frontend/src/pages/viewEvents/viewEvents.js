import image1 from "../../images/e1.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format, compareAsc } from "date-fns";
const Viewevents = () => {
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    const fetchDetail = () => {
      axios.get("/api/events").then((response) => {
        setDetail(response.data);
      });
    };
    fetchDetail();
  }, []);
  return (
    <div className="container">
      <h1 className="display-5 mt-5">Upcoming Events</h1>
      <div
        className="row mt-5 mb-5"
        style={{
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        {detail.map((item) => {
          return (
            <div
              key={item._id}
              className="card m-5 p-1 col-1 mx-auto"
              style={{ width: "18rem" }}
            >
              <img src={image1} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.eventName}</h5>
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
