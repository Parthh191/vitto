import prisma from "../lib/prisma.js" 

export const createApplications=async(applicationData)=>{
    return await prisma.applications.create({
        data:applicationData
    });
}

export const getApplications=async(status)=>{
    return await prisma.applications.findMany({
        where: status?
        {
            status
        }
        :
        {},
        orderBy:{
            createdAt:"desc"
        },
    });
}

export const updateApplications=async(id,updateStatus)=>{
    return await prisma.applications.update({
        where: {
            id
        },
        data: {
            status: updateStatus
        }
    });
}

export const totalApplication=async()=>{
    return await prisma.applications.count();
}

export const totalAmount=async()=>{
    const result=await prisma.applications.aggregate({
        _sum:{
            amount:true
        }
    });
    return result._sum.amount || 0;
}

export const approvedApplications=async()=>{
    return await prisma.applications.count({
        where:{
            status:"Approved"
        }
    });
}

export const rejectedApplications=async()=>{
    return await prisma.applications.count({
        where:{
            status:"Rejected"
        }
    });
}

export const pendingApplications=async()=>{
    return await prisma.applications.count({
        where:{
            status:"Pending"
        }
    });
}