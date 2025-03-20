import "@/app/styles/global.css";
import Navbar from "@/components/navbar";
import Background from "@/components/background";
import Footer from "@/components/footer";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Background/>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
