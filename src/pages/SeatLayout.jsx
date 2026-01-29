import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyShowsData, dummyDateTimeData, assets } from "../assets/assets";
import Loading from "../components/Loading";
import { Clock } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeForma";
import BlueCircle from "../components/BlueCircle";

const SeatLayout = () => {
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-6 lg:px-40 py-30 
      md:pt-50">
      {/* Avaliable Timings */}
      <div className="w-60 bg-primary/10 border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30 ">
        <p className="text-lg font-semibold px-6">Avaliable timings</p>
        <div className="mt-5 space-y-1" >
          {show.dateTime[date].map((item) => (
            <div key={item.time} onClick={() => setSelectedTime(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime ?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/20"}`}>
              <Clock className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Seat Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlueCircle top="-100px" left="-100px" />
        <BlueCircle top="0px" right="0px" />
          <h1 className="text-2xl font-semibold mb-4">Select your Seat</h1>
          <img src={assets.screenImage}  alt="Screen"/>
          <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

      </div>

    </div>
  ) : (
    <div><Loading /></div>
  );
};

export default SeatLayout;
