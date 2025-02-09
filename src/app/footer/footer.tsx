export default function Footer() {
  return (
    <footer className="border-t-2 p-8 text-center text-accent">
      <div className="container">
        <p>{new Date().getFullYear()} All rights reserved </p>
      </div>
    </footer>
  );
}
