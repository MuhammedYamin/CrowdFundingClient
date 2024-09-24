
import React, { useEffect, useState } from "react";
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../Styles/style.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footers.jsx";
import { useParams } from "react-router-dom";
import "../Styles/Description.css";
const backend = import.meta.env.VITE_BACKEND_URL;
import { decryptId } from "../cryptoUtils.jsx";

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
      const response = await fetch(
        // "http://localhost:2000/users/otpVerification", 
        `${backend}/users/otpVerification`,
        {
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
      const response = await fetch(
        // "http://localhost:2000/users/donatorsDetails", 
        `${backend}/users/donatorsDetails`,
        {
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
        endpoint = 
        // `http://localhost:2000/users/getApprovedEventDetails/${id}`;
        `${backend}/users/getApprovedEventDetails/${decryptId(id)}`;

        break;
      case "education":
        endpoint = 
        // `http://localhost:2000/users/getApprovedEducationDetails/${id}`;
        `${backend}/users/getApprovedEducationDetails/${decryptId(id)}`;
        break;
      case "publicSpaces":
        endpoint = 
        // `http://localhost:2000/users/getApprovedPublicSpacesDetails/${id}`;
        `${backend}/users/getApprovedPublicSpacesDetails/${decryptId(id)}`;
        break;
      case "health":
        endpoint = 
        // `http://localhost:2000/users/getApprovedHealthDetails/${id}`;
        `${backend}/users/getApprovedHealthDetails/${decryptId(id)}`;
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
const calculateOverallTotalFunding = () => {
  if (!Array.isArray(itemDetails)) return 0; // Check if itemDetails is an array

  return itemDetails.reduce((total, item) => {
    if (!Array.isArray(item.items)) return total; // Check if item.items is an array

    return total + item.items.reduce((itemTotal, card) => {
      return itemTotal + calculateTotalAmount(card.quantitySelected || 0, card.amount);
    }, 0);
  }, 0);
};


  return (
    <>
        {itemDetails.map((item, index) => (
  <section
    id="title"
    style={{
      width: "100%",
      height: "113vh", // Full viewport height for large screens
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${item.imagePath ? backend + item.imagePath[0] : ""}) top center`,
      backgroundSize: "cover",
      marginBottom: "-90px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
      backgroundRepeat: "no-repeat",
      padding: "20px",
    }}
    key={index}
  >
    <div className="container">
      <h1 className="display-4 fst-italic">
        {item.name || item.schoolName || item.projectName}
      </h1>
      <p className="lead my-3">
        The {category === "events" ? "Organizers" : "headmaster"} of this {category === "events" ? "event" : "school"} is {item.organizers || item.fundRaiserName}
      </p>
    </div>
    <style jsx="true">{`
      @media (max-width: 768px) {
        #title {
          height: auto; // Allows the section to grow with content
          min-height: 70vh; // Ensures a reasonable height on small screens
        }
      }
    `}</style>
  </section>
))}

      {/* Image Carousel */}
<div
  className="rounded text-body-emphasis bg-body-secondary carousel-container"
  style={{
    maxWidth: '100%',
    height: '500px',
    overflow: 'hidden',
    padding: '0', 
  }}
>
  <div className="col-lg-12 px-0" style={{ height: '100%' }}> {/* Make sure the child div takes full height */}
    <div className="col-lg-12 mb-lg-0 order-lg-2" data-aos="fade-up" data-aos-delay="400" style={{ height: '100%' }}>
      <section id="testimonials" className="testimonials section-bg my-0" style={{ height: '100%' }}> {/* Removed margin */}
        <div id="carouselExampleControls" className="carousel slide h-100" data-bs-ride="carousel"> {/* Ensured full height */}
          <div className="carousel-inner h-100">
            {itemDetails.length > 0 &&
              itemDetails[0]?.imagePath?.map((image, index) => (
                <div
                  className={`carousel-item ${index === 0 ? 'active' : ''} h-100`} // Ensured each item occupies full height
                  key={index}
                >
                  <img
                    src={backend + image}
                    className="img-fluid large-image h-100"
                    alt=""
                    style={{
                      objectFit: 'contain',
                      width: '100%',
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

{/* end of the carousel section */}


<section id="about" className="about section" style={{ backgroundColor: '#e0f7fa', padding: '40px 0' }}>
  <div className="container">
    <h2 style={{
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: '2rem',
      color: '#007bff',
      marginBottom: '30px',
    }}>
      Fundraising Details
    </h2>

    <div className="row align-items-center justify-content-between">
      {itemDetails?.map((item, index) => (
        <div key={index}>
          <div className="row mb-4">
            {/* First Card */}
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary" style={{ fontWeight: 'bold' }}>Details of the Project</strong>
                  <h4 className="mb-2" style={{ fontWeight: 'bold', color: '#343a40' }}>
                    Name of the FundRaiser: {item.fundRaiserName}
                  </h4>
                  <p className="card-text mb-auto" style={{ lineHeight: '1.6' }}>
                    <p>Contact Number: {item.contact}</p>
                    <p>Zone: {item.zone}</p>
                    <p>Taluk: {item.taluk}</p>
                    <p>Village: {item.village}</p>
                    <p>Total amount required: {item.amount}</p>
                  </p>
                </div>
              </div>
            </div>

            {/* Second Card */}
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary" style={{ fontWeight: 'bold' }}>Requirements of the Project</strong>
                  <div className="table-responsive"> {/* Make table responsive */}
                    <table className="table table-striped">
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
                  </div>
                </div>
              </div>
              {/* <button className="btn btn-primary mt-3" disabled>
                Donate Now
              </button> */}
            </div>
          </div>
          
          {/* Conditionally render the description if it exists */}
          {item.description && (
            <>
              <h2 style={{
                textAlign: 'center',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                color: '#007bff',
                marginBottom: '30px',
                padding: '20px'
              }}>
                Description of the school
              </h2>
              <p>{item.description}</p>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
</section>


<div className="container-fluid" style={{ backgroundColor: "#e6f7ff", overflowX: "hidden" }}>
  <div className="row g-5">
  <h2 style={{
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: '#007bff',
      marginBottom: '30px',
      padding:'20PX'
    }}>
      ITEMS TO BE DONATED
    </h2>
    <div className="container">
  <div className="row justify-content-center">
    {itemDetails.length > 0 &&
      itemDetails[0].items &&
      itemDetails[0].items.map((item, index) => (
        <div
          className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center mb-4" // Two cards per row on large and medium screens, one card on small screens
          key={index}
        >
          <div
            className={`service-item item-cyan position-relative p-4 text-center ${isCardOpen[index] ? "expanded" : "collapsed"}`}
            onClick={() => toggleCard(index)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#a3d3ff",
              width: "80%", // Adjust width as needed
              boxSizing: "border-box",
              overflow: "hidden",
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
                    className="btn btn-danger m-2 minus"
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
                    value={item.quantitySelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleInputChange(index, e);
                    }}
                    min="0"
                    max={item.quantity}
                    style={{ width: "60px", textAlign: "center" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.target.value = ""; // Clear the input when clicked
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        handleQuantityChange(index, -item.quantitySelected);
                      }
                    }}
                  />
                  <button
                    className="btn btn-primary m-2 plus"
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


    {/* Total Funding Section */}
    <div className="position-sticky" style={{ top: '2rem' }}>
      <div className="p-4 mb-3 bg-body-tertiary rounded">
        <section id="total-funding" className="total-funding section">
          <div className="container">
            <h3 className="text-center">Total Funding Amount</h3>
            <p className="text-center" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "black" }}>
              ₹{calculateOverallTotalFunding()}
            </p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary"
                onClick={handleDonate}
                disabled={calculateOverallTotalFunding() === 0}
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