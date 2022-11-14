const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    if (!jobs.length) {
        throw new NotFoundError('No jobs created by this user')
    }
    res.status(StatusCodes.OK).json({ jobs, length: jobs.length })
}
const getJob = async (req, res) => {
    const userId = req.user.userId
    const jobId = req.params.id
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })
    if (!job) {
        throw new NotFoundError('No such jobs exists')
    }

    res.status(StatusCodes.OK).json({ job })
}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
}
const updateJob = async (req, res) => {
    const{
        user: {userId},
        body:{company,position},
        params:{id: jobId}
    } = req

    if(!company || !position){
        throw new BadRequestError("Missing details of Job")
    }
    const job = await Job.findOneAndUpdate({
        _id: jobId,
        createdBy: userId
    }, req.body, {
        new: true,
        runValidators: true
    })

    if (!job) {
        throw new NotFoundError('No such jobs exists')
    }

    res.status(StatusCodes.OK).json(job)
}

const deleteJob = async (req, res) => {
    const {
        user:{userId},
        params:{id:jobId}
    } = req

    const job = await Job.findOneAndRemove({
        _id:jobId,
        createdBy: userId
    })

    if(!job){
        throw new BadRequestError('No job with such id exists')
    }

    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}