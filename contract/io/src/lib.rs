#![no_std]

use gstd::{ prelude::*, ActorId };
use gmeta::{Out,InOut,Metadata};


// 1. Create your own Actions
#[derive(Encode, Decode, TypeInfo,  Clone)]
pub enum TokenTechiesAction {
        On,
        Off,
}


// 2. Create your own Events
#[derive(Encode, Decode, TypeInfo, Hash, PartialEq, PartialOrd, Eq, Ord, Clone, Copy, Debug)]
pub enum TokenTechiesEvent {
    On,
    Off,
}


// 3. Create your own Struct
#[derive(Default, Clone, Encode, Decode, TypeInfo)]
pub struct IoTokenTechiesState {
    pub current_state: String,
    pub all_users: Vec<(ActorId, String)>,
}


pub struct ContractMetadata;

// 5. Define the structure of actions, events and state for your metadata.
impl Metadata for ContractMetadata{
     type Init = ();
     type Handle = InOut<TokenTechiesAction,TokenTechiesEvent>;
     type Others = ();
     type Reply=();
     type Signal = ();
     type State = Out<IoTokenTechiesState>;

}