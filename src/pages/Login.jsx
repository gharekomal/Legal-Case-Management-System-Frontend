import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { loginUser } from "../api/authAPI";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            localStorage.setItem("token", res.data.token);
            toast.success("Login successful ✅");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <Container className="mt-5">
            <Card className="p-4 shadow">
                <h3 className="text-center mb-3">
                    <LogIn size={22} /> Login
                </h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        className="mb-3"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <Form.Control
                        className="mb-3"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
                <p className="text-center mt-3">
                    Don’t have an account?{" "}
                    <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </Card>
        </Container>
    );
};

export default Login;
