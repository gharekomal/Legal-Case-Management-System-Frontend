import { useEffect, useState } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";
import { getAllClients } from "../api/clientAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await getAllClients();
      setClients(res.data.clients);
    } catch {
      toast.error("Failed to fetch clients");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-3 shadow">
        <div className="d-flex justify-content-between mb-3">
          <h4>Clients</h4>
          <Button onClick={() => navigate("/clients/add")}>
            Add Client
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={client._id}>
                <td>{index + 1}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/clients/${client._id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default ClientList;
