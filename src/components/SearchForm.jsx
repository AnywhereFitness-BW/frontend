import React, { useState, useEffect } from "react";
import { Container, Input, Badge, Form, Button } from "reactstrap";

function SearchForm({ updateQuery }) {
  const [searchQueries, setSearchQueries] = useState([]); // {query, value};
  const [query, setQuery] = useState("name");
  const [value, setValue] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    setSearchQueries([...searchQueries, { query, value }]);
  };

  const onInputChange = (e) => {
    if (e.target.name === "value") setValue(e.target.value);
    else if (e.target.name === "query") setQuery(e.target.value);
  };

  const removeSearch = (s) => {
    setSearchQueries(searchQueries.filter((search) => search !== s));
  };

  useEffect(() => {
    const c = searchQueries.reduce((previous, current) => {
      return (previous +=
        (previous === "" ? "" : "&") + current.query + "=" + current.value);
    }, "");
    updateQuery("?" + c);
  }, [searchQueries]);

  return (
    <Container>
      <Form onSubmit={addItem} className="d-flex justify-content-center">
        <Input
          name="value"
          className="mx-3 w-25"
          value={value}
          onChange={onInputChange}
        />
        <Input
          className="mx-3 w-25"
          name="query"
          value={query}
          type="select"
          placeholder="Query"
          onChange={onInputChange}
        >
          <option>name</option>
          <option>date</option>
          <option>time</option>
          <option>duration</option>
          <option>type</option>
          <option>intensity</option>
          <option>location</option>
          <option>numberOfRegisteredAttendees</option>
          <option>maxClassSize</option>
        </Input>
        <Button onClick={addItem} className="ml-3">
          Add Query
        </Button>
      </Form>
      <Container className="my-2 d-flex justify-content-start align-items-center">
        <div className="mr-3">Showing Classes with: </div>
        {searchQueries.map((search) => (
          <Badge color="info" pill>
            {search.query}:{search.value}{" "}
            <Button color="info" size="sm" onClick={() => removeSearch(search)}>
              X
            </Button>
          </Badge>
        ))}
      </Container>
    </Container>
  );
}

export default SearchForm;
