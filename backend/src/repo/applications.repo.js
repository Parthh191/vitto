import prisma from "../lib/prisma.js" 

export const createApplications=async(applicationData)=>{
    return await prisma.application.create({
        data:applicationData
    });
}

export const getApplications=async(status)=>{
    return await prisma.application.findMany({
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
    return await prisma.application.update({
        where: {
            id
        },
        data: {
            status: updateStatus
        }
    });
}

export const totalApplication=async()=>{
    return await prisma.application.count();
}

export const totalAmount=async()=>{
    const result=await prisma.application.aggregate({
        _sum:{
            amount:true
        }
    });
    return result._sum.amount || 0;
}

export const approvedApplications=async()=>{
    return await prisma.application.count({
        where:{
            status:"approved"
        }
    });
}

export const rejectedApplications=async()=>{
    return await prisma.application.count({
        where:{
            status:"rejected"
        }
    });
}

export const pendingApplications=async()=>{
    return await prisma.application.count({
        where:{
            status:"pending"
        }
    });
}