import { useEffect, useRef, useState } from "react";
import RoutersBtns from "../RoutersBtns/RoutersBtns";
import "./ImagesGenerator.css";

const ImagesGenerator = () => {
  const [imgs, setImgs] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const inpValue = useRef();
  useEffect(() => {
    const storedImgs = localStorage.getItem("imgs");
    if (storedImgs) {
      setImgs(JSON.parse(storedImgs));
    }
  }, []);

  useEffect(() => {
    imgs.length !== 0 && localStorage.setItem("imgs", JSON.stringify(imgs));
  }, [imgs]);

  const handleMessages = async () => {
    setShowLoader(true);
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.REACT_APP_API_BOT}`,
      },
      body: JSON.stringify({
        response_as_dict: true,
        attributes_as_list: false,
        show_original_response: false,
        resolution: "512x512",
        num_images: 3,
        providers: "openai",
        text: `${inpValue.current.value}`,
      }),
    };

    if (inpValue.current.value.trim()) {
      inpValue.current.value = "";
      const res = await fetch(
        `${process.env.REACT_APP_URL}/image/generation`,
        options
      );
      const data = await res.json();
      setImgs(data.openai.items);
      setShowLoader(false);
    }
  };

  const handleDeleteImgs = () => {
    localStorage.removeItem("imgs");
    setImgs([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inpValue.current.value.trim()) {
      handleMessages();
    }
  };

  return (
    <>
      <div className={`container justify-content-between`}>
        <RoutersBtns />

        <div className="d-flex gap-3 justify-content-evenly">
          {imgs.length === 0 ? (
            <div
              className={`${showLoader ? "showLoader" : "hideLoader"} lds-ring`}
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>

              <p className="wait">Generation</p>
            </div>
          ) : (
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner rounded-4">
                {imgs.map((img, index) => {
                  return (
                    <div
                      className={`carousel-item ${index === 0 && "active"}`}
                      key={index}
                    >
                      <img
                        src={img.image_resource_url}
                        className="d-block w-100"
                        loading="lazy"
                        alt="..."
                      />
                    </div>
                  );
                })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          )}
        </div>

        <div className="form">
          <button
            className={`delBtn ms-3 bg-transparent border-0`}
            title="Delete the Chat"
            onClick={handleDeleteImgs}
            disabled={imgs.length === 0}
          >
            <i className="fa-regular fa-trash-can text-danger fs-3"></i>
          </button>

          <input
            ref={inpValue}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Type a message..."
            required
          />
          <button onClick={handleMessages}>
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ImagesGenerator;
