import Style from "./Footer.module.css";

function Footer() {
  return (
    <>
      <div className="container">
        <footer className="py-3 my-4">
          <ul
            className={`nav justify-content-center border-bottom pb-3 mb-3 ${Style.footerLine}`}
          >
            <li className="nav-item">
              <a href="/Home" className="nav-link px-2 text-body-secondary">
                <i className="bi bi-house-door-fill"></i>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                <i className="bi bi-instagram"></i>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                <i className="bi bi-person-fill"></i>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="www.linkedin.com/in/rakesh-baleri-bba4ab305"
                target="_blank"
                className="nav-link px-2 text-body-secondary"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                <i className="bi bi-share-fill"></i>
              </a>
            </li>
          </ul>
          <p className={`text-center ${Style.footerText}`}>
            Website by Rakesh_Baleri
          </p>
        </footer>
      </div>
    </>
  );
}

export default Footer;
