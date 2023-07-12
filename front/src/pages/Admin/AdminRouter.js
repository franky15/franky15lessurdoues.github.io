import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { GetAllPersonnels, GetOnePersonnels, AddPersonnels, UpdatePersonnels } from "@/pages/Admin/personnels"
import {GetAllUtilisateurs, GetOneUtilisateurs, AddUtilisateurs, UpdateUtilisateurs } from "@/pages/Admin/utilisateurs"
import { GetAllClasses, GetOneClasse, AddClasse, UpadeteClasse } from "@/pages/Admin/classes"
import {GetAllEleves, GetOneEleve, CreateEleve, UpdateEleve, GetAllClassesEleves, GetOneClasseEleves } from "@/components/eleves"

import { Dashboard } from "@/pages/Admin"

import Error from '@/_utils/Error';

const AdminRouter = () => {

    return (

        <Routes>
            
            
            
                <Route index element={ <Dashboard/> }/>
                
                <Route path='users'>
                    <Route index element={ <GetAllUtilisateurs/> }/>
                    <Route path='getall' element={ <GetAllUtilisateurs/> }/>
                    <Route path='getone/:id' element={ <GetOneUtilisateurs/> }/>
                    <Route path='add' element={ <AddUtilisateurs/> }/>
                    <Route path='update/:id' element={ <UpdateUtilisateurs/> }/>
                    <Route path='*' element = { <Error/> }/> 
                </Route>

                <Route path='personnels'>
                    <Route index element={ <GetAllPersonnels/> }/>
                    <Route path='getall' element={ <GetAllPersonnels/> }/>
                    <Route path='getone/:id' element={ <GetOnePersonnels/> }/>
                    <Route path='add' element={ <AddPersonnels/> }/>
                    <Route path='update/:id' element={ <UpdatePersonnels/> }/>
                    <Route path='*' element = { <Error/> }/> 
                </Route>

                <Route path='classes'>
                   
                        <Route index element={ <Dashboard/> }/>

                        <Route path='dashboard' element={ <Dashboard/> }/>
                        <Route path='getall' element={ <GetAllClasses/> }/>
                        <Route path='getone/:id' element={ <GetOneClasse/> }/>
                        <Route path='add' element={ <AddClasse/> }/>
                        <Route path='update/:id' element={ <UpadeteClasse/> }/>
                    
                        <Route path='*' element = { <Error/> }/> 
                   
                </Route>

                <Route path='eleves'>
                   
                   <Route index element={ <GetAllEleves/> }/>

                   <Route path='getall' element={ <GetAllEleves/> }/> 
                   <Route path='getone/:id' element={ <GetOneEleve/> }/>
                   <Route path='add' element={ <CreateEleve/> }/>
                   <Route path='update/:id' element={ <UpdateEleve/> }/>

                   <Route path='getallclasseseleve' element={ <GetAllClassesEleves/> }/> 
                   <Route path='getallclasseseleve/:id' element={ <GetOneClasseEleves/> }/> 
               
                   <Route path='*' element = { <Error/> }/> 
              
           </Route>

                <Route path='*' element = { <Error/> }/> 

           

        </Routes>
  
    );
};

export default AdminRouter;

//<Route element= { <AdminLayout/>}/>