import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { addClient } from "../api/clientAPI";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addClient(client);
      toast.success("Client added successfully ✅");
      navigate("/clients");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add client");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h4>Add Client</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            className="mb-3"
            name="name"
            placeholder="Client Name"
            onChange={handleChange}
            required
          />
          <Form.Control
            className="mb-3"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <Form.Control
            className="mb-3"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
          <Form.Control
            className="mb-3"
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />
          <Button type="submit">Save Client</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddClient;
