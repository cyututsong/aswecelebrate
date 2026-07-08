import Image from "next/image";
import Style from "./Home.module.css";
import Ctabuttons from "@/components/ui/buttons/CtaButtons"


export default function Home() {
  return (
    <main className="min-h-screen flex items-top flex-direction-column">
      <section className={Style.bannerSection}>
        <div>
          <h2>Seamless Online Invitations for Your <br />Perfect Wedding Celebration</h2>
          <p>Save time and money with a stunning wedding website that beautifully tells your story. Fully customizable, stress-free, and ready to share instantly.</p>
          <Ctabuttons />
        </div>
        <div>
          <Image
            src="https://www.weddingwire.com/assets/img/landing-tools/websites/en/heading.webp"
            alt="Wedding Website"
            width={500}
            height={300}
          />
        </div>
      </section>


      <section className={Style.featureSection}>
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
      </section>










    </main>
  );
}