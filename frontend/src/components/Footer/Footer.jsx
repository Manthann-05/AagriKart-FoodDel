// Footer.jsx
import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { AnimatePresence, motion } from "framer-motion";
import { FaYoutube, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

const sections = {
  home: {
    title: 'Home',
    body: `Discover curated dishes, live tracking, and offers tailored to your location. AagriKart keeps your go‑to meals one tap away, day or night.`,
  },
  about: {
    title: 'About Us',
    body: `AagriKart connects local kitchens with hungry customers through a fast, reliable delivery network focused on freshness, transparency, and great service.`,
  },
  delivery: {
    title: 'Delivery',
    body: `From lightning‑fast city drops to scheduled deliveries, we partner with verified riders and restaurants to ensure your order arrives hot and on time.`,
  },
  privacy: {
    title: 'Privacy Policy',
    body: `Your personal data and payment details are encrypted and handled securely. We only use your information to improve recommendations and complete your orders.`,
  },
};

const socials = [
  {
    label: "Youtube",
    href: "https://youtube.com",
    Icon: FaYoutube,
    bg: "hover:bg-[#FF0000]/15 hover:border-[#FF0000]/30 hover:text-[#FF0000]",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    Icon: FaXTwitter,
    bg: "hover:bg-white/10 hover:border-white/20 hover:text-white",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    Icon: FaLinkedinIn,
    bg: "hover:bg-[#0A66C2]/15 hover:border-[#0A66C2]/30 hover:text-[#0A66C2]",
  },
];

const Footer = () => {
  const [activeKey, setActiveKey] = useState(null);
  const active = activeKey ? sections[activeKey] : null;

  const closeModal = () => setActiveKey(null);

  return (
    <>
      <footer
        className="
          footer bg-black text-white pb-6 h-auto
          px-6 md:px-12 lg:px-24 pt-16 md:pt-20 w-full
        "
        id="contact"
      >
        <div
          className="
            grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr]
            gap-10 md:gap-12 mb-10
          "
        >
          {/* Left brand block */}
          <div className="flex flex-col gap-4 max-w-lg">
            <img
              src={assets.logo}
              alt="AagriKart"
              className="h-10 md:h-12 w-44"
            />
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              AagriKart keeps your cravings covered with dark‑mode friendly
              tracking, curated partners, and delivery that fits both daytime hustle
              and late‑night chill.
            </p>
            <div className="flex gap-3 mt-1">
              {socials.map(({ label, href, Icon, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={`
                    h-10 w-10 rounded-full grid place-items-center
                    bg-white/5 border border-white/10 text-zinc-200
                    transition-all duration-200
                    hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.55)]
                    ${bg}
                  `}
                >
                  <Icon className="text-[16px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Company with popups */}
          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-3">
              Company
            </h2>
            <ul className="flex flex-col gap-3 text-zinc-400 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveKey('home')}
                  className="hover:text-zinc-200 transition-colors text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveKey('about')}
                  className="hover:text-zinc-200 transition-colors text-left cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveKey('delivery')}
                  className="hover:text-zinc-200 transition-colors text-left cursor-pointer"
                >
                  Delivery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveKey('privacy')}
                  className="hover:text-zinc-200 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact block */}
          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-3">
              Get in touch
            </h2>
            <ul className="flex flex-col gap-1 text-zinc-400 text-sm">
              <li>+1-212-456-7890</li>
              <li>contact@aagrikart.com</li>
            </ul>
          </div>
        </div>

        <hr className="border-zinc-800" />

        <div className="flex flex-col items-center justify-center mt-6 gap-1 text-zinc-600 text-xs md:text-sm text-center">
          <p>Copyright 2025 © AagriKart.com - Inc. All rights reserved.</p>
          <p>Made with ❤️ by Manthan</p>
        </div>
      </footer>

      {/* Modal overlay for footer info */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-dialog-title"
            tabIndex={-1}
            onClick={closeModal} // outside click closes
            onKeyDown={(e) => {
              if (e.key === "Escape") closeModal(); // ESC closes
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="
                relative w-full max-w-lg overflow-hidden rounded-3xl
                bg-zinc-950/80 border border-white/10
                shadow-[0_35px_120px_rgba(0,0,0,1)]
                backdrop-blur-2xl
              "
              onClick={(e) => e.stopPropagation()} // prevent inside click closing
              initial={{ y: 18, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 10, scale: 0.985, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              {/* Glow blobs (premium Dribbble-style) */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full bg-orange-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-red-500/15 blur-3xl" />

              {/* Header row */}
              <div className="flex items-start justify-between gap-4 px-6 pt-6">
                <div>
                  <h3
                    id="footer-dialog-title"
                    className="text-xl font-semibold text-zinc-50 tracking-tight"
                  >
                    {active.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-zinc-400">
                    AagriKart • Info
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:block shrink-0">
                    <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 grid place-items-center overflow-hidden">
                      <img
                        src="/favicon.png"
                        alt=""
                        className="block h-full w-full object-contain scale-90"
                      />
                    </div>
                  </div>

                  <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed">
                    {active.body}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="
                      w-full sm:w-auto px-8 py-2.5 rounded-xl text-sm font-semibold text-black
                      bg-linear-to-r from-orange-400 to-red-500
                      hover:from-orange-300 hover:to-red-400
                      shadow-[0_16px_40px_rgba(248,113,113,0.35)]
                      transition-all cursor-pointer
                    "
                  >
                    Got it
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
