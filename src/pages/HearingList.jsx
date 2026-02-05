import { useEffect, useState } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";
import { getHearings } from "../api/hearingAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HearingList = () => {
  const [hearings, setHearings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadHearings();
  }, []);

  const loadHearings = async () => {
    try {
      const res = await getHearings();
      setHearings(res.data);
    } catch {
      toast.error("Failed to fetch hearings");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-3 shadow">
        <div className="d-flex justify-content-between mb-3">
          <h4>Hearings</h4>
          <Button onClick={() => navigate("/hearings/add")}>
            Add Hearing
          </Button>
        </div>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Case</th>
              <th>Date</th>
              <th>Time</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {hearings.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.case?.title}</td>
                <td>{item.hearingDate}</td>
                <td>{item.hearingTime}</td>
                <td>{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default HearingList;
