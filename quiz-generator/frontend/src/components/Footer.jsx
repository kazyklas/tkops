import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {new Date().getFullYear()} QuizGen AI. Powered by OpenAI.
        </p>
      </div>
    </footer>
  );
}
