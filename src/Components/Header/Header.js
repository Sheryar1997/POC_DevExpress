import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Col, Row, NavDropdown, Navbar, Nav } from "react-bootstrap";
import "./Header.css";

function Header({ sideBarItems, fullScreen, closeScreen, handle, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef();
  const rightNavRef = useRef();
  const leftNavRef = useRef();

  const [sidebarToggle, setSidebarToggle] = useState(false)

  const classes = (path) => {
    let splitPath = path.split("/");
    let splitPathname = pathname.split("/");

    if (splitPath[1] === splitPathname[1]) {
      return "nav_active";
    }

    return "";
  };

  const NavHandler = () => {
    
  };

  return (
    <>
      <div className="user_layout">
        <div className="layout_content_section">

          <div ref={leftNavRef} className={sidebarToggle ? "left_layout_overlay shrink" : "left_layout_overlay"}>

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
                  {sideBarItems?.map((item, index) => {
                    if (item.path) {
                      return (
                        <li key={index} className={`${classes(item.path)}`}>
                          <Link to={item.path} style={sidebarToggle ? { padding: '12px 0px 12px 15px' } : null}>
                            <img src={item.icon} alt="" />
                            <span style={sidebarToggle ? { display: "none" } : null}>{item.title}</span>
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
            <div className="user_header">

              <Row className="align-items-center make_col_reverse">
                <Col md={6}>

                </Col>
                <Col md={6}>
                  <Navbar collapseOnSelect expand="lg">
                    <Navbar.Brand onClick={() => navigate("/")}>
                      <img src="/images/ajcl_logo.png" alt="" className="mob_responsive_logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle
                      aria-controls="responsive-navbar-nav"
                      onClick={NavHandler}
                    />
                    <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="ms-auto">
                        <div className="nav_header_right">
                          <div className="user_nav">
                            {/* <img src="/images/user_img.png" alt="" /> */}

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
            </div>

            <div className="right_layout_overlay" ref={rightNavRef}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
