import User from "../models/User.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        console.log(email);
        if (!user) {
        } else {

        const passwordMatch = password == user.password;
        if (passwordMatch) {
            req.session.userId = user._id;

            res.status(200).json(req.session);
        } else {
            res.status(401).send(req.session);
        }
        }
    } catch (err) {
        res.status(500).send(err);
    }
}