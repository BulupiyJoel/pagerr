import { Container } from "@mui/material";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const Wrapper = ({ children, marginY }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                justifyContent: 'space-between' // Adjusts layout for header, content, and footer
            }}
        >
            <Header />
            <Container sx={{ marginY: marginY ?? 6 }}>
                {children}
            </Container>
            <Footer />
        </div>
    );
};

export default Wrapper;
