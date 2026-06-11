import Hero from "../../components/homeComponents/Hero";
import ComeFunziona from "../../components/homeComponents/ComeFunziona";
import Feedback from "../../components/homeComponents/Feedback";
import Assistenza from "../../components/homeComponents/Assistenza";
import Newsletter from "../../components/homeComponents/Newsletter";
import BannerOrganizzatore from "../../components/homeComponents/BannerOrganizzatore";
import ListEvent from "../../components/homeComponents/ListEvent";
import ListLocations from "../../components/homeComponents/ListLocation";
import useSEO from "../../hooks/useSEO";
import BannerStats from "../../components/homeComponents/BannerStats"

const HomePage = () => {
  useSEO({
    title: "Home",
    description: "EventHub è la piattaforma ideale per scoprire, creare e organizzare eventi indimenticabili."
  });

  return (
    <div className="home-page text-light">
      <Hero />
      <BannerStats />
      <ListEvent />
      <ListLocations />
      <ComeFunziona />
      <BannerOrganizzatore />
      <Feedback />
      <Assistenza />
      <Newsletter />
    </div>
  );
};

export default HomePage;