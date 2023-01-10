import "./footer.scss";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-copyright">
        <p className="text-copyright">
          <span>Made with </span>
          <span>
            <i
              className="fa fa-heart"
              style={{ color: "rgba(42, 42, 42, 0.3)" }}
            ></i>{" "}
            by{" "}
          </span>
          <a href="https://github.com/peteriscaurs" target="_blank">
            <strong>Pēteris Čaurs</strong>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
