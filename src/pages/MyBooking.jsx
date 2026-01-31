import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import Loading from "../components/Loading";
import BlueCircle from "../components/BlueCircle";
import timeFormat from "../lib/TimeFormat";
import dateFormat from "../lib/dateFormat";

const MyBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    //fetch bookings from backend
    (setBookings(dummyBookingData), setIsLoading(false));
  };
  useEffect(() => {
    getMyBookings();
  }, []);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlueCircle top="100px" left="100px" />
      <div>
        <BlueCircle bottom="0px" left="600px" />
      </div>
      <h1 className="text-lg font-semibold mb-4"> My Bookings</h1>

      {bookings.map((booking, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg  mt-4 p-2 max-w-3xl"
        >
          <div className="flex flex-col md:flex-row">
            <img
              src={booking.show.movie.poster_path}
              alt=""
              className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
            />
            <div className="flex flex-col p-4">
              <p className="text-lg font-semibold">
                {booking.show.movie.title}
              </p>
              <p className=" text-gray-400 text-sm">
                {timeFormat(booking.show.movie.runtime)}
              </p>
              <p className="text-gray-400 mt-auto">
                {dateFormat(booking.show.showDateTime)}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:items-end md:text-right justify-between p-4">
            <div className="flex items-center gap-4 ">
              <p className="text-2xl font-semibold mb-3">
                {currency}
                {booking.amount}
              </p>
              {!booking.isPaid &&  <button className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer">
                Pay Now </button>}
            </div>
            <div className="text-sm text-gray-400">
              <p>
                Seats:{" "} 
                {booking.bookedSeats.map((seat, idx) => (
                  <span key={idx}>
                    {seat}  {idx !== booking.bookedSeats.length - 1 ? "," : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loading />
    </div>
  );
};

export default MyBooking;
