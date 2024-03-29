import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef } from "react";
import ThemeSwitch from "../components/ThemeSwitch";
import MobileNav from "../components/MobileNav";
import headerNavLinks from "../siteMetadata/headerNavLinks";
import { motion, useAnimation } from "framer-motion";
import useScrollPosition from "../hooks/useScrollPosition";
import useDeviceDetect from "../utils/utils";
const siteMetadata = require("../siteMetadata/siteMetadata");

const LayoutWrapper = ({ children }) => {
  const { isMobile } = useDeviceDetect();
  const navRef = useRef(null);
  const control = useAnimation();

  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (isMobile) {
      if (scrollPosition > 10) {
        navRef.current.classList.add(
          ...["shadow", "backdrop-blur-xl", "dark:bg-darkSecondary"]
        );

        control.start("visible");
      } else {
        navRef.current.classList.remove(
          ...["shadow", "backdrop-blur-xl", "dark:bg-darkSecondary"]
        );
        control.start("hidden");
      }
    }
  }, [scrollPosition]);

  if (isMobile) {
    return (
      <div className="flex flex-col justify-between">
        <div className="header fixed w-full z-10" ref={navRef}>
          <header
            className="flex items-center justify-between pb-6 lg:py-10 mt-4"
            ref={navRef}
          >
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <a className="cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="mr-3" />
                  {typeof siteMetadata.headerTitle === "string" ? (
                    <div className="text-2xl font-semibold sm:block title-header">
                      {siteMetadata.headerTitle}
                    </div>
                  ) : (
                    siteMetadata.headerTitle
                  )}
                </div>
              </a>
            </Link>
            <div className="flex items-center text-base leading-5">
              <div className="hidden sm:block">
                {headerNavLinks.map((link) => (
                  <Link key={uuidv4()} href={link.href}>
                    <a className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4">
                      {link.title}
                    </a>
                  </Link>
                ))}
              </div>
              <ThemeSwitch />
              <MobileNav />
            </div>
          </header>
        </div>
        <SectionContainer>
          <main className="mb-auto mt-20">{children}</main>
        </SectionContainer>
      </div>
    );
  } else {
    return (
      <SectionContainer>
        <div className="flex flex-col justify-between">
          <motion.div
            className="header"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <header className="flex items-center justify-between pb-10 lg:py-10">
              <Link href="/" aria-label={siteMetadata.headerTitle}>
                <a className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="mr-3" />
                    <div className="text-2xl font-semibold sm:block title-header">
                      {siteMetadata.headerTitle}
                    </div>
                  </div>
                </a>
              </Link>
              <div className="flex items-center text-base leading-5">
                <div className="hidden sm:block">
                  {headerNavLinks.map((link, i) => (
                    <Link key={uuidv4()} href={link.href}>
                      <a className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4">
                        {link.title}
                      </a>
                    </Link>
                  ))}
                </div>
                <ThemeSwitch />
              </div>
            </header>
          </motion.div>
          <div className="mb-auto" id="style-scroll-custom">
            {children}
          </div>
        </div>
      </SectionContainer>
    );
  }
};

const SectionContainer = ({ children }) => {
  return <main>{children}</main>;
};

export default LayoutWrapper;
