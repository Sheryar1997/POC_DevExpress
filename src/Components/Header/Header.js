import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Col, Row, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./Header.css";

function Header({ sideBarItems, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [chartsSubmenuOpen, setChartsSubmenuOpen] = useState(false);

  const classes = (path) => {
    let splitPath = path.split("/");
    let splitPathname = pathname.split("/");
    return splitPath[1] === splitPathname[1] ? "nav_active" : "";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleSubmenuItemClick = (e) => {
    e.stopPropagation(); // Prevents the event from propagating to the parent "Charts" item
  };

  return (
    <div className="user_layout">
      <div className="layout_content_section">
        <div ref={useRef()} className={sidebarToggle ? "left_layout_overlay shrink" : "left_layout_overlay"}>
          <div className={sidebarToggle ? "layout_content_sidebar_section close" : "layout_content_sidebar_section"}>
            <div className="user_sidebar">
              <div className="sidebar_top_logo" style={sidebarToggle ? { justifyContent: "center" } : null}>
                <img
                  src="/images/toggle_icon.png"
                  alt=""
                  className="toggle_icon"
                  onClick={() => setSidebarToggle(!sidebarToggle)}
                />
              </div>
              <ul className="nav_list">
                <h6 className={sidebarToggle ? 'toggler' : null}>{sidebarToggle ? 'Menu' : "Main Menu"}</h6>
                {sideBarItems.map((item, index) => {
                  if (item.title === "Charts") {
                    return (
                      <li key={index} className={`${classes(item.path)} dropdown-item`} onClick={() => setChartsSubmenuOpen(!chartsSubmenuOpen)}>
                        <Link to={item.path}>
                          <img src={item.icon} alt="" />
                          <span>{item.title}</span>
                        </Link>
                        {chartsSubmenuOpen && item.items && item.items.map((subItem, subIndex) => (
                          <ul key={subIndex} className="submenu">
                      <li key={subIndex} className={`${classes(subItem.path)}`} onClick={handleSubmenuItemClick}>
                              <Link to={subItem.path}>
                                <img src={subItem.icon} alt="" />
                                <span>{subItem.title}</span>
                              </Link>
                            </li>
                          </ul>
                        ))}
                      </li>
                    );
                  } else {
                    return (
                      <li key={index} className={`${classes(item.path)}`}>
                        <Link to={item.path}>
                          <img src={item.icon} alt="" />
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className={sidebarToggle ? "layout_content shrink" : "layout_content"}>
          {/* <div className="user_header">
            <Row className="align-items-center make_col_reverse">
              <Col md={6}>
              </Col>
              <Col md={6}>
                <Navbar collapseOnSelect expand="lg">
                  <Navbar.Brand onClick={() => navigate("/")}>
                    <img src="/images/ajcl_logo.png" alt="" className="mob_responsive_logo" />
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                      <div className="nav_header_right">
                        <div className="user_nav">
                          <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item>
                              <Link to='/profile'>Profile</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/">
                              <Link>Logout</Link>
                            </NavDropdown.Item>
                          </NavDropdown>
                        </div>
                      </div>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </Col>
            </Row>
          </div> */}

          <div className="right_layout_overlay">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
