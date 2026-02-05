import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getClientById } from "../api/clientAPI";
import { toast } from "react-toastify";

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await getClientById(id);
        setClient(res.data);
      } catch {
        toast.error("Client not found");
      }
    };
    fetchClient();
  }, [id]);

  if (!client) return null;

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h4>Client Details</h4>
        <p><strong>Name:</strong> {client.name}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>Address:</strong> {client.address}</p>
      </Card>
    </Container>
  );
};

export default ClientDetails;
