import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { registerUser } from "../api/authAPI";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            toast.success("Registration successful 🎉");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <Container className="mt-5">
            <Card className="p-4 shadow">
                <h3 className="text-center mb-3">
                    <UserPlus size={22} /> Register
                </h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        className="mb-3"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        required
                    />
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
                        Register
                    </Button>
                </Form>
                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>

            </Card>
        </Container>
    );
};

export default Register;
