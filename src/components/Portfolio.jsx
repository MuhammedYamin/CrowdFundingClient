/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [filter, setFilter] = useState("All Zones");
  const [portfolioData, setPortfolioData] = useState({
    education: [],
  });

  const initialItemsToShow = 3; // Initial number of items to show
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const portfolioRef = useRef(null);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    filterItems(filter);
  }, [filter, portfolioData]);

  const fetchPortfolioData = async () => {
    try {
      const projectsResponse = await fetch(
        "http://localhost:2000/users/getApprovedProjects"
      );
      const projectsResult = await projectsResponse.json();

      setPortfolioData({
        education: projectsResult.education || [],
      });
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  const handleFilter = (zone) => {
    setFilter(zone);
    setItemsToShow(initialItemsToShow);
    setShowLoadMore(true);
    portfolioRef.current.scrollIntoView({ behavior: "smooth", block: "initial" });
  };

  const handleLoadMore = () => {
    setItemsToShow(itemsToShow + initialItemsToShow);
    if (itemsToShow + initialItemsToShow >= getTotalItems()) {
      setShowLoadMore(false);
    }
  };

  const handleLoadLess = () => {
    setItemsToShow(initialItemsToShow);
    setShowLoadMore(true);
    portfolioRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getTotalItems = () => {
    if (filter === "All Zones") return portfolioData.education.length;
    return portfolioData.education.filter(item => item.zone === filter).length;
  };

  const filterItems = (zone) => {
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    portfolioItems.forEach((item) => {
      const itemZone = item.getAttribute("data-zone");
      if (zone === "All Zones" || itemZone === zone) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };

  const renderPortfolioItems = (items) => {
    if (!Array.isArray(items)) return null;
    const filteredItems = filter === "All Zones" 
      ? items 
      : items.filter(item => item.zone === filter);
    
    return filteredItems.slice(0, itemsToShow).map((item) => (
      <div
        className={`col-lg-4 col-md-6 portfolio-item`}
        data-zone={item.zone}
        key={item._id}
      >
        <div className="portfolio-wrap">
        <Link to={`/description/${item._id}/education`}>
          <div
            className="portfolio-image"
            style={{
              backgroundImage: item.imagePath
                ? `url(${item.imagePath ? item.imagePath[0] : ""})`
                : "none",
              backgroundColor: item.imagePath ? "transparent" : "#f0f0f0",
              objectFit: "cover",
            }}
          >
            {!item.imagePath && (
              <p className="no-image-text">No Image Available</p>
            )}
          </div>
          <div
            className="portfolio-title"
            style={{ backgroundColor: "#ecf5f9" }}
          >
            <p className={"portfolio-name"} style={{ color: "black" }}>
              <Link
                to={`/description/${item._id}/education`}
                style={{ color: "black" }}
                className="link"
              >
                {item.name || item.schoolName || item.projectName}
              </Link>
            </p>
          </div>
          
          </Link>

        </div>

      </div>

    ));
  };

  return (
    <div className="container">
      <div className="section-title" data-aos="fade-in" data-aos-delay="100">
        <h2>Education Portfolio</h2>
        <p style={{ color: "black" }}>
          Displaying educational institutes of Dakshina Kannada  segregated by blocks.
        </p>
      </div>

      <div className="row" data-aos="fade-in" ref={portfolioRef}>
        <div className="col-lg-12 d-flex flex-column justify-content-center">
          <ul id="portfolio-flters">
            <li
              onClick={() => handleFilter("All Zones")}
              className={filter === "All Zones" ? "filter-active" : ""}
            >
              All Zones
            </li>
            <li
              onClick={() => handleFilter("Bantwal")}
              className={filter === "Bantwal" ? "filter-active" : ""}
            >
              Bantwal
            </li>
            <li
              onClick={() => handleFilter("Belthangady")}
              className={filter === "Belthangady" ? "filter-active" : ""}
            >
              Belthangady
            </li>
            <li
              onClick={() => handleFilter("Manglore North")}
              className={filter === "Manglore North" ? "filter-active" : ""}
            >
              Mangalore North
            </li>
            <li
              onClick={() => handleFilter("Manglore South")}
              className={filter === "Manglore South" ? "filter-active" : ""}
            >
              Mangalore South
            </li>
            <li
              onClick={() => handleFilter("Moodabidre")}
              className={filter === "Moodabidre" ? "filter-active" : ""}
            >
              Moodabidre
            </li>
            <li
              onClick={() => handleFilter("Puttur")}
              className={filter === "Puttur" ? "filter-active" : ""}
            >
              Puttur
            </li>
            <li
              onClick={() => handleFilter("Sullia")}
              className={filter === "Sullia" ? "filter-active" : ""}
            >
              Sullia
            </li>
          </ul>
        </div>
      </div>

      <div className="row portfolio-container" data-aos="fade-up">
        {renderPortfolioItems(portfolioData.education)}
      </div>

      <div className="text-center mt-4">
        {showLoadMore && itemsToShow < getTotalItems() && (
          <button className="btn btn-primary mx-5" onClick={handleLoadMore}>
            Load More
          </button>
        )}
        {!showLoadMore && <p className="text-muted">No more items to load</p>}
        {itemsToShow > initialItemsToShow && (
          <button className="btn btn-primary" onClick={handleLoadLess}>
            Load Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
