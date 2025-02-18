import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/Aventale/chapters/1");
  };

  return (
    <div className="homepage">
      <img
        src="/Aventale/homepage/test3.png"
        alt="Cover Page"
        className="homepage-image"
      />
      <button className="homepage-button" onClick={handleStartClick}>
        <img
          src="/Aventale/homepage/Bouton_FirstEP.png"
          alt="Premier Chapitre"
          className="button-image"
        />
      </button>
    </div>
  );
}
  
export default HomePage;

/*
<h1 className="title">Synopsis</h1>
<div className="synopsis-container">
  <p className="synopsis">
    Aqliva rêve de trouver la Perle Légendaire, le trésor que Zero a caché
    après avoir sauvé le monde. <br />
    Mais à ses 10 ans, alors que chaque enfant reçoit sa propre Perle
    Spirituelle pour partir à l’aventure, elle n'en obtient aucune… <br />
    Comment poursuivra-t-elle son rêve sans cet objet magique ?
  </p>
</div>
*/