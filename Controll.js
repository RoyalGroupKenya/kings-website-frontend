const Mailer = require('./Mailer')
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient("https://exdefxyldgjlcpjkpuor.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZGVmeHlsZGdqbGNwamtwdW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MzY3NTAsImV4cCI6MjAzNzIxMjc1MH0.0QOOrbyPdGemXYpv3dMMvsPD9QhJG-ig_FMhRrdJumk")

exports.send = function(req,res){
    console.log(req.body)
    if(req.body.honey){
        res.status(403).json({response:'Bot Behaviour Has Been Noticed'})   
    }
    let M = new Mailer(req.body)
     M.resendMail().then(
     (response) => res.status(200).json({response: response})
     ).catch(
    (error) => res.status(401).json({response: error})
     )

}
exports.sale = function(req,res){
    console.log(req.body)
    if(req.body.honey){
        res.status(403).json({response:'Bot Behaviour Has Been Noticed'})   
    }
    let M = new Mailer(req.body)
     M.resendSale().then(
     (response) => res.status(200).json({response: response})
     ).catch(
    (error) => res.status(401).json({response: error})
     )

}
exports.subscribe = function(req,res){
    if(req.body.honey){
        res.status(403).json({response:'Bot Behaviour Has Been Noticed'})   
    }
    let M = new Mailer(req.body)
     M.resendSubscribe().then(
     (response) => res.status(200).json({response: response})
     ).catch(
    (error) => res.status(401).json({response: error})
     )

}
exports.propImgHandler = async (req,res) => {
    //console.log(req.image,"hello")
    let new_element = req.image
    console.log(new_element)
    let id = req.params.propId
    let { data, error } = await supabase
    .rpc('append_to_images', {
        image_id:id,
        new_image:new_element
    })
    if(error) {
        console.log(error)
        res.status(404)
    }else{
        res.status(200).json({response: req.image})
    }
    //console.log(data)
   /* const data = {
        image:req.image,
        id:req.params.propId
    }
   let db = new Db(data)
    db.edit_blog_img().then(msg => {
    res.status(200).json({response: req.image})
    }).catch((err) => {
        console.log(err)
    res.status(400).json({msg: "error updating."})
    })*/
    //write changes to properties.json  
}
exports.newsImgHandler = async (req,res) => {
    //console.log(req.image,"hello")
    let new_element = req.image
    console.log(new_element)
    let id = req.params.propId
    let { data, error } = await supabase
    .rpc('append_to_news', {
        image_id:id,
        new_image:new_element
    })
    if(error) {
        console.log(error)
        res.status(404)
    }else{
        res.status(200).json({response: req.image})
    }
    //console.log(data)
   /* const data = {
        image:req.image,
        id:req.params.propId
    }
   let db = new Db(data)
    db.edit_blog_img().then(msg => {
    res.status(200).json({response: req.image})
    }).catch((err) => {
        console.log(err)
    res.status(400).json({msg: "error updating."})
    })*/
    //write changes to properties.json  
}
exports.BlogImgHandler = async (req,res) => {
    //console.log(req.image,"hello")
    let new_element = req.image
    console.log(new_element)
    let id = req.params.propId
    let { data, error } = await supabase
    .rpc('append_to_blogs', {
        image_id:id,
        new_image:new_element
    })
    if(error) {
        console.log(error)
        res.status(404)
    }else{
        res.status(200).json({response: req.image})
    }
    //console.log(data)
   /* const data = {
        image:req.image,
        id:req.params.propId
    }
   let db = new Db(data)
    db.edit_blog_img().then(msg => {
    res.status(200).json({response: req.image})
    }).catch((err) => {
        console.log(err)
    res.status(400).json({msg: "error updating."})
    })*/
    //write changes to properties.json  
}
exports.Blog = (req,res) => {
    res.status(200).json({response: req.image})
    //console.log(data)
   /* const data = {
        image:req.image,
        id:req.params.propId
    }
   let db = new Db(data)
    db.edit_blog_img().then(msg => {
    res.status(200).json({response: req.image})
    }).catch((err) => {
        console.log(err)
    res.status(400).json({msg: "error updating."})
    })*/
    //write changes to properties.json  
}