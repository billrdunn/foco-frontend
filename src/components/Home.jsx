/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Image, Row } from "react-bootstrap";
// import SearchBar from "./SearchBar";
// import ItemCard from "./ItemCard";
// import { setMonth } from "../reducers/monthReducer";
import UploadImageButton from "./UploadImageButton";
import "../styles.css";

function Home() {
  // const dispatch = useDispatch();
  // const searchVal = useSelector((state) => state.searchVal);
  // const items = useSelector((state) => state.items);
  // const month = useSelector((state) => state.month);

  const tmp = useSelector((state) => state.imgUrls);
  const imgs = tmp.slice().reverse();
  const showImgs = useSelector((state) => state.showImgs);

  // const filterItems = () => {
  //   const filteredItemsBySearch =
  //     searchVal.length === 0
  //       ? items
  //       : items.filter(
  //           (item) =>
  //             item.latin.toLowerCase().includes(searchVal) ||
  //             item.common[0].toLowerCase().includes(searchVal)
  //         );

  //   const filteredItemsByMonth =
  //     month === null
  //       ? filteredItemsBySearch
  //       : filteredItemsBySearch.filter((item) => item.peak_month === month);

  //   return filteredItemsByMonth;
  // };

  // const handleMonthChanged = (newMonth) => {
  //   dispatch(setMonth(newMonth));
  // };

  return (
    <div>
      <h1>FOCO</h1>
      <br />
      {/* <DropdownButton id="dropdown-basic-button" title="Month">
        <Dropdown.Item href="#/action-1" onClick={() => handleMonthChanged(null)}>
        Show all
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-2" onClick={() => handleMonthChanged("1")}>
          January
        </Dropdown.Item>
      </DropdownButton> */}
      {/* <SearchBar /> */}
      <UploadImageButton  />
      <Container className="images-container">
        {console.log(`rendering ${imgs.length} images`)}
        {showImgs && (
          <Row xs={2} sm={3} md={4} lg={5}>
            {imgs.map((img) => (
              <Col key={img.id}>
                {/* <ItemCard key={img.id} img={img} /> */}
                <Image className="image" fluid src={img.url} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Home;
