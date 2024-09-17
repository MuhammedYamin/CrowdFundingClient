import React, { useEffect, useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../Styles/style.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footers.jsx";
import { useParams } from "react-router-dom";
import "../Styles/Description.css";

const Description = () => {
  const { id, category } = useParams();
  const [itemDetails, setItemDetails] = useState([]);
  const [isCardOpen, setIsCardOpen] = useState({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setModal] = useState(false);
  const [showOtpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  let totalAmount;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemDetails();
  }, []); // Added empty dependency array to avoid infinite loop

  const handleDonate = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    setOtpModal(false);
  };

  const handleSubmit = async () => {
    // Gather donated items details
    const donatedItems = itemDetails[0]?.items
      .filter(item => item.quantitySelected > 0) // Only include items with a selected quantity
      .map(item => ({
        id: item._id, // Assuming each item has a unique _id field
        name: item.item, // Assuming the item name is stored in the 'item' field
        quantity: item.quantitySelected,
        totalCost: calculateTotalAmount(item.quantitySelected, item.amount),
      }));

    // Calculate total donation cost
    const totalDonationCost = donatedItems.reduce(
      (total, item) => total + item.totalCost,
      0
    );

    // Prepare the data to send to the backend
    const donationData = {
      donatorName: name,
      donatorAddress: address,
      donatorMail: email,
      donatorPhone: phone,
      donatedItems: donatedItems,
      totalDonationCost: totalDonationCost,
      projectId: id,
    };

    console.log(donationData);

    // Send user information to the backend
    try {
      const response = await fetch("http://localhost:2000/users/otpVerification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData), // Send the complete donation data
      });
      let result = await response.json();
      if (response.status === 200) {
        setUserId(result.userId);
        setOtpModal(true);
        setModal(false);
      } else {
        console.error("Failed to submit user information");
      }
    } catch (error) {
      console.error("Error submitting user information:", error);
    }
  };


  const handleOtpSubmit = async () => {
    try {
      const response = await fetch("http://localhost:2000/users/donatorsDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });
      let result = await response.json();
      if (response.status === 200) {
        alert("Thank you for your donation. We will contact you soon.");
      } else {
        console.error("Failed to submit user information");
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting user information:", error);
    }
  };

  const fetchItemDetails = async () => {
    let endpoint = "";
    switch (category) {
      case "events":
        endpoint = `http://localhost:2000/users/getApprovedEventDetails/${id}`;
        break;
      case "education":
        endpoint = `http://localhost:2000/users/getApprovedEducationDetails/${id}`;
        break;
      case "publicSpaces":
        endpoint = `http://localhost:2000/users/getApprovedPublicSpacesDetails/${id}`;
        break;
      case "health":
        endpoint = `http://localhost:2000/users/getApprovedHealthDetails/${id}`;
        break;
      default:
        console.error("Invalid category:", category);
        return;
    }

    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      const items = Array.isArray(result) ? result : [result];

      // Ensure quantitySelected is initialized
      const updatedItems = items[0]?.items?.map(item => ({
        ...item,
        quantitySelected: item.quantitySelected || 0, // Initialize quantitySelected if not present
      }));

      setItemDetails([{ ...items[0], items: updatedItems }]);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  const calculateDaysLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const daysFromNowToEnd = differenceInCalendarDays(end, now);
    return daysFromNowToEnd;
  };

  const toggleCard = (index) => {
    setIsCardOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleQuantityChange = (index, change) => {
    const updatedDetails = [...itemDetails];
    const item = updatedDetails[0]?.items[index];

    if (item) {
      const newQuantity = item.quantitySelected + change;
      const clampedQuantity = Math.max(0, Math.min(item.quantity, newQuantity));
      item.quantitySelected = clampedQuantity;
      setItemDetails(updatedDetails);
    }
  };

  const handleInputChange = (index, event) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (!isNaN(newQuantity)) {
      handleQuantityChange(index, newQuantity - itemDetails[0]?.items[index]?.quantitySelected); // Update based on new value
    }
  };

  // Calculate total amount for each card
  const calculateTotalAmount = (quantity, amount) => {
    totalAmount = quantity * amount;
    return totalAmount;
  };

  // Calculate overall total funding
// const calculateOverallTotalFunding = () => {
//   if (!Array.isArray(itemDetails)) return 0; // Check if itemDetails is an array

//   return itemDetails.reduce((total, item) => {
//     if (!Array.isArray(item.items)) return total; // Check if item.items is an array

//     return total + item.items.reduce((itemTotal, card) => {
//       return itemTotal + calculateTotalAmount(card.quantitySelected || 0, card.amount);
//     }, 0);
//   }, 0);
// };


  return (
    <>
      {itemDetails.map((item, index) => (
        <section
          id="title"
          style={{
            width: "100%",
            height: "80vh",
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${item.imagePath ? item.imagePath[0] : ""
              }) top center`,
            backgroundSize: "cover",
            position: "relative",
            marginBottom: "-90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            backgroundRepeat: "no-repeat",
          }}
          key={index}
        >
          <div className="container">
            <h1 className="display-4 fst-italic">
              {item.name || item.schoolName || item.projectName}
            </h1>
            <p className="lead my-3">
              The {category === "events" ? "Organizers" : "fundraiser"} of this{" "}
              {category === "events" ? "event" : "project"} is{" "}
              {item.organizers || item.fundRaiserName}
            </p>
          </div>
        </section>
      ))}


      <div
        className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary"
        style={{
          maxWidth: '100%',
          height: '500px',
          overflow: 'hidden',
        }}
      >
        <div className="col-lg-12 px-0">
          <h1 className="display-4 fst-italic text-center">
            Title
          </h1>
          <div
            className="col-lg-12 mb-5 mb-lg-0 order-lg-2"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <section id="testimonials" className="testimonials section-bg my-5">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {itemDetails.length > 0 &&
                    itemDetails[0]?.imagePath?.map((image, index) => (
                      <div
                        className={`carousel-item ${index === 0 ? 'active' : ''
                          }`}
                        key={index}
                      >
                        <img
                          src={image}
                          className="img-fluid large-image"
                          alt=""
                          style={{
                            maxHeight: '400px', // Control height for images
                            objectFit: 'cover', // Keep aspect ratio
                            width: '100%', // Make images fill the width
                          }}
                        />
                      </div>
                    ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    style={{ filter: 'invert(100%)', color: 'black' }}
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    style={{ filter: 'invert(100%)', color: 'black' }}
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>





      <section id="about" className="about section">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <h1 className="mt-4" data-aos="fade-up"></h1>
            {itemDetails.length > 0 && itemDetails[0].imagePath ? (
              <></>
            ) : (
              <></>
            )}
            {itemDetails?.map((item, index) => (
              <div key={index}>
                <div className="row mb-2">
                  {/* First Card */}
                  <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                      <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary-emphasis">Details of the Project</strong>
                        <h3 className="mb-0">Name of the FundRaiser: {item.fundRaiserName}</h3>
                        <p className="card-text mb-auto">
                          <p>Contact Number: {item.contact}</p>
                          <p>Zone: {item.zone}</p>
                          <p>Taluk: {item.taluk}</p>
                          <p>Village: {item.village}</p>
                          <p>End date: {formatDate(item.edate)}</p>
                          <p>Total amount required: {item.amount}</p>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Second Card */}
                  <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                      <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-success-emphasis">Requirements of the Project</strong>
                        <p className="mb-auto">
                          <table style={{ width: "100%" }}>
                            <thead>
                              <tr>
                                <th>Sl.No</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Total Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item?.items?.map((items, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{items.item}</td>
                                  <td>{items.quantity}</td>
                                  <td>{items.amount}</td>
                                  <td>{items.totalAmount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      disabled
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/*new section generated*/}
      <div className="container-fluid" style={{ backgroundColor: "#e6f7ff", overflowX: "hidden" }}>
  <div className="row g-5">
    <div className="col-md-8">
      <h3 className="pb-4 mb-4 fst-italic border-bottom" style={{ textAlign: "center" }}>
        Items to be Donated
      </h3>
      <div className="container">
        <div className="row gy-4">
          {itemDetails.length > 0 &&
            itemDetails[0].items &&
            itemDetails[0].items.map((item, index) => (
              <div
                className="col-12 mb-4"
                data-aos="fade-up"
                data-aos-delay="100"
                key={index}
                style={{ cursor: "pointer" }}
              >
                <div
                  className={`service-item item-cyan position-relative p-4 text-center ${isCardOpen[index] ? "expanded" : "collapsed"}`}
                  onClick={() => toggleCard(index)}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    boxSizing: "border-box",
                    backgroundColor: "#a3d3ff"
                  }}
                >
                  <div className="icon">
                    <i className="bi bi-activity"></i>
                  </div>
                  <h3>{item.item}</h3>
                  {isCardOpen[index] && (
                    <div>
                      <p>Max Quantity Needed: {item.quantity}</p>
                      <div className="quantity-control">
                        <button
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(index, -1);
                          }}
                          disabled={item.quantitySelected <= 0}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantitySelected || 0}
                          onChange={(e) => handleInputChange(index, e)}
                          min="0"
                          max={item.quantity}
                          style={{ width: "60px", textAlign: "center" }}
                        />
                        <button
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(index, 1);
                          }}
                          disabled={item.quantitySelected >= item.quantity}
                        >
                          +
                        </button>
                      </div>
                      <p>Amount: {item.amount}</p>
                      <p>Total Amount: {calculateTotalAmount(item.quantitySelected || 0, item.amount)}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>

    <div className="col-md-4">
      <div className="position-sticky" style={{ top: '2rem' }}>
        <div className="p-4 mb-3 bg-body-tertiary rounded">
          <section id="total-funding" className="total-funding section">
            <div className="container">
              <h3 className="text-center">Total Funding Amount</h3>
              <p className="text-center" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "black" }}>
                {/* ₹{calculateOverallTotalFunding()} */}
              </p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={handleDonate}
                  // disabled={calculateOverallTotalFunding() === 0}
                >
                  Donate Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</div>

      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Donate Now</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      id="address"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="modal fade show" style={{ display: "block" }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">OTP Verification</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">Enter OTP</label>
                    <input
                      type="text"
                      id="otp"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleOtpSubmit}>Verify OTP</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <header id="header" className="head fixed-top header-transparent">
        <Header />
      </header>

      <main className="container my-5"></main>

      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
};

export default Description;
