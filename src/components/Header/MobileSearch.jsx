import { useState } from "react";
import { Button, Offcanvas, Form } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";

const OffCanvasExample = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="d-flex flex-row">
        {/* <Form className="d-none d-lg-flex search-bar">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form> */}
        <Button
          variant="danger"
          onClick={() => setShow(true)}
          className="d-lg-none me-2"
        >
          <BiSearch />
        </Button>
        <Offcanvas show={show} onHide={() => setShow(false)} placement="top">
          <Offcanvas.Body>
            <Form className="d-flex search-bar">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

function MobileSearch() {
  return (
    <>
      <OffCanvasExample />
    </>
  );
}

export default MobileSearch;
