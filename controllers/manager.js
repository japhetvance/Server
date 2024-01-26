import {Manager} from "../models/ManagerReports.js";

export const getManager = async (req, res) => {
    try {
        const Manager = await Manager.find();

        res.status(200).json(Manager[0]);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}