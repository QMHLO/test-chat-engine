import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";

export default function HomePage() {
  const [data, setData] = React.useState(null);
  const { dispatch } = React.useContext(ProductContext);
  const [start, setStart] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const itemLimitCount = 2;
  const startItem = (start - 1) * itemLimitCount;

  React.useEffect(() => {
    const fectchData = async () => {
      try {
        //http://localhost:1337/api/products?populate=*pagination[start]=0&pagination[limit]=2&sort[0]=id%3Adesc sort and pagination
        const res = await fetch(`http://localhost:1337/api/products?populate=*&pagination[start]=${startItem}&pagination[limit]=${itemLimitCount}&sort[0]=id%3Adesc`);
        const data = await res.json();
        setTotal(data?.meta?.pagination?.total);
        setData(data);
        console.log(data);
        dispatch({
          type: "SET_PRODUCT",
          payload: data,
        });
      } catch (err) {
        setData("Error");
      }
    };
    fectchData();
  }, [start, startItem, itemLimitCount]);

  console.log(data);

  const isNext = start === Math.ceil(total / itemLimitCount);
  const isPrev = start === 1;
  const prevHandler = () => {
    if (isPrev) return;
    setStart((pre) => pre - 1);
  };
  const nextHandler = () => {
    if (isNext) return;
    setStart((pre) => pre + 1);
  };

  if (data === "Error") return <div>Error Occured While fetching data</div>;
  if (!total) return <div>Loading posts ....</div>;
  if (!data) return <div>Loading ... data </div>;
  // if (data) return <div>Data have received</div>;
  return (
    <>
      <div className="row">
        {data &&
          data.data.map(({ id, attributes: { title, description, image } }) => {
            return (
              <>
                <Link to={`/detail/${id}`}>
                  <div className="card" key={id}>
                    <img src={`http://localhost:1337${image?.data?.attributes?.url}`} alt="some image" />
                    <div className="container">
                      <h4>
                        <b>{title}</b>
                      </h4>
                      <p>{description}</p>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
      </div>

      <div className="paginaion">
        <button onClick={prevHandler} disabled={isPrev ? true : false}>
          prev
        </button>
        <button onClick={nextHandler} disabled={isNext ? true : false}>
          next
        </button>
      </div>
    </>
  );
}
