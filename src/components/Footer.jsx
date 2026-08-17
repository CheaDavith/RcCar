import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__col">
        <div className="footer__badge">RC</div>
        <p className="footer__tagline">
          Built for the drift, the dirt, and everything in between.
        </p>
      </div>

      <div className="footer__col">
        <h4>Shop</h4>
        <ul>
          <li>On-road cars</li>
          <li>Off-road buggies</li>
          <li>Monster trucks</li>
          <li>Drift cars</li>
        </ul>
      </div>

      <div className="footer__col">
        <h4>Company</h4>
        <ul>
          <li><a href="AboutPage.jsx" className="a">About us</a></li>
          <li><a href="ReviewsPage.jsx" className="a">Reviews</a></li>
          <li><a href="https://t.me/L_Y_H_OUR" className="a">Contact</a></li>
        </ul>
      </div>

      <div className="footer__col">
        <h4>Stay in touch</h4>
        <p className="footer__email">cheadavith007@gmail.com</p>
      </div>

      <div className="footer__bottom">
        &copy; {new Date().getFullYear()} RC CAR. All rights reserved.
      </div>
    </footer>
  );
}