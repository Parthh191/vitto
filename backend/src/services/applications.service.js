import {createApplications, 
    getApplications, 
    updateApplications, 
    totalAmount, 
    totalApplication,
    approvedApplications,
    pendingApplications,
    rejectedApplications } from "../repo/applications.repo.js"


export const createApplicationService=async(req,res)=>{
    try{
        const { name, mobile, amount, purpose, language } = req.body;
        if(!name || !mobile || !amount || !purpose || !language){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const application = await createApplications({ name, mobile, amount, purpose, language });
        res.status(201).json({
            success: true,
            message: "Application created successfully",
            data: application
        });
    }
    catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getApplicationService=async(req,res)=>{
    try{
        const { status } = req.query;
        const applications = await getApplications(status);
        res.status(200).json({
            success: true,
            message: "Applications fetched successfully",
            data: applications
        });
    }
    catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const updateApplicationService = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "Id and status are required",
      });
    }

    const application = await updateApplications(id, status);
    const applications = await getApplications();
    const total = await totalAmount();
    const count = await totalApplication();
    const approved = await approvedApplications();
    const pending = await pendingApplications();
    const rejected = await rejectedApplications();

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: {
        updated: application,
        applications,
        summary: {
          totalApplications: count,
          totalLoanAmount: total,
          approved,
          pending,
          rejected,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const summaryService=async(req,res)=>{
    try{
        const total = await totalAmount();
        const count = await totalApplication();
        const approved = await approvedApplications();
        const pending = await pendingApplications();
        const rejected = await rejectedApplications();
        res.status(200).json({
            success: true,
            message: "Summary fetched successfully",
            data: {
                totalApplications: count,
                totalLoanAmount: total,
                approved,
                pending,
                rejected
            }
        });
    }
    catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
