import { useEffect, useState } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";
import { getCases } from "../api/caseAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await getCases();
      setCases(res.data);
    } catch {
      toast.error("Failed to fetch cases");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-3 shadow">
        <div className="d-flex justify-content-between mb-3">
          <h4>My Cases</h4>
          <Button onClick={() => navigate("/cases/add")}>
            Add Case
          </Button>
        </div>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Client</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.client?.name}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default CaseList;
