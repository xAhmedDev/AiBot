import React from "react";
import "./NoPageFound.module.css";
import { Link } from "react-router-dom";
import NoPageFoundClasses from "./NoPageFound.module.css";

const NoPageFound = () => {
  return (
    <div>
      <section className={`${NoPageFoundClasses.page_404}`}>
        <div className={`${NoPageFoundClasses.container} container`}>
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className={`${NoPageFoundClasses.four_zero_four_bg}`}>
                  <h1 className="text-center ">404</h1>
                </div>

                <div className={`${NoPageFoundClasses.contant_box_404}`}>
                  <h3 className="h2">Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>

                  <Link to={"/"} className={`${NoPageFoundClasses.link_404}`}>
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoPageFound;
