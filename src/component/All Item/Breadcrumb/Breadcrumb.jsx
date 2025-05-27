import { useLocation, useParams, Link } from "react-router-dom";
import gamesData from "../../../Assets/jsone/Search.json";
import "./Breadcrumb.scss";

const Breadcrumb = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split("/").filter((x) => x);

  // آخرین بخش ممکنه id باشه
  const lastPart = pathnames[pathnames.length - 1];
  const game = gamesData.find((game) => String(game.id) === lastPart);

  return (
    <nav className="breadcrumb">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const label = game && name === lastPart ? game.Title : name;

        return (
          <span key={name}>
            {" > "}
            {isLast ? <span>{label}</span> : <Link to={routeTo}>{label}</Link>}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
