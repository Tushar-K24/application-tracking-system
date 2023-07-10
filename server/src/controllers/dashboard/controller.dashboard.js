const Application = require("../../models/applicationModel");
const Organization = require("../../models/organizationModel");
const Job = require("../../models/jobModel");

const getDailyData = async (req, res) => {
  try {
    const { organizationID } = req.params;
    const daily = req.query.daily ? req.query.daily : false;
    const organization = await Organization.findOne({ _id: organizationID });
    const searchQuery = { $match: { job: { $in: organization.postings } } };
    const currentDate = new Date();
    const compareDate = {
      $gte: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ),
      $lt: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      ),
    };
    if (daily == 1) {
      searchQuery.$match.appliedDate = compareDate;
    }
    const applications = await Application.aggregate([
      searchQuery,
      {
        $group: { _id: "$job", totalApplicants: { $count: {} } },
      },
    ]);
    const totalApplicants = applications.reduce(
      (acc, obj) => acc + obj.totalApplicants,
      0
    );
    await Job.populate(applications, { path: "_id", select: "role" });
    const jobSearchQuery = {};
    if (daily == 1) {
      jobSearchQuery.createdAt = compareDate;
    }
    const totalPostings = await Job.find(jobSearchQuery).count();
    res.status(200).json({
      data: {
        totalApplicants: totalApplicants,
        totalPostings: totalPostings,
        applications,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getDailyData };
