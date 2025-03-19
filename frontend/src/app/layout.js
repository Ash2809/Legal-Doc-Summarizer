import "@/app/styles/global.css";
import Navbar from "@/components/navbar";
import Background from "@/components/background";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Background/>
        <main>{children}</main>
      </body>
    </html>
  );
}
