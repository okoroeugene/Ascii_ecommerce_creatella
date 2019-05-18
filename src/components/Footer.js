import React from 'react';

export default function () {
    return (
        <footer>
            <div className="footer0">
                <div className="footerContent">
                    <p style={{ fontSize: 18, color: "#858788", fontWeight: "bold" }}>PAYSMOSMO</p>
                    <p style={{ color: "#858788", marginTop: 20 }}>Help give out inventory loans to cooperative members with ease.</p>
                </div>
                <div className="footerContent">
                    <p style={{ fontSize: 14, color: "#858788", fontWeight: "bold" }}>Contact</p>
                    <ul style={{ display: "contents", color: "#858788" }}>
                        <li>Registration</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="footerContent">
                    <p style={{ fontSize: 14, color: "#858788", fontWeight: "bold" }}>Help</p>
                    <ul style={{ display: "contents", color: "#858788" }}>
                        <li>Privacy Policy</li>
                        <li>How it works</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>
                <div className="footerContent">
                    <p style={{ fontSize: 14, color: "#858788", fontWeight: "bold" }}>Stay Connected</p>
                    <p style={{
                        color: "#858788",
                        marginTop: 20,
                        display: "flex",
                        justifyContent: "space-between",
                        width: 80
                    }}>
                        <i className="ti-facebook"></i>
                        <i className="ti-twitter"></i>
                        <i className="ti-instagram"></i>
                    </p>
                </div>
                <div className="footerContent">
                    <p style={{ fontSize: 14, color: "#858788", fontWeight: "bold" }}>
                        Back to top <i className="ti-angle-up"></i>
                    </p>
                </div>
            </div>
            <div style={{
                height: 50,
                backgroundColor: "#2B2F31",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <span style={{
                    color: "#858788",
                    fontWeight: "bold"
                }}> 2018 &copy; PAYSMOSMO</span>
            </div>
        </footer>
    );
}