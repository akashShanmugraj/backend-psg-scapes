const express=require('express');
const router=express.Router();
exports.router = router;
const user=require('../models/user.js');
const attendanceData=require('../models/attendanceData.js');
const timeTableData=require('../models/timeTableData.js');

//get a list of students from mongo db
router.get('/students',function(req,res,next){
    res.send({type:'GET'});
    // user.find({role:'student'}).then(function(students){
    //     res.send(students);
    // }).catch(next);
    });

//get a list of faculties from mongo db
router.get('/faculty',function(req,res,next){
    res.send({type:'GET'});
    // user.find({role:'faculty'}).then(function(faculties){
    //     res.send(faculties);
    // }).catch(next);
    });

//get attendance data from mongo db
router.get('/courses',function(req,res,next){
    res.send({type:'GET'});
    // attendanceData.find({}).then(function(courses){
    //     res.send(courses);
    // }).catch(next);
     });

//get time table data from mongo db
router.get('/timeTable',function(req,res,next){
    res.send({type:'GET'});
    // timeTableData.find({}).then(function(timeTable){
    //     res.send(timeTable);
    // }).catch(next);
    });

module.exports=router;