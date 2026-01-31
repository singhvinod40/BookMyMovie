import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlueCircle from "../components/BlueCircle";
import { HeartIcon, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/TimeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  const getShows = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShows();
  }, [id]);

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-20 md:pt-32 pb-20">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Image */}
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="rounded-xl w-72 h-auto object-cover"
        />

        {/* Details */}
        <div className="relative flex flex-col gap-4 flex-1">
          <BlueCircle top="-100px" left="-100px" />
          <p className="text-primary font-medium text-sm">ENGLISH</p>
          <h1 className="text-4xl font-bold max-w-96">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            <span>{show.movie.vote_average.toFixed(1)}</span>
            <span>User Rating</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
            {show.movie.overview}
          </p>
          <p className="text-gray-400 text-sm">
            {timeFormat(show.movie.runtime)} |{" "}
            {show.movie.genres
              .slice(0, 3)
              .map((genre) => genre.name)
              .join(", ")} | {show.movie.release_date.split("-")[0]}
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-4 mt-4 ">
          <button className="flex items-center gap-2 px-7 py-3 text-sm  bg-gray-800 hover:gray-900 
          transition rounded-md font-medium cursor-pointer active:scale-95">
            <PlayCircleIcon className="w-5 h-5 inline-block mr-2" />
            Watch Trailer </button>
          <a href="#dateSelect" className="px-10 py-3 text-sm bg-red-400 hover:bg-red-300 transition rounded-md 
          font-medium cursor-pointer active:scale-95 ">Buy Ticket</a>
          <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95 ">
            <HeartIcon className={`w-5 h-5 inline-block mr-2`} />
          </button>
        </div>
      </div>


      <p className="text-lg font-medium mt-20"> Movie Casting</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4 ">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center min-w-[100px]">
              <img src={cast.profile_path} alt="" className="rounded-full h-20 md:h-20 aspect-square object-cover" />
              <p className="text-sm mt-2 text-center">{cast.name}</p>
            </div>
          ))}
        </div>

      </div>
      <DateSelect dateTime={show.dateTime} id={id} />
      <p className="text-lg font-medium mt-20 mb-g">You may also Like</p>
      <div className="flex flex-wrap max-sm:justfy-center gap-8">
        {dummyShowsData.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button onClick={() => { navigate('/movies'); scrollTo(0, 0) }} className="px-10 py-3 text-sm
         bg-primary hover:bg-red-300  transition rounded-md font-medium cursor-pointer "> Show More</button>
      </div>

    </div>
  ) : (
    <div className="flex items-center justify-center h-screen gap-4">
      Loading... <Loading />
    </div>
  );
};

export default MovieDetails;