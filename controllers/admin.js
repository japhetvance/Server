import {Admin} from "../models/AdminReports.js";

export const getAdmin = async (req, res) => {
    try {
        const Admin = await Admin.find();

        res.status(200).json(Admin[0]);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}