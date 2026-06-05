import "./globals.css";

export const metadata = {
  title: "EventHub | College Event Registration Platform",
  description: "Register for exciting college events - hackathons, sports, dance competitions, workshops, and more! A modern event registration platform.",
  keywords: "event registration, college events, hackathon, sports, dance, workshop, seminar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Animated Background */}
        <div className="bg-animation">
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
          <div className="bg-orb"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
