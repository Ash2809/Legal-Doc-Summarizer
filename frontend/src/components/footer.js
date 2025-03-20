export default function Footer() {
    return (
      <footer className="footer">
        <p>© {new Date().getFullYear()} Legal Eagle. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <img src="/assets/instagram.svg" alt="Instagram" className="social-icon" />
          </a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
            <img src="/assets/twitter.svg" alt="X (Twitter)" className="social-icon" />
          </a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </footer>
    );
  }
  