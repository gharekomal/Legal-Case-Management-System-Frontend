import { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { addHearing } from "../api/hearingAPI";
import { getCases } from "../api/caseAPI";
import { useNavigate } from "react-router-dom";

const AddHearing = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [formData, setFormData] = useState({
    case: "",
    hearingDate: "",
    hearingTime: "",
    remarks: "",
  });

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      const res = await getCases();
      setCases(res.data);
    } catch {
      toast.error("Failed to load cases");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addHearing(formData);
      toast.success("Hearing added successfully ✅");
      navigate("/hearings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add hearing");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h4>Add Hearing</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Select
            className="mb-3"
            name="case"
            onChange={handleChange}
            required
          >
            <option value="">Select Case</option>
            {cases.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </Form.Select>

          <Form.Control
            className="mb-3"
            type="date"
            name="hearingDate"
            onChange={handleChange}
            required
          />

          <Form.Control
            className="mb-3"
            type="time"
            name="hearingTime"
            onChange={handleChange}
          />

          <Form.Control
            as="textarea"
            rows={3}
            className="mb-3"
            name="remarks"
            placeholder="Remarks"
            onChange={handleChange}
          />

          <Button type="submit">Save Hearing</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddHearing;
