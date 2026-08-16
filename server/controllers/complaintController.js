import Complaint from "../models/Complaint.js";


// =====================================================
// CREATE COMPLAINT
// Public - Contact Us form se
// =====================================================

export const createComplaint = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject and message are required",
      });
    }

    const complaint = await Complaint.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint,
    });

  } catch (error) {
    console.error("CREATE COMPLAINT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET ALL COMPLAINTS
// Admin only
// =====================================================

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      complaints,
    });

  } catch (error) {
    console.error("GET COMPLAINTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// GET SINGLE COMPLAINT
// Admin only
// =====================================================

export const getSingleComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      complaint,
    });

  } catch (error) {
    console.error("GET SINGLE COMPLAINT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// UPDATE COMPLAINT STATUS
// Admin only
// =====================================================

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "In Progress",
      "Resolved",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid complaint status",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint status updated",
      complaint,
    });

  } catch (error) {
    console.error("UPDATE COMPLAINT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// DELETE COMPLAINT
// Admin only
// =====================================================

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });

  } catch (error) {
    console.error("DELETE COMPLAINT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};