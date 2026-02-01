import Link from "next/link";
import useDeviceDetect from "../utils/utils";
import { useIsHome, useIsLabelPage } from "../hooks/useNamePage";

const SocialLink = ({ href, children }) => (
  <Link href={href} className="hover:text-gray-900 dark:hover:text-white">
    {children}
  </Link>
);

const SocialIcons = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <div
      className={
        "flex mt-4 space-x-6 sm:justify-center sm:mt-0 " +
        (isMobile ? "center-social-mobile" : "")
      }
    >
      <SocialLink href="https://github.com/victorfg">
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      </SocialLink>
      <SocialLink href="https://www.linkedin.com/in/victor-fernandez-gayan/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-5 h-5"
        >
          <path
            fill="currentColor"
            d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
          />
        </svg>
      </SocialLink>
    </div>
  );
};

export const Footer = () => {
  const isHome = useIsHome();
  const isLabelPage = useIsLabelPage();
  const { isMobile } = useDeviceDetect();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="sm:mt-auto pb-safe px-6 sm:px-0">
      <div className={`footer-main md:bottom-0 md:w-full md:mb-5 py-6 pb-8`}>
        {isMobile && <SocialIcons />}
        <div className="sm:flex sm:items-center sm:justify-between text-center">
          <span className="text-sm sm:text-center dark:text-gray-400">
            © {currentYear}
            <Link href="/" className="hover:underline">
              {" "}
              ...codingPosts.
            </Link>
          </span>
          <div className="text-sm flex items-center justify-center">
            <div className="mr-1 w-5 h-5">
              <svg
                fill="#000000"
                width="20px"
                height="20px"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                className="dark:fill-white"
              >
                <path d="M7.975 2c-2.235.116-4.365 1.203-5.82 2.89C.7 6.57 0 8.786 0 11c0 1.938.697 3.816 1.646 5.46.95 1.644 2.19 3.077 3.5 4.394 2.824 2.833 6.08 5.232 9.622 7.09.145.076.32.076.464 0 3.543-1.858 6.798-4.257 9.622-7.09 1.31-1.317 2.55-2.75 3.5-4.393C29.304 14.817 30 12.94 30 11c0-2.22-.7-4.428-2.154-6.11C26.39 3.202 24.26 2.115 22.026 2c-1.516-.078-3.045.286-4.362 1.04-1.097.626-1.975 1.558-2.664 2.614-.69-1.056-1.567-1.988-2.664-2.615C11.02 2.285 9.49 1.92 7.976 2zm.05 1c1.32-.068 2.665.25 3.813.906 1.148.656 2.107 1.652 2.72 2.824.186.36.698.36.885 0 .612-1.172 1.57-2.168 2.72-2.824 1.147-.656 2.49-.974 3.812-.906 1.942.1 3.837 1.062 5.115 2.54C28.37 7.023 29 9 29 11c0 1.73-.628 3.43-1.512 4.96-.885 1.535-2.064 2.904-3.342 4.186-2.686 2.697-5.788 4.975-9.146 6.766-3.358-1.79-6.46-4.07-9.146-6.766-1.278-1.282-2.457-2.65-3.342-4.185C1.628 14.43 1 12.73 1 11c0-2 .63-3.978 1.91-5.46C4.188 4.063 6.083 3.1 8.025 3z" />
              </svg>
            </div>

            <p>
              made with
              <Link 
                href="https://nextjs.org/" 
                className="hover:underline" 
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Next.js
              </Link>
              ,
              <Link 
                href="https://tina.io/" 
                className="hover:underline" 
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                TINA
              </Link>{" "}
              and
              <Link 
                href="https://tailwindcss.com/" 
                className="hover:underline" 
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                tailwindcss
              </Link>
            </p>
          </div>
          {!isMobile && <SocialIcons />}
        </div>
      </div>
    </footer>
  );
};
