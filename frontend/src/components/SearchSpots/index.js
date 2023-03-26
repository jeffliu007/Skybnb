import { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { fetchSearch } from "../../store/search";

const Searchbar = () => {
  const dispatch = useDispatch();
  const [queryRes, setQueryRes] = useState("");
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [count, setCount] = useState(-1);
  const ulRef = useRef();

  const allSpots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  const filteredRes = useMemo(() => {
    const spotRes = Object.values(allSpots).filter(
      (spot) =>
        spot.city.toLowerCase().startsWith(queryRes.toLowerCase()) ||
        spot.state.toLowerCase().startsWith(queryRes.toLowerCase()) ||
        spot.country.toLowerCase().startsWith(queryRes.toLowerCase())
    );
    const setFilter = new Set();

    for (let spot of spotRes) {
      setFilter.add(spot.city);
    }
    const arrFilter = Array.from(setFilter);
    return arrFilter;
  }, [allSpots, queryRes]);

  useEffect(() => {
    if (!showMenu) return;
    if (
      filteredRes.length === 0 ||
      !queryRes ||
      (filteredRes.length === 1 && filteredRes[0] === queryRes)
    ) {
      setShowMenu(false);
      return;
    }
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
  }, [showMenu, filteredRes]);

  const handleSearchInputVal = (e) => {
    setQueryRes(e.target.value);
    setCount(-1);
    setShowMenu(true);
  };

  const handleSearch = (spot) => {
    setQueryRes(spot);
  };

  const handleSearchSub = (queryEnd) => {
    const results = dispatch(fetchSearch(queryEnd))
      .then(setQueryRes(""))
      .then(history.push("/"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          history.push("/");
          return "no spots";
        }
      });
  };

  const handleSearchKey = (e) => {
    switch (e.keyCode) {
      case 38:
        e.preventDefault();
        if (count === -1) return;
        setCount(count - 1);
        break;
      case 40:
        e.preventDefault();
        if (count < filteredRes.length - 1) {
          setCount(count + 1);
        }
        break;
      case 13:
        if (count > -1) {
          setQueryRes(filteredRes[count]);
        }
        if (!showMenu) {
          handleSearchSub(queryRes);
        }
        break;
      default:
        break;
    }
  };

  const searchDropDown = "Searchbar-dropdown" + (showMenu ? "" : " hide");

  return (
    <div className="Searchbar-Main">
      <div className="Searchbar-Container">
        <input
          className="Searchbar-Input"
          placeholder="Search by location"
          value={queryRes}
          onChange={handleSearchInputVal}
          onKeyDown={handleSearchKey}
        />
        <button className="Searchbar-Button">
          <i className="fa solid fa-magnifying-glass"></i>
        </button>
      </div>
      {filteredRes && (
        <div>
          <ul>
            {filteredRes.map((spot, idx) => {
              <li
                key={idx}
                className={`Searchbar-Suggestions {idx === count ? "red" : ""}`}
                style={{ color: idx === count ? "red" : "" }}
                onClick={() => handleSearch(spot)}
              >
                {spot}
              </li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
