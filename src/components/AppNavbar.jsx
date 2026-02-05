import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LogIn, UserPlus, Users, Briefcase } from "lucide-react";
import { CalendarDays } from "lucide-react";


const AppNavbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/dashboard">
                    Legal Portal
                </Navbar.Brand>

                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        {token && (
                            <>
                                <Nav.Link as={Link} to="/dashboard">
                                    Dashboard
                                </Nav.Link>

                                <Nav.Link as={Link} to="/clients">
                                    <Users size={16} /> Clients
                                </Nav.Link>

                                <Nav.Link as={Link} to="/cases">
                                    <Briefcase size={16} /> Cases
                                </Nav.Link>
                                <Nav.Link as={Link} to="/hearings">
                                    <CalendarDays size={16} /> Hearings
                                </Nav.Link>

                            </>
                        )}
                    </Nav>

                    <Nav className="ms-auto align-items-center gap-2">
                        {!token ? (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    <LogIn size={16} /> Login
                                </Nav.Link>

                                <Nav.Link as={Link} to="/register">
                                    <UserPlus size={16} /> Register
                                </Nav.Link>
                            </>
                        ) : (
                            <Button variant="outline-light" onClick={handleLogout}>
                                <LogOut size={16} /> Logout
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
