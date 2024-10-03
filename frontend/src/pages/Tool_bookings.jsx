import axios from "axios";
import React, { useEffect, useState } from "react";

const Tool_bookings = () => {
  const [bookings, setBookings] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8070/booking").then((res) => {
      setBookings(res.data);
      console.log(bookings);
    });
  }, []);

  return (
    //this is user's all bookings page
    <div>
      {bookings.length > 0 &&
        bookings.map((booking) => <div>{booking.rentFrom}</div>)}
    </div>
  );
};

export default Tool_bookings;
