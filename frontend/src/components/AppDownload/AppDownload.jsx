// AppDownload.jsx
import React from 'react';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div
      className="
        app-download flex flex-col items-center text-center
        py-20 md:py-24 px-6
        gap-10 md:gap-12
      "
      id="download"
    >
      <p
        className="
          font-extrabold text-3xl md:text-4xl lg:text-5xl
          leading-tight tracking-tight text-zinc-700 dark:text-zinc-50
        "
      >
        For a smoother experience,
        <br />
        download the <span className="text-orange-400">AagriKart App</span>
      </p>

      <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
        <img
          src={assets.play_store}
          alt="Play Store"
          className="
            w-40 h-13 md:w-48 md:h-14
            hover:scale-105 hover:-translate-y-px
            transition-transform duration-200 cursor-pointer
          "
        />
        <img
          src={assets.app_store}
          alt="App Store"
          className="
            w-40 h-13 md:w-48 md:h-14
            hover:scale-105 hover:-translate-y-px
            transition-transform duration-200 cursor-pointer
          "
        />
      </div>
    </div>
  );
};

export default AppDownload;
