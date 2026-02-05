import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Users, Briefcase } from "lucide-react";
import { getAllClients } from "../api/clientAPI";
import { getCases } from "../api/caseAPI";
import { toast } from "react-toastify";
import { CalendarDays } from "lucide-react";
import { getHearings } from "../api/hearingAPI";


const Dashboard = () => {
    const [clientCount, setClientCount] = useState(0);
    const [caseCount, setCaseCount] = useState(0);
    const [hearingCount, setHearingCount] = useState(0);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const clientsRes = await getAllClients();
            const casesRes = await getCases();
            const hearingsRes = await getHearings();
            setHearingCount(hearingsRes.data.length);

            setClientCount(clientsRes.data.clients.length);
            setCaseCount(casesRes.data.length);
        } catch {
            toast.error("Failed to load dashboard data");
        }
    };

    return (
        <Container className="mt-4">
            <h3 className="mb-4">Dashboard</h3>

            <Row>
                <Col md={4}>
                    <Card className="p-4 shadow text-center">
                        <Users size={36} className="mb-2 text-primary" />
                        <h5>Total Clients</h5>
                        <h2>{clientCount}</h2>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="p-4 shadow text-center">
                        <Briefcase size={36} className="mb-2 text-warning" />
                        <h5>Total Cases</h5>
                        <h2>{caseCount}</h2>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="p-4 shadow text-center">
                        <CalendarDays size={36} className="mb-2 text-success" />
                        <h5>Total Hearings</h5>
                        <h2>{hearingCount}</h2>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
