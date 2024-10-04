import axios from "axios";
import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const Tool_bookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8070/booking").then((res) => {
      setBookings(res.data);
    });
  }, []);

  // const handleCardClick = (bookingId) => {
  //   navigate(`/booking/${bookingId}`);
  // };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.length > 0 &&
        bookings.map((booking) => (
          <Link
            to={"/booking/" + booking._id}
            key={booking._id}
            className="flex flex-col cursor-pointer bg-[#E9EFEC] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex gap-5 border mx-8 my-4 p-4 cursor-pointer"
            >
              {/* Tool Image */}
              <div className="w-40 h-40 text-lg">
                {booking.tool.tool_photos.length > 0 ? (
                  <img
                    src={
                      "http://localhost:8070/uploads/" +
                      booking.tool.tool_photos[0]
                    }
                    alt={booking.tool.tool_title}
                    className="object-cover w-full h-full rounded"
                    style={{ objectFit: "cover", aspectRatio: "1/1" }}
                  />
                ) : (
                  <p className="text-[#16423C] text-sm">No Image</p>
                )}
              </div>

              {/* Booking Information */}
              <div className="my-2">
                <h2 className="font-semibold text-2xl">
                  {booking.tool.tool_title}
                </h2>
                <div className=" flex gap-2 my-2">
                  {/* Rent from -> Rent to */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                  {new Date(booking.rentFrom).toLocaleDateString()}
                  {" -> "}
                  {new Date(booking.rentTo).toLocaleDateString()}
                </div>

                <div className="my-1 gap-2 flex">
                  {/* Difference in Days */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                  {differenceInCalendarDays(
                    new Date(booking.rentTo),
                    new Date(booking.rentFrom)
                  )}{" "}
                  Days
                </div>
                <div className="flex gap-2 font-semibold text-xl">
                  {/* Total Price */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                  Total Price(Rs.) : {booking.rentPrice}.00
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Tool_bookings;
