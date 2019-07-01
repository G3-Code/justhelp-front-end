import React from "react";
import "../styles/footer.css";

function Footer(props) {
  return (
    <div className="footer-container">
      <div className="footer-content-container">
        {/* <a href="https://justhelp.netlify.com/about.html">About</a> */}
        <span className="copyright-info">
          Copyright &copy; 2019 Justhelp. All rights reserved.
        </span>

        {/* <span>Powered by Lambda</span> */}
      </div>
    </div>
  );
}
export default Footer;
