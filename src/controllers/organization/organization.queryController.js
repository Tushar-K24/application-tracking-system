const User = require("../../models/organizationModel");

const getOrganization = async (req, res) => {
  try {
    const { organizationID } = req.params;
    const organization = await User.findOne({ _id: organizationID });
    if (organization) {
      res.status(200).json({ message: "Organization found", organization });
    } else {
      res.status(404).json({ message: "Organization does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const { organizationID } = req.params;
    const updatedOrganization = await User.findOneAndUpdate(
      { _id: organizationID },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Details updated successfully", updatedOrganization });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const { organizationID } = req.params;
    await User.findOneAndDelete({ _id: organizationID });
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getOrganization, updateOrganization, deleteOrganization };
