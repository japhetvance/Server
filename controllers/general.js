import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import {Temp} from "../models/temp_data.js";
//import Transaction from "../models/Transaction.js";
import { Joke } from "../models/models.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTemp = async (req, res) => {
  try {
    const { id } = req.params;
    const temp = await Temp.findById(id);
    res.status(200).json(temp);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTemp = async (req, res) => {
  try {
    const { id } = req.body;
    const deletetemp = await Temp.findByIdAndDelete(id);
    const records = await Temp.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteuser = await User.findByIdAndDelete(id);
    const records = await User.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const { id, name, email, password, city, state, country, occupation, phoneNumber, role } = req.body;
    const update = await User.findOneAndUpdate({ _id: id }, {
      name: name,
      email: email,
      password: password,
      city: city,
      state: state,
      country: country,
      occupation: occupation,
      phoneNumber: phoneNumber,
      role: role
    }, {
      new: true
    });
    console.log("hello")
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const validateTemp = async (req, res) => {
  try {
    const { id, eggs, userName, rejected, sold, others, flock, cages, } = req.body;
    console.log(id)
    const deletetemp = await Temp.findByIdAndDelete(id);
    const joke = new Joke({
      eggs: eggs,
      userName: userName,
      rejected: rejected,
      sold: sold,
      others: others,
      flock: flock,
      cages: cages,
    });
    await joke.save().then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
    const records = await Temp.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllTemp = async (req, res) => {
  try {
    const temp = await Temp.find();
    res.status(200).json(temp);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const report = await Joke.find();
    res.status(200).json(report);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addTempReport = async (req, res) => {
  try {
    const { eggs, userName, rejected, sold, others, flock, cages, date } = req.body;
    const d = new Date(Date.parse(date));
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const temp = new Temp({
      eggs: eggs,
      userName: userName,
      rejected: rejected,
      sold: sold,
      others: others,
      flock: flock,
      cages: cages,
      year: d.getFullYear(),
      month: month[d.getMonth()],
      day: d.getDate(),
    });
    temp.save().then((data) => {
      res.status(200).json({ message: data });
    }).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, password, city, state, country, occupation, phoneNumber, role } = req.body;
    const user = new User({
      name: name,
      email: email,
      password: password,
      city: city,
      state: state,
      country: country,
      occupation: occupation,
      phoneNumber: phoneNumber,
      role: role,
    });
    user.save().then((data) => {
      res.status(200).json({ message: data.name + " saved to bookstore collection." });
    }).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const fetchSession = async (req, res) => {
  try {
    console.log(req.session.userId)
    const user = await User.findById(req.session.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // Hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";
    const id = 1;
    let total = 0;

    /* Recent Transactions */
    // const transactions = await Transaction.find()
    //   .limit(50)
    //   .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });
    const sum = await Joke.find({ id: id });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      flocksinFarm,
      vacantCages,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    // Fetch the latest item from the Joke model
    const latestJoke = await Joke.find();
    latestJoke.sort().reverse()[0];

    // Set the values for the latest "flocks" and "cages"
    const latestFlocks = latestJoke.flock;
    const latestCages = latestJoke.cages;

    // Calculate the total number of eggs, sold, and additional values for the latest 7 items
    const latestJokes = await Joke.find()
      .sort({ createdAt: -1 })
      .limit(7);

    let weekEggs = 0;
    let weekSold = 0;

    latestJokes.forEach((joke) => {
      weekEggs += joke.eggs;
      weekSold += joke.sold;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      flocksinFarm,
      vacantCages,
      latestFlocks, // Include the latest flocks in the response
      latestCages, // Include the latest cages in the response
      weekEggs, // Include the total eggs in the response
      weekSold, // Include the total sold in the response
      // transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
