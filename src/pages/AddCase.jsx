import { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { createCase } from "../api/caseAPI";
import { getAllClients } from "../api/clientAPI";
import { useNavigate } from "react-router-dom";

const AddCase = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    status: "Open",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await getAllClients();
      setClients(res.data.clients);
    } catch {
      toast.error("Failed to load clients");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCase(formData);
      toast.success("Case created successfully ✅");
      navigate("/cases");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create case");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h4>Add New Case</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            className="mb-3"
            name="title"
            placeholder="Case Title"
            onChange={handleChange}
            required
          />

          <Form.Control
            as="textarea"
            rows={3}
            className="mb-3"
            name="description"
            placeholder="Case Description"
            onChange={handleChange}
          />

          <Form.Select
            className="mb-3"
            name="client"
            onChange={handleChange}
            required
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            className="mb-3"
            name="status"
            onChange={handleChange}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </Form.Select>

          <Button type="submit">Create Case</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddCase;
