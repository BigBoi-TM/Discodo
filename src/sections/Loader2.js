import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import "./Loader2.css";
import Whole from "../Whole";

import * as location from "./lf20_tB5qur.json";
import * as success from "./1127-success.json";

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid meet"
  }
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid meet"
  }
};

function Loader2() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setData(json);
          setloading(true);

          setTimeout(() => {
            setcompleted(true);
          }, 1000);
        });
    }, 2000);
  }, []);

  return (
    <div className="Loader-whole">
      {!completed ? (
        <>
          {!loading ? (
            <div className="Loading">
              <Lottie
                className="Lottie-Load"
                options={defaultOptions1}
                height={400}
                width={300}
              />
            </div>
          ) : (
            <Lottie
              className="Lottie-Complete"
              options={defaultOptions2}
              height={398}
              width={357}
            />
          )}
        </>
      ) : (
        <>
          <Whole />
        </>
      )}
    </div>
  );
}

export default Loader2;
