const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview= async(req,res)=>
{
  // 1) Get tour data from collection 
    const tours = await Tour.find();
  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview',{
    title:'All Tours',
    tours
  });
};

exports.getTour =catchAsync(async(req,res)=>
{
 // 1) Get the data, for the requested tour (including reviews and guides)
 const tour =  await Tour.findOne({slug: req.params.slug}).populate({
     path :'reviews',
     fields: 'review rating user'
 });
 console.log(tour);

 // 2) Build template
 // 3) Render that template using tour data from 1)
  res.status(200).render('tour',{
    title:`${tour.name} Tour`,
    tour
  });
});


exports.getLoginForm = (req,res)=>{
  res.status(200).render('login',{
    title:'log into your account'
  })
}

exports.getAccount=(req,res)=>{
  res.status(200).render('account',{
    title:'Your account'
  })
}