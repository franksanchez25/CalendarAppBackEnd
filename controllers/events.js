
const { response } = require('express');
const  Event  = require('../models/Event');



const getEvents = async (req, res = response)=>{


    const eventsFromDB = await Event.find().populate( 'user','name' );

                                    
    res.status(200).json({
        ok: true,
       eventsFromDB
    })

}
const createEvent = async (req, res = response) => {
        
        
        const eventSaved = new Event (req.body);
        try {
            
            eventSaved.user = req.uid;

           await eventSaved.save();
           res.status(200).json({
               ok: true,
               msg:eventSaved
           })
        } catch (error) {
         
           return res.status(500).json({
                ok:false,
                msg: 'error'
            })
        }

  

    }

     const updateEvent = async (req, res = response) => {

        const eventID = req.params.id;
        const uid = req.uid;
        try {

            const event = await Event.findById(eventID);
            
            if (!event) {
               return res.status(404).json({
                    ok:false,
                    msg: 'Event not found'
                });
            }

            if (event.user.toString() !== uid) {
               return res.status(401).json({
                    ok: false,
                    msg: 'No privilege to update'
                });
            }

            const newEvent = {
                ...req.body,
                user: uid
            }

            const eventUpdated = await Event.findByIdAndUpdate(eventID, newEvent, {new:true});

            res.json({
                ok: true,
                eventUpdated
            });
            
        } catch (error) {
           return res.status(500).json({
                ok:false,
                msg: 'error updating record'
            });
        }
    }

     const deleteEvent = async (req, res = response) => {


        const eventID = req.params.id;

        try {

            const eventToDelete = await Event.findById( eventID );
            const uid = req.uid

            console.log(eventToDelete);
            console.log(req.uid);
            
            if ( !eventToDelete ) {
               return res.status(404).json({
                    ok:false,
                    msg:'Event not found'
                });
            }

            if (eventToDelete.user.toString() !== uid) {
                return res.status(401).json({
                    ok:false,
                    msg: 'No privilege to delete'
                });
            }
          
            const eventDeleted = await Event.findByIdAndDelete( eventID, { new: true } );


            res.status(200).json({
                ok: true,
                eventDeleted
            })
            
            
        } catch (error) {
           
            res.status(500).json({
                ok: false,
                msg: 'Error, contact to admin'
            })
        }


    }



module.exports = {
        getEvents,
        createEvent,
        updateEvent,
        deleteEvent
}