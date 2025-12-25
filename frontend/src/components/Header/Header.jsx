// Header.jsx
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="relative mt-32 mx-4 md:mx-10 rounded-4xl overflow-hidden">
      {/* background */}
      <div className="absolute inset-0">
        <img
          src="/header_img.png"
          className="w-full h-full object-cover scale-105 md:scale-100
                     transition-transform duration-700 hover:scale-110"
          alt="header"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/80 to-black/40" />
      </div>

      <div className="
        relative z-10
        grid md:grid-cols-[1.4fr_1fr]
        items-center
        px-6 md:px-14 lg:px-20 py-12 md:py-16 gap-10
      ">
        {/* left */}
        <div className="flex flex-col gap-6 max-w-xl">
          <p className="text-[11px] font-semibold tracking-[0.32em] text-green-400/80 uppercase">
            live • dark mode delight
          </p>
          <h1 className="
            text-4xl md:text-5xl lg:text-6xl
            font-black text-zinc-50 leading-[1.05]
            tracking-tight
          ">
            Cravings, but make it
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-300 to-yellow-300">
              Midnight Friendly.
            </span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base lg:text-lg font-medium leading-relaxed">
            AagriKart matches dark‑mode vibes with late‑night comfort food, fast delivery, and cinematic tracking on a rich, glassy interface.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/cart"
              className="
                inline-flex items-center justify-center
                bg-linear-to-r from-red-500 to-orange-500
                text-white font-bold text-sm md:text-base
                px-8 md:px-10 py-3 md:py-3.5 rounded-2xl
                shadow-[0_18px_45px_rgba(248,113,113,0.9)]
                hover:translate-y-px active:translate-y-0.5
                active:scale-[0.98]
                transition-all duration-200
              "
            >
              Order Now
            </Link>
            <a
              href="#menu"
              className="
                inline-flex items-center justify-center
                px-7 py-3 rounded-2xl
                border border-white/10
                bg-white/5 backdrop-blur-xl
                text-zinc-100 font-semibold text-sm
                hover:bg-white/10
                transition-all duration-200
              "
            >
              Browse Menu
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] text-zinc-500 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Real-time order tracking</span>
            </div>
            <span>•</span>
            <span>Curated late‑night specials</span>
          </div>
        </div>

        {/* right / Spline slot */}
        <div className="hidden md:flex items-center justify-center">
          <div className="
            relative w-full max-w-sm aspect-4/5
            rounded-3xl bg-zinc-950/70 border border-zinc-800
            backdrop-blur-2xl overflow-hidden
            shadow-[0_24px_90px_rgba(0,0,0,1)]
          ">
            {/* for future: <Spline scene="..." /> */}
            <img
              src="/header_top_pick.png"
              alt="featured dish"
              className="w-full h-full object-cover scale-110 translate-y-2"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

            <div className="
              absolute left-4 bottom-5
              rounded-2xl bg-black/70 border border-white/10
              px-4 py-3 flex flex-col gap-1 text-[11px] text-zinc-200
            ">
              <span className="font-semibold">Top pick near you</span>
              <span className="text-zinc-400">ETA ~22 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
