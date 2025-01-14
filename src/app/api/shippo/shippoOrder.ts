import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"; // Install axios in your project 
// Run this Command (npm install axios) 

export default async function shippoOrder(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { addressFrom, addressTo, parcels, orderId, totalAmount } = req.body;

    try {
        const response = await axios.post(
            "https://api.goshippo.com/shipments/",
            {
                address_from: addressFrom,
                address_to: addressTo,
                parcels,
                async: false,
            },
            {
                headers: {
                    Authorization: `SHIPPO_API_KEY`, // Replace this keyword YOUR_API_KEY with your api key
                    "Content-Type": "application/json",
                },
            }
        );

        // Debug full response
        console.log("Full Shipment Response:", response.data);

        // Extract tracking and shipment data
        const shipment = response.data;

        // Check for tracking data in the response object
        const trackingNumber = shipment.object_id

        const eta = shipment.eta || "3-5 business days"; // Default ETA if not available

        res.status(200).json({
            orderId,
            totalAmount,
            trackingNumber, // Pass the tracking number from the API
            eta,            // Pass ETA from the API
            status: "Shipment created successfully!",
        });
    } catch (error: any) {
        console.error("Error creating shipment:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to create shipment", error: error.response?.data });
    }
}