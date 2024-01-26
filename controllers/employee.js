import {Employee} from "../models/EmployeeReports.js";

export const getEmployee = async (req, res) => {
    try {
        const Employee = await Employee.find();

        res.status(200).json(Employee[0]);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}