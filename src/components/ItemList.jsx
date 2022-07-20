import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, DropdownButton, Dropdown } from "react-bootstrap";
import SearchBar from "./SearchBar";
import ItemCard from "./ItemCard";
import { setMonth } from "../reducers/monthReducer";

function ItemList() {
  const dispatch = useDispatch();
  const searchVal = useSelector((state) => state.searchVal);
  const items = useSelector((state) => state.items);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const month = useSelector((state) => state.month);

  const filterItems = () => {
    const filteredItemsBySearch =
      searchVal.length === 0
        ? items
        : items.filter(
            (item) =>
              item.latin.toLowerCase().includes(searchVal) ||
              item.common[0].toLowerCase().includes(searchVal)
          );

    const filteredItemsByMonth =
      month === null
        ? filteredItemsBySearch
        : filteredItemsBySearch.filter((item) => item.peak_month === month);

    return filteredItemsByMonth;
  };

  const handleMonthChanged = (newMonth) => {
    dispatch(setMonth(newMonth));
  };

  return (
    <div>
      <h1>Items</h1>
      <DropdownButton id="dropdown-basic-button" title="Month">
        <Dropdown.Item href="#/action-1" onClick={() => handleMonthChanged(null)}>
          Show all
        </Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Item href="#/action-2" onClick={() => handleMonthChanged("1")}>
          January
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => handleMonthChanged("2")}>
          February
        </Dropdown.Item>
        <Dropdown.Item href="#/action-4" onClick={() => handleMonthChanged("3")}>
          March
        </Dropdown.Item>
        <Dropdown.Item href="#/action-5" onClick={() => handleMonthChanged("4")}>
          April
        </Dropdown.Item>
        <Dropdown.Item href="#/action-6" onClick={() => handleMonthChanged("5")}>
          May
        </Dropdown.Item>
        <Dropdown.Item href="#/action-7" onClick={() => handleMonthChanged("6")}>
          June
        </Dropdown.Item>
        <Dropdown.Item href="#/action-8" onClick={() => handleMonthChanged("7")}>
          July
        </Dropdown.Item>
        <Dropdown.Item href="#/action-9" onClick={() => handleMonthChanged("8")}>
          August
        </Dropdown.Item>
        <Dropdown.Item href="#/action-10" onClick={() => handleMonthChanged("9")}>
          September
        </Dropdown.Item>
        <Dropdown.Item href="#/action-11" onClick={() => handleMonthChanged("10")}>
          October
        </Dropdown.Item>
        <Dropdown.Item href="#/action-12" onClick={() => handleMonthChanged("11")}>
          November
        </Dropdown.Item>
        <Dropdown.Item href="#/action-13" onClick={() => handleMonthChanged("12")}>
          December
        </Dropdown.Item>
      </DropdownButton>
      <SearchBar />
      <Row xs={1} md={2} xl={3} className="g-4">
        {filterItems().map((item) => (
          <Col key={item.id}>
            <ItemCard key={item.id} item={item} found={loggedInUser.items.includes(item.id)} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ItemList;
