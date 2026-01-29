import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import TereIshqPoster from "../assets/Tere-Ishk-Mein.png";
import { useNavigate } from "react-router-dom";

function HeroSection() {

    const navigate = useNavigate();
    return (
        <div
            className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen'
            style={{ backgroundImage: `url(${TereIshqPoster})` }}>
            <img src={assets.tseries} alt="" className="max-h-11 lg:h-11 mt-20" />
            <h1 className="text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110">
                Tere <br />
                Ishk me{" "}
            </h1>

            <div className="flex items-center gap-4 text-gray-300">
                <span>U/A 16+ |</span>
                <span>Drama,Romantic |</span>
                <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4.5 h-4.5" />
                    Nov-2025 |
                </div>
                <div className="flex items-center gap-1">
                    <ClockIcon className="w-4.5 h-4.5" />
                    2h 49m
                </div>
            </div>
            <p>Some souls are meant to collide. Some love stories are destined to burn brighter.</p>

            <button onClick={() => navigate('/movies')} className="flex item-center gap-1 px-6 py-3 text-sm bg-red-600 hover:bg-red-400

        transition rounded-full font-medium  cursor-pointer" >
                Explore Movie<ArrowRight className="w-5 h-5" />
            </button>
        </div>

    );
}

export default HeroSection;