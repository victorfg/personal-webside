import Head from "next/head";
import Link from "next/dist/client/link";
import { useEffect } from "react";

export default function Custom404() {
  useEffect(() => {
    document.querySelector(".mb-auto").classList.add("position-relative");
    document.querySelector(".footer-main").classList.add("position-bottom");
  });
  return (
    <>
      <Head>
        <title>404 Error: Page Not Found</title>
        <meta
          name="description"
          content="The page you are looking for cannot be found on this website."
        />
      </Head>

      <div className="container">
        <img src="/404_error.jpg" alt="Page not found" className="image404" />
        <h1>Uh-oh! Looks like you stumbled into the wrong matrix.</h1>
        <p>The page you are looking for cannot be found on this website.</p>
        <Link href="/">
          <a className="btn-primary">Back to the Matrix</a>
        </Link>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 50px;
          padding: 20px;
          max-width: 700px;
          margin: 0 auto;
        }

        .image404 {
          width: 200px;
          height: 200px;
          margin-bottom: 20px;
        }

        h1 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 20px;
        }

        p {
          font-size: 1.25rem;
          text-align: center;
          margin-bottom: 40px;
        }

        .btn-primary {
          background-color: #4caf50;
          color: #fff;
          padding: 12px 24px;
          border-radius: 4px;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #2e8b57;
        }

        @media screen and (max-width: 600px) {
          .container {
            margin-top: 20px;
            padding: 10px;
          }

          .image404 {
            width: 140px;
            height: 140px;
            margin-bottom: 10px;
          }

          h1 {
            font-size: 2rem;
            margin-bottom: 10px;
          }

          p {
            font-size: 1rem;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Page Not Found",
      description:
        "The page you are looking for cannot be found on this website.",
    },
  };
}
