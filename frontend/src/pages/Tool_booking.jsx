import axios from "axios";
import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useParams } from "react-router-dom"; // Use params to get the booking ID

const BookingDetail = () => {
  const { id } = useParams(); // Get the booking ID from the URL
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:8070/booking/${id}`);
        setBooking(res.data);
        console.log(res.data); // Log the actual data returned
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    fetchBooking();
  }, [id]);

  // Check if booking and its tool are defined
  if (!booking || !booking.tool) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">{booking.tool.tool_title}</h1>
      <div className="w-40 h-40 text-lg">
        {booking.tool.tool_photos && booking.tool.tool_photos.length > 0 ? (
          <img
            src={"http://localhost:8070/uploads/" + booking.tool.tool_photos[0]}
            alt={booking.tool.tool_title}
            className="object-cover w-full h-full rounded"
            style={{ objectFit: "cover", aspectRatio: "1/1" }}
          />
        ) : (
          <p className="text-[#16423C] text-sm">No Image</p>
        )}
      </div>
      <div className="text-lg">
        <p>
          Rent From: {new Date(booking.rentFrom).toLocaleDateString()} to{" "}
          {new Date(booking.rentTo).toLocaleDateString()}
        </p>
        <p>Rent Price: Rs. {booking.rentPrice}</p>
        <p>
          Duration:{" "}
          {differenceInCalendarDays(
            new Date(booking.rentTo),
            new Date(booking.rentFrom)
          )}{" "}
          days
        </p>
      </div>
    </div>
  );
};

export default BookingDetail;
